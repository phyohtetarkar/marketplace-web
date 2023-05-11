import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Shop } from "../../common/models";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse
} from "../../common/utils";
import { getOrderByCode } from "../../services/OrderService";
import Alert from "../Alert";
import Dropdown from "../Dropdown";
import Loading from "../Loading";

function ShopOrderDetail({ shop }: { shop: Shop }) {
  const router = useRouter();

  const { code } = router.query;

  const { data, error, isLoading, mutate } = useSWR(
    `/orders/${code}`,
    () => (typeof code === "string" ? getOrderByCode(code) : undefined),
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

    if (!data) {
      return <Alert message="Order not found" />;
    }

    let statusColor = "text-warning";

    switch (data.status) {
      case "CANCELLED":
        statusColor = "text-danger";
        break;
      case "COMPLETED":
        statusColor = "text-success";
        break;
    }

    return (
      <div className="row g-3">
        <div className="col-12 col-lg-7 order-2 order-lg-1">
          <div className="card mb-3">
            <div className="card-header py-3">
              <h5 className="mb-0 fw-semibold">Products</h5>
            </div>
            <div className="card-body">
              <div className="row row-cols-1 g-3">
                {data.items.map((item, i) => {
                  return (
                    <div key={i} className="col">
                      <div className="d-flex gap-3">
                        <div
                          className="position-relative bg-light rounded"
                          onContextMenu={(e) => e.preventDefault()}
                          style={{
                            minWidth: 90,
                            height: 90
                          }}
                        >
                          <Image
                            className="rounded border"
                            src={
                              item.product?.thumbnail ??
                              "/images/placeholder.jpeg"
                            }
                            alt="Product image."
                            fill
                            sizes="33vw"
                            style={{
                              objectFit: "contain"
                            }}
                          />
                        </div>
                        <div className="vstack">
                          <Link
                            href={`/products/${item.productSlug}`}
                            className="fw-semibold text-decoration-none text-dark"
                          >
                            {item.productName}
                          </Link>
                          {item.attributes && (
                            <div
                              className="text-muted small"
                              style={{
                                fontSize: "0.8rem"
                              }}
                            >
                              {item.attributes
                                .sort((f, s) => f.sort - s.sort)
                                .map((va) => `${va.attribute}: ${va.value}`)
                                .join(", ")}
                            </div>
                          )}
                          <div className="flex-grow-1"></div>
                          <div className="mt-3">
                            <span>{formatNumber(item.unitPrice)}</span>
                            <span className="text-muted ms-1">
                              &times; {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="card-footer py-2h">
              <span className="text-muted small">
                Order date: {formatTimestamp(data.createdAt)}
              </span>
            </div>
          </div>
          <div className="card">
            <div className="card-header py-3">
              <h5 className="mb-0 fw-semibold">Note</h5>
            </div>
            <div className="card-body">
              <p className="mb-0">{data.note}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5 order-1 order-lg-2">
          <div className="card mb-3">
            <div className="card-header py-3">
              <h5 className="mb-0 fw-semibold">Order summary</h5>
            </div>
            <div className="card-body">
              <dl className="row mb-0">
                <dt className="col-sm-4 fw-semibold">Status:</dt>
                <dd
                  className={`col-sm-8 ${statusColor} text-sm-end mb-2 fw-semibold`}
                >
                  {data.status}
                </dd>

                <dt className="col-sm-4 fw-semibold">Payment:</dt>
                <dd className="col-sm-8 text-muted text-sm-end mb-2">
                  {data.paymentMethod === "BANK_TRANSFER"
                    ? "Bank Transfer"
                    : "Cash On Delivery"}
                </dd>

                <dt className="col-sm-4  fw-semibold">Quantity:</dt>
                <dd className="col-sm-8 text-muted text-sm-end mb-2">
                  {data.quantity}
                </dd>

                <dt className="col-sm-4  fw-semibold">Subtotal:</dt>
                <dd className="col-sm-8 text-muted text-sm-end mb-2">
                  {formatNumber(data.subTotalPrice)} Ks
                </dd>

                <dt className="col-sm-4  fw-semibold">Discount:</dt>
                <dd className="col-sm-8 text-sm-end text-danger">
                  -{formatNumber(data.discount)} Ks
                </dd>

                <div className="col-12">
                  <hr className="text-muted" />
                </div>

                <dt className="col-sm-4  fw-semibold">Total Price:</dt>
                <dd className="col-sm-8 text-sm-end mb-0">
                  {formatNumber(data.totalPrice)} Ks
                </dd>
              </dl>
            </div>
          </div>
          <div className="card">
            <div className="card-header py-3">
              <h5 className="mb-0 fw-semibold">Delivery info</h5>
            </div>
            <div className="card-body">
              <dl className="row mb-0">
                <dt className="col-12 fw-semibold">Name</dt>
                <dd className="col-12 text-muted">{data.delivery.name}</dd>

                <dt className="col-12 fw-semibold">Phone</dt>
                <dd className="col-12 text-muted">{data.delivery.phone}</dd>

                <dt className="col-12 fw-semibold">City</dt>
                <dd className="col-12 text-muted">{data.delivery.city}</dd>

                <dt className="col-12 fw-semibold">Address</dt>
                <dd className="col-12 text-muted">{data.delivery.address}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="row mb-3 g-3">
        <div className="col-lg-6">
          <h4 className="mb-1 fw-semibold">Order Detail</h4>
          <div className="d-flex flex-wrap gap-2">
            <Link href={`/account/shops/${shop.slug}/dashboard`}>
              Dashboard
            </Link>
            <span className="text-muted">/</span>
            <Link href={`/account/shops/${shop.slug}/orders`}>Orders</Link>
            <span className="text-muted">/</span>
            <div className="text-muted" aria-current="page">
              {typeof code === "string" ? code : ""}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="hstack h-100">
            <div className="flex-grow-1 d-none d-lg-flex"></div>
            <Dropdown
              toggle={<div>Update status</div>}
              menuClassName="dropdown-menu-end"
              toggleClassName="btn btn-primary dropdown-toggle hstack"
            >
              <li className="dropdown-item" role="button">
                Cancel
              </li>
              <li className="dropdown-item" role="button">
                Confirm
              </li>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="mb-5">{content()}</div>
    </>
  );
}

export default ShopOrderDetail;
