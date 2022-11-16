import {
  PencilSquareIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { formatPrice, formatTimestamp } from "../../../../common/utils";
import { Input } from "../../../../components/forms";
import Pagination from "../../../../components/Pagination";

function DiscountRow() {
  return (
    <tr>
      <td className="ps-3 ps-lg-4 w-100">
        <span>Name</span>
      </td>
      <td>
        <span className="text-nowrap me-3">%</span>
      </td>
      <td>
        <span className="text-nowrap me-3">10</span>
      </td>
      <td>
        <div className="hstack align-items-center gap-2 me-3">
          <Link href="#">
            <a className="btn btn-primary">
              <PencilSquareIcon width={20} />
            </a>
          </Link>
          <button
            disabled={false}
            className="btn btn-danger"
            onClick={async () => {}}
          >
            <TrashIcon width={20} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function DiscountList() {
  const list = [1, 2, 3];

  return (
    <div className="vstack">
      <div className="bg-primary">
        <div className="container py-4">
          <div className="hstack">
            <div>
              <div className="px-2">
                <h3 className="text-light text-lg-start">Discounts</h3>
              </div>
              <div className="row px-2">
                <nav aria-label="breadcrumb col-12">
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item">
                      <Link href="/profile/shops">
                        <a href="#" className="text-light">
                          Shops
                        </a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/profile/shops/1">
                        <a href="#" className="text-light">
                          Shoes World
                        </a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Discount
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="card mt-2 mb-3">
          <div className="card-header bg-white fs-4 fw-semibold p-3">
            <div className="hstack">
              Discounts
            </div>
          </div>
          <div className="card-body p-0">
            <div className="vstack">
              <div className="p-3 p-lg-4">
                <div className="row g-3">
                  <div className="col">
                    <Input  
                      id="filterProductsInput"
                      name="filter"
                      type="text"
                      placeholder="Search your discounts"
                    />
                  </div>
                  <div className="col-auto">
                    <Link href="#">
                      <a className="btn btn-primary h-100 hstack">Create new</a>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table bg-white align-middle">
                  <thead className="table-light text-nowrap align-middle">
                    <tr style={{ height: 50 }}>
                      <th className="ps-3 ps-lg-4 fw-medium">NAME</th>
                      <th className="fw-medium">TYPE</th>
                      <th className="fw-medium">VALUE</th>
                      <th className="fw-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    {list.map((i) => (
                      <DiscountRow key={i} />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-end pt-3 px-3">
                <Pagination hasPrev={true} hasNext={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscountList;
