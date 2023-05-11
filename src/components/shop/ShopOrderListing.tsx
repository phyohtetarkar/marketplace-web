import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { OrderStatus, Shop } from "../../common/models";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse
} from "../../common/utils";
import { getShopOrders, OrderQuery } from "../../services/OrderService";
import Alert from "../Alert";
import { Select } from "../forms";
import Loading from "../Loading";
import Pagination from "../Pagination";

function ShopOrderListing({ shop }: { shop: Shop }) {
  const [query, setQuery] = useState<OrderQuery>({});

  const [orderCode, setOrderCode] = useState<string>();

  const shopId = shop.id ?? 0;

  const { data, error, isLoading, mutate } = useSWR(
    [`/shops/${shopId}/orders`, query],
    ([url, q]) => getShopOrders(shopId, q),
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
      return <Alert message={"No order found"} />;
    }

    return (
      <>
        <div className="table-responsive">
          <table className="table align-middle">
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
                        href={`/account/shops/${shop.slug}/orders/${o.orderCode}`}
                        className="nav-link text-decoration-underline p-0"
                      >
                        {o.orderCode}
                      </Link>
                    </th>
                    <td>{formatTimestamp(o.createdAt)}</td>
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

export default ShopOrderListing;
