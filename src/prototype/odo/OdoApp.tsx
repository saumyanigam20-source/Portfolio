"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AddFuelScreen } from "./screens/AddFuelScreen";
import { AddRecordScreen } from "./screens/AddRecordScreen";
import { AddVehicleScreen } from "./screens/AddVehicleScreen";
import { FuelSavedScreen } from "./screens/FuelSavedScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ReportScreen } from "./screens/ReportScreen";
import { TimelineScreen } from "./screens/TimelineScreen";
import { Gate, SignInScreen } from "./screens/SignInScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { OdoProvider, useOdo } from "./store";
import type { Screen } from "./types";
import { IosChrome } from "./ui/IosChrome";
import { useReducedMotion } from "./ui/motion";
import { PlusSheet } from "./ui/PlusSheet";
import { TabBar } from "./ui/TabBar";

const tabs = new Set(["home", "timeline", "report", "profile"]);

function depth(name: Screen["name"]) {
  if (name === "welcome") return 0;
  if (name === "fuel-saved") return 3;
  if (name === "add-fuel" || name === "add-record" || name === "add-vehicle") return 2;
  return 1;
}

function motionKind(from: Screen["name"], to: Screen["name"]): "fade" | "forward" | "back" {
  if (tabs.has(from) && tabs.has(to)) return "fade";
  if (depth(to) > depth(from)) return "forward";
  if (depth(to) < depth(from)) return "back";
  return "fade";
}

function useVisualViewport() {
  useEffect(() => {
    const root = document.querySelector(".odo-root");
    const viewport = window.visualViewport;
    if (!root || !viewport) return;
    const apply = () => {
      if (window.innerWidth <= 479) root.style.setProperty("--odo-vvh", `${Math.round(viewport.height)}px`);
      else root.style.removeProperty("--odo-vvh");
    };
    const onFocus = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        window.setTimeout(() => target.scrollIntoView({ block: "nearest" }), 80);
      }
    };
    apply();
    viewport.addEventListener("resize", apply);
    window.addEventListener("resize", apply);
    root.addEventListener("focusin", onFocus);
    return () => {
      viewport.removeEventListener("resize", apply);
      window.removeEventListener("resize", apply);
      root.removeEventListener("focusin", onFocus);
    };
  }, []);
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="odo-stage">
      <Link className="odo-back" href="/work/odo">
        Case study
      </Link>
      <div className="odo-phone">
        <IosChrome />
        <div className="odo-fill">{children}</div>
        <span className="odo-ios-home" aria-hidden="true" />
      </div>
    </div>
  );
}

function Shell() {
  const odo = useOdo();
  const reduced = useReducedMotion();
  const [booting, setBooting] = useState(true);
  useVisualViewport();
  const motion = useRef({ name: odo.screen.name, kind: "fade" as "fade" | "forward" | "back" });
  if (motion.current.name !== odo.screen.name) {
    motion.current = {
      kind: reduced ? "fade" : motionKind(motion.current.name, odo.screen.name),
      name: odo.screen.name,
    };
  }

  if (!odo.ready) {
    return (
      <Phone>
        <div className="odo-loading" aria-hidden="true">
          <div className="odo-skeleton odo-skeleton-line" />
          <div className="odo-skeleton odo-skeleton-title" />
          <div className="odo-skeleton odo-skeleton-line" />
          <div className="odo-skeleton odo-skeleton-hero" />
          <div className="odo-skeleton odo-skeleton-card" />
          <div className="odo-skeleton odo-skeleton-card" />
        </div>
        <div className="odo-tabs" />
      </Phone>
    );
  }

  if (booting) {
    return (
      <Phone>
        <Gate onDone={() => setBooting(false)} />
      </Phone>
    );
  }

  if (!odo.session.signedIn || !odo.session.name) {
    return (
      <Phone>
        <SignInScreen onDone={() => setBooting(false)} />
      </Phone>
    );
  }

  const showTabs =
    odo.screen.name === "home" ||
    odo.screen.name === "timeline" ||
    odo.screen.name === "report" ||
    odo.screen.name === "profile";

  return (
    <Phone>
        <div key={odo.screen.name} className={`odo-screen odo-screen-${motion.current.kind}`}>
            {odo.screen.name === "welcome" && <WelcomeScreen />}
            {odo.screen.name === "add-vehicle" && <AddVehicleScreen />}
            {odo.screen.name === "home" && <HomeScreen />}
            {odo.screen.name === "timeline" && <TimelineScreen />}
            {odo.screen.name === "report" && <ReportScreen />}
            {odo.screen.name === "profile" && <ProfileScreen />}
            {odo.screen.name === "add-fuel" && <AddFuelScreen />}
            {odo.screen.name === "add-record" && <AddRecordScreen />}
            {odo.screen.name === "fuel-saved" && <FuelSavedScreen />}
          </div>
          <Toast message={odo.toast} />
          <SheetSlot open={odo.plusOpen} />
          {showTabs && <TabBar />}
    </Phone>
  );
}

function SheetSlot({ open }: { open: boolean }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(open);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (open) {
      setMounted(true);
      setPhase("in");
      return;
    }
    setPhase("out");
    const timer = window.setTimeout(() => setMounted(false), reduced ? 0 : 200);
    return () => window.clearTimeout(timer);
  }, [open, reduced]);

  if (!mounted) return null;
  return <PlusSheet phase={phase} />;
}

function Toast({ message }: { message: string | null }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(message);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (message) {
      setVisible(message);
      setPhase("in");
      return;
    }
    setPhase("out");
    const timer = window.setTimeout(() => setVisible(null), reduced ? 0 : 200);
    return () => window.clearTimeout(timer);
  }, [message, reduced]);

  if (!visible) return null;
  return (
    <p className={phase === "out" ? "odo-toast is-out" : "odo-toast"} role="status">
      {visible}
    </p>
  );
}

export function OdoApp() {
  return (
    <OdoProvider>
      <Shell />
    </OdoProvider>
  );
}
