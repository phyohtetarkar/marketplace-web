import { PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Tabs from "../Tabs";
import BranchListing from "./BranchListing";
import ShopContactForm from "./ShopContactForm";
import ShopGeneralForm from "./ShopGeneralForm";

const list = [1, 2, 3, 4];

const Social = () => {
  return (
    <div className="py-1">
      <div className="d-flex justify-content-start">
        <Link href="#">
          <a className="btn btn-primary">
            <div className="hstack">
              <PlusIcon className="me-2" width={20} />
              Add new
            </div>
          </a>
        </Link>
      </div>
      <div className="d-flex flex-wrap gap-3 py-3">
        {list.map((i) => (
          <div className="hstack bg-light rounded p-2" key={i}>
            <Image
              className="flex-shrink-0"
              src="/images/icons8-facebook-48.png"
              alt="facebook"
              width={28}
              height={28}
            />
            <span className="text-dark ms-1 small">Shopping Center</span>
            <div role="button" className="link-danger ms-2">
              <XCircleIcon className="flex-shrink-0" width={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function ShopSetting() {
  return (
    <div>
      <div className="bg-white rounded h-100 shadow-sm">
        <Tabs defaultTabKey="general">
          <Tabs.Tab tabKey="general" title="General">
            <ShopGeneralForm />
          </Tabs.Tab>
          <Tabs.Tab tabKey="contact" title="Contact">
            <ShopContactForm />
          </Tabs.Tab>
          <Tabs.Tab tabKey="branches" title="Branches">
            <BranchListing />
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default ShopSetting;
