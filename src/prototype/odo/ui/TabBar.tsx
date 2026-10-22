import { useOdo } from "../store";
import { HomeIcon, PlusIcon, ProfileIcon, ReportIcon, TimelineIcon } from "./Icons";

const tabs = [
  { name: "home", label: "Home", Icon: HomeIcon },
  { name: "timeline", label: "Timeline", Icon: TimelineIcon },
  { name: "report", label: "Report", Icon: ReportIcon },
  { name: "profile", label: "Profile", Icon: ProfileIcon },
] as const;

export function TabBar() {
  const { screen, go, plusOpen, setPlusOpen } = useOdo();

  return (
    <nav className="odo-tabs" aria-label="Primary">
      {tabs.slice(0, 2).map((tab) => (
        <button
          key={tab.name}
          type="button"
          className="odo-tab"
          aria-current={screen.name === tab.name ? "page" : undefined}
          onClick={() => go({ name: tab.name })}
        >
          <tab.Icon />
          {tab.label}
        </button>
      ))}
      <button
        type="button"
        className="odo-plus"
        aria-label="Add fuel, part, or service"
        aria-expanded={plusOpen}
        onClick={() => setPlusOpen(!plusOpen)}
      >
        <PlusIcon />
      </button>
      {tabs.slice(2).map((tab) => (
        <button
          key={tab.name}
          type="button"
          className="odo-tab"
          aria-current={screen.name === tab.name ? "page" : undefined}
          onClick={() => go({ name: tab.name })}
        >
          <tab.Icon />
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
