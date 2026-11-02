import { useEffect, useRef } from "react";
import content from "./DaylightContent.html?raw";
import "./Daylight.css";

export default function Daylight() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const previous = document.title;
    document.title = "Daylight — A little room for your day | Clear Studio";
    const tabs = Array.from(root.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []);
    const activate = (tab: HTMLButtonElement) => {
      tabs.forEach(item => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
        const panel = root.current?.querySelector<HTMLElement>(`#${item.dataset.tab}`);
        if (panel) panel.hidden = !selected;
      });
    };
    const cleanups = tabs.map((tab, index) => {
      const click = () => activate(tab);
      const key = (event: KeyboardEvent) => {
        const next = event.key === "ArrowRight" ? (index + 1) % tabs.length :
          event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length :
          event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : undefined;
        if (next !== undefined) { event.preventDefault(); activate(tabs[next]); tabs[next].focus(); }
      };
      tab.addEventListener("click", click); tab.addEventListener("keydown", key);
      return () => { tab.removeEventListener("click", click); tab.removeEventListener("keydown", key); };
    });
    return () => { document.title = previous; cleanups.forEach(cleanup => cleanup()); };
  }, []);
  // The HTML is our static, versioned page content; it contains no user input or scripts.
  return <article ref={root} className="daylight-page" aria-label="Daylight for iPad" dangerouslySetInnerHTML={{ __html: content }} />;
}
