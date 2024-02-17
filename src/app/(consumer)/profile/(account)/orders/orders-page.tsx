"use client";
import { AuthenticationContext } from "@/common/contexts";
import { OrderStatus } from "@/common/models";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse
} from "@/common/utils";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { Select } from "@/components/forms";
import { OrderQuery, getMyOrders } from "@/services/OrderService";
import Link from "next/link";
import { useContext, useState } from "react";
import useSWR from "swr";

function OrdersPage() {
  const authContext = useContext(AuthenticationContext);

  const [query, setQuery] = useState<OrderQuery>({});

  const { data, error, isLoading } = useSWR(
    [`/profile/${authContext.user?.id}/orders`, query],
    ([url, q]) => getMyOrders(q),
    {
      revalidateOnFocus: false
    }
  );

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (!data || data.contents.length === 0) {
      return <Alert message={"No orders found"} />;
    }

    return (
      <>
        <div className="table-responsive bg-white rounded border">
          <table className="table align-middle mb-0">
            <thead className="text-nowrap">
              <tr>
                <th scope="col" style={{ minWidth: 200 }}>
                  Order #
                </th>
                <th className="fw-medium" style={{ minWidth: 120 }}>
                  Date Purchased
                </th>
                <th className="fw-medium" style={{ minWidth: 150 }}>
                  Status
                </th>
                <th className="fw-medium" style={{ minWidth: 150 }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="">
              {data.contents.map((o, i) => {
                let statusColor = "bg-warning";

                switch (o.status) {
                  case "CANCELLED":
                    statusColor = "bg-danger";
                    break;
                  case "COMPLETED":
                    statusColor = "bg-success";
                    break;
                }
                return (
                  <tr key={i}>
                    <th scope="row" className="py-2h">
                      <Link
                        href={`/profile/orders/${o.orderCode}`}
                        className="nav-link text-decoration-underline p-0"
                      >
                        {o.orderCode}
                      </Link>
                    </th>
                    <td>{formatTimestamp(o.audit?.createdAt)}</td>
                    <td>
                      <div className="d-flex">
                        <div
                          className={`rounded px-2 py-1 small text-light ${statusColor}`}
                        >
                          {o.status}
                        </div>
                      </div>
                    </td>
                    <td>{formatNumber(o.totalPrice)} Ks</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 d-flex justify-content-end">
          <Pagination
            currentPage={data.currentPage}
            totalPage={data.totalPage}
            onChange={(p) => {
              setQuery((old) => ({ ...old, page: p }));
            }}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col-auto">
          <Select
            value={query.status ?? ""}
            onChange={(evt) => {
              setQuery((old) => ({
                ...old,
                status: evt.target.value as OrderStatus
              }));
            }}
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </div>
      </div>
      {content()}
    </>
  );
}

export default OrdersPage;
