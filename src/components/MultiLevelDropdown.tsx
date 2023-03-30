import { ReactNode, useRef, useState } from "react";

// export const sampleList = [
//   {
//     key: 1,
//     title: "Food And Drink",
//     children: []
//   },
//   {
//     key: 2,
//     title: "Electronics",
//     children: [
//       {
//         key: 3,
//         title: "Desktop And Computers",
//         children: [
//           {
//             key: 7,
//             title: "Monitors",
//             children: null
//           }
//         ]
//       },
//       {
//         key: 4,
//         title: "Phones And Tablets",
//         children: [
//           {
//             key: 5,
//             title: "Apple",
//             children: null
//           },
//           {
//             key: 6,
//             title: "Android",
//             children: null
//           }
//         ]
//       }
//     ]
//   },
//   {
//     key: 10,
//     title: "Health & Beauty",
//     children: []
//   }
// ] as MultiMenuItem[];

export interface MultiMenuItem {
  key: number | string;
  title: string;
  children?: MultiMenuItem[] | null;
}

type GetMenuLabel<T> = (t: T) => ReactNode;

type OnMenuClick<T> = (t: T) => void;

type GetSubItems<T> = (t: T) => T[] | null | undefined;

interface MenuItemProps<T> {
  getMenuLabel: GetMenuLabel<T>;
  getSubItems: GetSubItems<T>;
  onMenuClick?: OnMenuClick<T>;
}

interface SubMenuProps<T> extends MenuItemProps<T> {
  items: T[];
}

interface MultiDropdownProps<T> extends SubMenuProps<T> {
  toggle: ReactNode;
}

function MenuItem<T>(props: MenuItemProps<T> & { item: T }) {
  const { item, getMenuLabel, getSubItems, onMenuClick } = props;

  const itemRef = useRef<any | null>(null);
  const [activeNode, setActiveNode] = useState<HTMLElement | null>(null);

  const subItems = getSubItems(item);

  return (
    <div
      ref={itemRef}
      className="dropdown-item-secondary py-2"
      style={{ cursor: "default" }}
      onClick={(evt) => {
        if (itemRef.current === evt.target) {
          onMenuClick?.(item);
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
      {getMenuLabel(item)}
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
          />
        </div>
      )}
    </div>
  );
}

function SubMenu<T>(props: SubMenuProps<T>) {
  const { items, getMenuLabel, getSubItems, onMenuClick } = props;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="position-relative bg-white py-2 shadow-lg rounded h-100">
      {items.map((e, i) => {
        return (
          <MenuItem
            key={i}
            item={e}
            getMenuLabel={getMenuLabel}
            getSubItems={getSubItems}
            onMenuClick={onMenuClick}
          />
        );
      })}
    </div>
  );
}

function MultiLevelDropdown<T>(props: MultiDropdownProps<T>) {
  const { toggle, items, getMenuLabel, getSubItems, onMenuClick } = props;
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
          />
        </div>
      )}
    </div>
  );

  // return (
  //   <Popover offset={[0, 10]} showOnHover>
  //     {(show, hide) => {
  //       return [
  //         <Popover.Reference key={1}>{toggle}</Popover.Reference>,
  //         <Popover.Popper key={2}>
  //           <SubMenu
  //             items={items}
  //             getMenuLabel={getMenuLabel}
  //             getSubItems={getSubItems}
  //             onMenuClick={onMenuClick}
  //           />
  //         </Popover.Popper>
  //       ];
  //     }}
  //   </Popover>
  // );

  // return (
  //   <Dropdown
  //     toggle={toggle}
  //     toggleClassName="hstack"
  //     menuClassName="shadow-lg border-0"
  //     showOnHover
  //   >
  //     {items.map((e, i) => {
  //       return (
  //         <li key={i} style={{ minWidth: 200, cursor: "default" }}>
  //           <MenuItem
  //             item={e}
  //             getMenuLabel={getMenuLabel}
  //             getSubItems={getSubItems}
  //             onMenuClick={onMenuClick}
  //           />
  //         </li>
  //       );
  //     })}
  //   </Dropdown>
  // );
}

export default MultiLevelDropdown;
