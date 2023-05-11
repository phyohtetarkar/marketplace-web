import Link from "next/link";
import { useContext, useState } from "react";
import useSWR from "swr";
import { AuthenticationContext } from "../../../common/contexts";
import { OrderStatus } from "../../../common/models";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse
} from "../../../common/utils";
import { withAuthentication } from "../../../common/WithAuthentication";
import AccountMenu from "../../../components/account/AccountMenu";
import Alert from "../../../components/Alert";
import { Select } from "../../../components/forms";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { getMyOrders, OrderQuery } from "../../../services/OrderService";

function OrderCard() {
  return (
    <div className="card mb-3">
      <div className="card-header border-bottom py-3 bg-white">
        <div className="row">
          <div className="col d-flex">
            <span className="fw-semibold h5 my-auto">Order ID: 20001</span>
          </div>
          <div className="col-auto">
            <Link
              href={"/account/orders/1"}
              className="btn btn-outline-primary"
            >
              View Detail
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row gx-2 gy-3">
          <div className="col-md-5 small">
            <h6 className="fw-bold">Deliver to</h6>
            <div>
              Name:<span className="text-muted ms-2">Mobile Com</span>
            </div>
            <div>
              Phone:<span className="text-muted ms-2">+95911223344</span>
            </div>
            <div>
              Address:
              <span className="text-muted ms-2">
                No. 26, Pyay Street, Hlaing Township, Yangon, Myanmar
              </span>
            </div>
            <div>
              Notes:
              <span className="text-muted ms-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
            </div>
          </div>
          <div className="col-md-4 small">
            <h6 className="fw-bold">Payment info</h6>
            <div>
              Total Products:<span className="text-muted ms-2">5</span>
            </div>
            <div>
              Subtotal:<span className="text-muted ms-2">30,000ks</span>
            </div>
            <div>
              Discounts:
              <span className="text-danger ms-2">-0ks</span>
            </div>
            <div>
              Total Price:
              <span className="text-success ms-2">33,000ks</span>
            </div>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Status</h6>
            <div className="text-success">
              <small className="fw-semibold">DELIVERED</small>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer small border-0 py-3 text-muted">
        {formatTimestamp(Date.now(), true)}
      </div>
    </div>
  );
}

function MyOrders() {
  const authContext = useContext(AuthenticationContext);

  const [query, setQuery] = useState<OrderQuery>({});

  const { data, error, isLoading } = useSWR(
    [`/profile/${authContext.payload?.id}/orders`, query],
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
                        href={`/account/orders/${o.orderCode}`}
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
    <div>
      <div className="container py-3 mb-5">
        <div className="row g-3">
          <div className="col-lg-4 col-xl-3">
            <AccountMenu />
          </div>
          <div className="col-lg-8 col-xl-9">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthentication(MyOrders);
