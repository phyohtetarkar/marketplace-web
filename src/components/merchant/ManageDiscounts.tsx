import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { Discount, PageData } from "../../common/models";
import { getAllDiscounts } from "../../services/DiscountService";
import Loading from "../Loading";
import Pagination from "../Pagination";

interface DiscountProps {
  value: Discount;
}

function DiscountRow({ value }: DiscountProps) {
  return (
    <tr>
      <td className="ps-3 ps-lg-4 w-100">
        <span>{value.title}</span>
      </td>
      <td>
        <span className="text-nowrap">{value.type}</span>
      </td>
      <td>
        <span className="text-nowrap">{value.value}</span>
      </td>
      <td>
        <div className="hstack align-items-center gap-2">
          <button className="btn btn-primary">
            <PencilSquareIcon width={20} />
          </button>
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

function ManageDiscounts({ shopId }: { shopId: number }) {
  const [page, setPage] = useState(0);
  const [discount, setDiscount] = useState<Discount>();
  const { data, error, isLoading, mutate } = useSWR<PageData<Discount>, Error>(
    ["/discounts", page],
    ([url, p]) => getAllDiscounts(shopId, p),
    {
      revalidateOnFocus: false
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return null;
  }

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
                {data?.contents &&
                  data?.contents.map((d, i) => (
                    <DiscountRow key={i} value={d} />
                  ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end p-3 pt-0">
            <Pagination
              currentPage={data?.currentPage}
              totalPage={data?.totalPage}
              onChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageDiscounts;
