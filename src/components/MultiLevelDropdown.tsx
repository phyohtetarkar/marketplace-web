import Link from "next/link";
import { ReactNode, useRef, useState } from "react";

export interface MultiMenuItem {
  key: number | string;
  title: string;
  children?: MultiMenuItem[] | null;
}

type GetMenuLabel<T> = (t: T) => ReactNode;

type GetMenuLink<T> = (t: T) => string;

type OnMenuClick<T> = (t: T) => void;

type GetSubItems<T> = (t: T) => T[] | null | undefined;

interface MenuItemProps<T> {
  getMenuLabel: GetMenuLabel<T>;
  getSubItems: GetSubItems<T>;
  getMenuLink?: GetMenuLink<T>;
  onMenuClick?: OnMenuClick<T>;
}

interface SubMenuProps<T> extends MenuItemProps<T> {
  items: T[];
}

interface MultiDropdownProps<T> extends SubMenuProps<T> {
  toggle: ReactNode;
}

function MenuItem<T>(props: MenuItemProps<T> & { item: T }) {
  const { item, getMenuLabel, getSubItems, getMenuLink, onMenuClick } = props;

  const itemRef = useRef<any | null>(null);
  const [activeNode, setActiveNode] = useState<HTMLElement | null>(null);

  const subItems = getSubItems(item);

  return (
    <div
      ref={itemRef}
      className="dropdown-item-primary"
      onClick={(evt) => {
        if (itemRef.current === evt.target) {
          // onMenuClick?.(item);
        }
      }}
      onMouseEnter={(evt) => {
        if (itemRef.current === evt.target) {
          setActiveNode(itemRef.current);
        }
      }}
      onMouseLeave={(evt) => {
        setActiveNode(null);
      }}
    >
      {getMenuLink ? (
        <div className="position-relative">
          <div
            className="position-absolute top-50 translate-middle-y"
            style={{
              pointerEvents: "none"
            }}
          >
            {getMenuLabel(item)}
          </div>
          <Link
            href={getMenuLink?.(item) ?? "/"}
            className="d-block"
            style={{
              pointerEvents: itemRef.current === activeNode ? "auto" : "none"
            }}
          >
            <span className="invisible">{getMenuLabel(item)}</span>
          </Link>
        </div>
      ) : (
        getMenuLabel(item)
      )}
      {activeNode && activeNode === itemRef.current && subItems && (
        <div
          className="position-absolute top-0 start-100 ms-n1 bottom-0"
          style={{ minWidth: 200 }}
        >
          <SubMenu
            items={subItems}
            getMenuLabel={getMenuLabel}
            getSubItems={getSubItems}
            onMenuClick={onMenuClick}
            getMenuLink={getMenuLink}
          />
        </div>
      )}
    </div>
  );
}

function SubMenu<T>(props: SubMenuProps<T>) {
  const { items, getMenuLabel, getSubItems, getMenuLink, onMenuClick } = props;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="position-relative bg-white py-2 shadow-lg rounded">
      {items.map((e, i) => {
        return (
          <MenuItem
            key={i}
            item={e}
            getMenuLabel={getMenuLabel}
            getSubItems={getSubItems}
            onMenuClick={onMenuClick}
            getMenuLink={getMenuLink}
          />
        );
      })}
    </div>
  );
}

function MultiLevelDropdown<T>(props: MultiDropdownProps<T>) {
  const { toggle, items, getMenuLabel, getSubItems, getMenuLink, onMenuClick } =
    props;
  const [active, setActive] = useState(false);

  return (
    <div className="position-relative" onMouseLeave={() => setActive(false)}>
      <div onMouseEnter={() => setActive(true)}>{toggle}</div>
      {active && (
        <div
          className="position-absolute top-100 start-0"
          style={{ minWidth: 200 }}
          onClick={() => setActive(false)}
        >
          <SubMenu
            items={items}
            getMenuLabel={getMenuLabel}
            getSubItems={getSubItems}
            onMenuClick={onMenuClick}
            getMenuLink={getMenuLink}
          />
        </div>
      )}
    </div>
  );
}

export default MultiLevelDropdown;
