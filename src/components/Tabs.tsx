import { ReactElement, ReactNode, useState } from "react";

interface TabProps {
  tabKey: string;
  title: string;
  disabled?: boolean;
  tabClassName?: string;
  children: ReactNode;
}

interface TabsProps {
  defaultTabKey: string;
  children: ReactElement<TabProps>[];
}

function Tab(props: TabProps) {
  return <div></div>;
}

function Tabs({ defaultTabKey, children }: TabsProps) {
  const [activeTabKey, setActiveTabKey] = useState(defaultTabKey);

  return (
    <>
      <ul className="nav nav-pills border-bottom">
        {children.map((c) => {
          const { tabKey, title, disabled, tabClassName } = c.props;
          return (
            <li key={tabKey} className="nav-item">
              <button
                disabled={disabled}
                className={`nav-link custom-tab py-3 ${
                  activeTabKey === tabKey ? "active" : ""
                } ${tabClassName ?? ""} ${disabled ? "disabled" : ""}`}
                onClick={() => setActiveTabKey(tabKey)}
              >
                {title}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="tab-content p-3">
        {children.map((c, i) => {
          const { tabKey, children } = c.props;
          if (tabKey !== activeTabKey) {
            return undefined;
          }
          return (
            <div key={`${tabKey}-body`} className="tab-pane active">
              {c.props.children}
            </div>
          );
        })}
      </div>
    </>
  );
}

Tabs.Tab = Tab;

export default Tabs;
