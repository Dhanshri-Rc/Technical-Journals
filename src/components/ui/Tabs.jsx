import { useState, useId } from "react";

export default function Tabs({ tabs, defaultIndex = 0 }) {
  const [active, setActive] = useState(defaultIndex);
  const uid = useId();

  function onKeyDown(e, i) {
    if (e.key === "ArrowRight") setActive((i + 1) % tabs.length);
    if (e.key === "ArrowLeft") setActive((i - 1 + tabs.length) % tabs.length);
  }

  return (
    <div>
      <div role="tablist" aria-label="Tabs" className="flex flex-wrap gap-2 border-b border-slate-200 mb-6">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${uid}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              active === i ? "border-blue-700 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
          hidden={active !== i}
        >
          {active === i && tab.content}
        </div>
      ))}
    </div>
  );
}
