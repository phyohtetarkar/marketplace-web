import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Input } from "../forms";
import Pagination from "../Pagination";

function DiscountRow() {
  return (
    <tr>
      <td className="ps-3 ps-lg-4 w-100">
        <span>Name</span>
      </td>
      <td>
        <span className="text-nowrap">%</span>
      </td>
      <td>
        <span className="text-nowrap">10</span>
      </td>
      <td>
        <div className="hstack align-items-center gap-2">
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

function DiscountListing() {
  const list = [1, 2, 3];
  return (
    <div className="p-0">
      <div className="row">
        <div className="col-auto me-auto">
          <Input
            id="searchInput"
            name="search"
            type="text"
            placeholder="Search your discounts"
          />
        </div>

        <div className="col-auto">
          <Link href="/profile/shops/id/create-product">
            <a className="btn btn-primary h-100 hstack">Create new</a>
          </Link>
        </div>
      </div>

      <div className="table-responsive py-3 table-bordered">
        <table className="table bg-white align-middle">
          <thead className="table-light text-nowrap align-middle">
            <tr style={{ height: 50 }}>
              <th className="ps-3 ps-lg-4 fw-medium" style={{ minWidth: 200 }}>
                NAME
              </th>
              <th className="fw-medium" style={{ minWidth: 150 }}>
                TYPE
              </th>
              <th className="fw-medium" style={{ minWidth: 100 }}>
                VALUE
              </th>
              <th className="fw-medium" style={{ minWidth: 200 }}></th>
            </tr>
          </thead>
          <tbody className="border-top-0">
            {list.map((i) => (
              <DiscountRow key={i} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end pt-3">
        <Pagination hasPrev={true} hasNext={true} />
      </div>
    </div>
  );
}

export default DiscountListing;
