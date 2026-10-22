"use client";

import Link from "next/link";
import { AddFuelScreen } from "./screens/AddFuelScreen";
import { AddRecordScreen } from "./screens/AddRecordScreen";
import { AddVehicleScreen } from "./screens/AddVehicleScreen";
import { FuelSavedScreen } from "./screens/FuelSavedScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ReportScreen } from "./screens/ReportScreen";
import { TimelineScreen } from "./screens/TimelineScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { OdoProvider, useOdo } from "./store";
import { PlusSheet } from "./ui/PlusSheet";
import { TabBar } from "./ui/TabBar";
import { WheelFace } from "./ui/Marks";

function Shell() {
  const odo = useOdo();
  if (!odo.ready) {
    return (
      <div className="odo-stage">
        <div className="odo-phone">
          <div className="odo-loading">
            <WheelFace />
          </div>
        </div>
      </div>
    );
  }

  const showTabs =
    odo.screen.name === "home" ||
    odo.screen.name === "timeline" ||
    odo.screen.name === "report" ||
    odo.screen.name === "profile";

  return (
    <div className="odo-stage">
      <Link className="odo-back" href="/work/odo">
        Case study
      </Link>
      <div className="odo-phone">
        <div className="odo-fill">
          {odo.screen.name === "welcome" && <WelcomeScreen />}
          {odo.screen.name === "add-vehicle" && <AddVehicleScreen />}
          {odo.screen.name === "home" && <HomeScreen />}
          {odo.screen.name === "timeline" && <TimelineScreen />}
          {odo.screen.name === "report" && <ReportScreen />}
          {odo.screen.name === "profile" && <ProfileScreen />}
          {odo.screen.name === "add-fuel" && <AddFuelScreen />}
          {odo.screen.name === "add-record" && <AddRecordScreen />}
          {odo.screen.name === "fuel-saved" && <FuelSavedScreen />}
          {showTabs && <TabBar />}
          {odo.plusOpen && <PlusSheet />}
          {odo.toast && (
            <p className="odo-toast" role="status">
              {odo.toast}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function OdoApp() {
  return (
    <OdoProvider>
      <Shell />
    </OdoProvider>
  );
}
