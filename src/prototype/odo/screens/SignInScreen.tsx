"use client";

import { useEffect, useRef, useState } from "react";
import { useOdo } from "../store";
import { Logo } from "../ui/Logo";
import { prefersReducedMotion } from "../ui/motion";

export function Gate({ onDone }: { onDone: () => void }) {
  const { session } = useOdo();
  const [phase, setPhase] = useState<"wheels" | "form">("wheels");
  const sessionRef = useRef(session);
  const doneRef = useRef(onDone);
  sessionRef.current = session;
  doneRef.current = onDone;

  useEffect(() => {
    const wait = prefersReducedMotion() ? 400 : 1700;
    const timer = window.setTimeout(() => {
      const current = sessionRef.current;
      if (current.signedIn && current.name) {
        window.setTimeout(() => doneRef.current(), prefersReducedMotion() ? 200 : 320);
        return;
      }
      setPhase("form");
    }, wait);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={phase === "form" ? "odo-gate is-form" : "odo-gate"}>
      <div className="odo-gate-logo">
        <Logo />
      </div>
      {phase === "form" && <SignInForm onDone={onDone} />}
    </div>
  );
}

export function SignInScreen({ onDone }: { onDone: () => void }) {
  return (
    <div className="odo-gate is-form is-settled">
      <div className="odo-gate-logo">
        <Logo />
      </div>
      <SignInForm onDone={onDone} />
    </div>
  );
}

function SignInForm({ onDone }: { onDone: () => void }) {
  const { session, vehicles, signIn, setName, startSample, go } = useOdo();
  const [step, setStep] = useState<"phone" | "otp" | "name">(session.signedIn && !session.name ? "name" : "phone");
  const [phone, setPhone] = useState(session.phone);
  const [otp, setOtp] = useState("");
  const [name, setNameDraft] = useState(session.name);
  const [seconds, setSeconds] = useState(30);
  const phoneOk = /^[6-9]\d{9}$/.test(phone);

  useEffect(() => {
    if (step !== "otp" || seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds, step]);

  const finish = (nextName: string) => {
    setName(nextName);
    if (vehicles.length === 0) go({ name: "add-vehicle", returnTo: "home" });
    onDone();
  };

  return (
    <form
      className="odo-form-screen odo-gate-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (step === "phone" && phoneOk) {
          setStep("otp");
          setSeconds(30);
        } else if (step === "otp" && otp.length === 6) {
          signIn(phone);
          if (session.name) {
            go({ name: "home" });
            onDone();
          } else setStep("name");
        } else if (step === "name" && name.trim()) {
          finish(name);
        }
      }}
    >
      <div className="odo-scroll odo-form">
        {step === "phone" && (
          <>
            <h1>Sign in</h1>
            <p className="odo-muted">Your number stays on this device. Nothing is sent.</p>
            <label className="odo-field">
              <span>Phone number</span>
              <span className="odo-prefix">
                <span>+91</span>
                <input
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  value={phone}
                  placeholder="90000 00000"
                  aria-invalid={phone.length > 0 && !phoneOk}
                  onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
                />
              </span>
            </label>
            {phone.length > 0 && !phoneOk && (
              <p className="odo-error" role="alert">
                Enter a 10-digit mobile number.
              </p>
            )}
            <button
              type="button"
              className="odo-text-btn"
              onClick={() => {
                startSample();
                signIn(phone);
                setStep("name");
              }}
            >
              Try sample data
            </button>
          </>
        )}
        {step === "otp" && (
          <>
            <h1>Enter OTP</h1>
            <p className="odo-muted">Sent to +91 {phone}. Any 6 digits work in this prototype.</p>
            <Otp value={otp} onChange={setOtp} />
            <button
              type="button"
              className="odo-text-btn"
              disabled={seconds > 0}
              onClick={() => {
                setOtp("");
                setSeconds(30);
              }}
            >
              {seconds > 0 ? `Resend OTP in ${seconds}s` : "Resend OTP"}
            </button>
          </>
        )}
        {step === "name" && (
          <>
            <h1>What should we call you?</h1>
            <label className="odo-field">
              <span>Name</span>
              <input value={name} maxLength={24} onChange={(event) => setNameDraft(event.target.value)} />
            </label>
          </>
        )}
      </div>
      <div className="odo-savebar">
        <button type="submit" className="odo-btn" disabled={(step === "phone" && !phoneOk) || (step === "otp" && otp.length !== 6) || (step === "name" && !name.trim())}>
          {step === "phone" ? "Send OTP" : "Continue"}
        </button>
      </div>
    </form>
  );
}

function Otp({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: 6 }, (_, index) => value[index] ?? "");

  const write = (index: number, raw: string) => {
    const next = digits.slice();
    next[index] = raw;
    onChange(next.join("").replace(/\D/g, "").slice(0, 6));
  };

  return (
    <div className="odo-otp">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-label={`Digit ${index + 1}`}
          value={digit}
          onChange={(event) => {
            const raw = event.target.value.replace(/\D/g, "");
            if (raw.length > 1) {
              const pasted = raw.slice(0, 6);
              onChange(pasted);
              refs.current[Math.min(pasted.length, 5)]?.focus();
              return;
            }
            write(index, raw);
            if (raw) refs.current[index + 1]?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !digits[index]) {
              refs.current[index - 1]?.focus();
              write(Math.max(0, index - 1), "");
            }
          }}
          onPaste={(event) => {
            const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
            if (!pasted) return;
            event.preventDefault();
            onChange(pasted);
            refs.current[Math.min(pasted.length, 5)]?.focus();
          }}
        />
      ))}
    </div>
  );
}
