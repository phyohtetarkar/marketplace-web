import { PhoneIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Input } from "../forms";
import Pagination from "../Pagination";

function BranchListing() {
  const list = [1, 2, 3, 4, 5];
  return (
    <div className="p-0">
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
            <a className="btn btn-primary h-100 hstack">Create new</a>
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
        <Pagination hasPrev={true} hasNext={true} />
      </div>
    </div>
  );
}

export default BranchListing;
