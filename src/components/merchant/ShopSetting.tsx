import { PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Tabs from "../Tabs";
import BranchListing from "./BranchListing";
import ShopContactEdit from "./ShopContactEdit";
import ShopGeneralEdit from "./ShopGeneralEdit";

function ShopSetting() {
  return (
    <div className="vstack gap-3">
      {/* <div className="bg-white rounded h-100 shadow-sm">
        <Tabs defaultTabKey="general" className="border-bottom">
          <Tabs.Tab tabKey="general" title="General">
            <ShopGeneralEdit />
          </Tabs.Tab>
          <Tabs.Tab tabKey="contact" title="Contact">
            <ShopContactEdit />
          </Tabs.Tab>
          <Tabs.Tab tabKey="branches" title="Branches">
            <BranchListing />
          </Tabs.Tab>
        </Tabs>
      </div> */}
      <ShopGeneralEdit />
      <ShopContactEdit />
    </div>
  );
}

export default ShopSetting;
