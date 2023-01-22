import { ReactElement, ReactNode, useState } from "react";

interface TabProps {
  tabKey: string;
  title: string;
  disabled?: boolean;
  hidden?: boolean;
  tabClassName?: string;
  children: ReactNode;
}

interface TabsProps {
  defaultTabKey: string;
  className?: string;
  onTabChange?: (key: string) => void;
  children: ReactElement<TabProps>[];
}

function Tab(props: TabProps) {
  return <div></div>;
}

function Tabs({ defaultTabKey, className, onTabChange, children }: TabsProps) {
  const [activeTabKey, setActiveTabKey] = useState(defaultTabKey);

  return (
    <>
      <ul
        className={`nav nav-pills flex-nowrap overflow-auto scrollbar-none ${
          className ?? ""
        }`}
      >
        {children.map((c) => {
          const { tabKey, title, disabled, tabClassName, hidden } = c.props;
          if (hidden) {
            return null;
          }
          const active = activeTabKey === tabKey;
          return (
            <li key={tabKey} className="nav-item">
              <div className="position-relative">
                <button
                  disabled={disabled}
                  className={`nav-link py-3 ${active ? "active" : ""} ${
                    tabClassName ?? ""
                  } ${disabled ? "disabled" : ""}`}
                  onClick={() => {
                    onTabChange?.(tabKey);
                    setActiveTabKey(tabKey);
                  }}
                >
                  {title}
                </button>
                {active && (
                  <div
                    className="position-absolute w-100 bg-primary bottom-0"
                    style={{ height: 2 }}
                  ></div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="tab-content">
        {children.map((c, i) => {
          const { tabKey, children } = c.props;
          if (tabKey !== activeTabKey) {
            return undefined;
          }
          return (
            <div key={`${tabKey}-body`} className="tab-pane active">
              {children}
            </div>
          );
        })}
      </div>
    </>
  );
}

Tabs.Tab = Tab;

export default Tabs;
