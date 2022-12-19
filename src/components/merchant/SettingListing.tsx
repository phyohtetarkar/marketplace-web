import { PhoneIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { formControlHeight } from "../../common/app.config";
import { Input, Textarea } from "../forms";
import Pagination from "../Pagination";
import Tabs from "../Tabs";

const list = [1, 2, 3, 4, 5];

const general = (
  <div className="row py-2">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body px-md-4">
          <div className="row g-4 mb-3">
            <div className="col-lg-6">
              <Input
                label="Name *"
                id="shopNameInput"
                name="name"
                type="text"
                placeholder="Enter shop name"
              />
            </div>
            <div className="col-lg-6">
              <Input
                label="Slug *"
                id="slugInput"
                name="slug"
                type="text"
                placeholder="https://shoppingcenter.com/page/slug"
              />
            </div>
          </div>
          <div className="row g-4">
            <div className="order-5 order-lg-3 order-md-5 col-lg-6">
              <label className="form-label">About us</label>
              <Textarea
                id="aboutUsInput"
                placeholder="Enter about shop"
                height={250}
              />
            </div>
            <div className="order-3 order-lg-4 order-md-3 order-1 col-lg-6">
              <Input
                label="Headline"
                id="headlineInput"
                name="headline"
                type="text"
                className="mb-3"
                placeholder="Enter shop headline"
              />
              <Input
                label="Address *"
                id="addressInput"
                name="address"
                type="text"
                placeholder="Enter shop address"
              />
            </div>
          </div>
          <div className="row py-3">
            <div className="col-auto ms-auto">
              <Link href="#">
                <a className="btn btn-primary h-100 hstack">Save</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const contact = (
  <div className="py-2">
    <div className="hstack" style={{ height: formControlHeight }}>
      <Link href="#">
        <a className="btn btn-primary h-100 ms-auto hstack">Add new</a>
      </Link>
    </div>
    <div className="d-flex flex-wrap gap-3 py-3">
      {list.map((i) => (
        <div className="hstack border rounded p-2" key={i}>
          <PhoneIcon width={15} className="flex-shrink-0" />
          <span className="text-dark ms-1 small">09-24442122</span>
          <div role="button" className="link-danger ms-2">
            <XCircleIcon className="flex-shrink-0" width={20} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const branches = (
  <div className="py-2">
    <div className="row">
      <div className="col-auto me-auto">
        <Input
          id="searchinput"
          name="search"
          type="text"
          placeholder="Search your branches"
        />
      </div>

      <div className="col-auto">
        <Link href="#">
          <a className="btn btn-primary h-100 hstack">Add new</a>
        </Link>
      </div>
    </div>

    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 g-3 py-3">
      {list.map((i) => (
        <div className="col" key={i}>
          <div className="bg-white border rounded p-3">
            <div className="vstack">
              <div className="hstack align-items-start">
                <div className="vstack">
                  <h6 className="flex-grow-1 pe-2 mb-1">
                    Global Stationary Shop
                  </h6>
                  <div className="hstack mb-3">
                    <PhoneIcon className="me-2" width={14} />
                    <small className="text-muted">09121219987</small>
                  </div>
                </div>

                <a className="btn btn-outline-danger px-2">
                  <TrashIcon className="p-0" width={16} strokeWidth={1.5} />
                </a>
              </div>
              <div className="text-muted small">
                Yangon city, Pyay Road, Building 123, House 321
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="d-flex justify-content-end pt-3">
      <Pagination />
    </div>
  </div>
);

const social = (
  <div className="py-2">
    <div className="hstack" style={{ height: formControlHeight }}>
      <Link href="#">
        <a className="btn btn-primary h-100 ms-auto hstack">Add new</a>
      </Link>
    </div>
    <div className="d-flex flex-wrap gap-3 py-3">
      {list.map((i) => (
        <div className="hstack rounded border p-2" key={i}>
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

function SettingListing() {
  return (
    <div>
      <div className="bg-white rounded h-100 shadow-sm">
        <Tabs defaultTabKey="general">
          <Tabs.Tab tabKey="general" title="General">
            <div>{general}</div>
          </Tabs.Tab>
          <Tabs.Tab tabKey="contact" title="Contact">
            <div>{contact}</div>
          </Tabs.Tab>
          <Tabs.Tab tabKey="branches" title="Branches">
            <div>{branches}</div>
          </Tabs.Tab>
          <Tabs.Tab tabKey="social" title="Social">
            <div>{social}</div>
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default SettingListing;
