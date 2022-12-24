import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
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

function ManageDiscounts() {
  const list = [1, 2, 3];
  return (
    <div className="p-0">
      <div className="card shadow-sm">
        <div className="card-header bg-white py-2h border-bottom">
          <div className="clearfix">
            <button className="btn btn-primary py-2 float-end">
              Create new
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table bg-white align-middle">
              <thead className="table-light text-nowrap align-middle">
                <tr style={{ height: 50 }}>
                  <th
                    className="ps-3 ps-lg-4 fw-medium"
                    style={{ minWidth: 200 }}
                  >
                    NAME
                  </th>
                  <th className="fw-medium" style={{ minWidth: 100 }}>
                    TYPE
                  </th>
                  <th className="fw-medium" style={{ minWidth: 120 }}>
                    VALUE
                  </th>
                  <th className="fw-medium" style={{ minWidth: 150 }}></th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {list.map((i) => (
                  <DiscountRow key={i} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end p-3 pt-0">
            <Pagination currentPage={1} totalPage={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageDiscounts;
