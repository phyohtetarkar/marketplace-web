import { PhoneIcon } from "@heroicons/react/24/outline";
import Pagination from "../Pagination";

function ShopBranchListing() {
  const list = [1, 2, 3, 4, 5];
  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 g-3">
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
}

export default ShopBranchListing;
