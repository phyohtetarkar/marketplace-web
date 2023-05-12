import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse
} from "../../../common/utils";
import { withAuthentication } from "../../../common/WithAuthentication";
import Alert from "../../../components/Alert";
import ConfirmModal from "../../../components/ConfirmModal";
import Loading from "../../../components/Loading";
import { cancelOrder, getOrderByCode } from "../../../services/OrderService";

function OrderDetail() {
  const [confirmCancel, setConfirmCancel] = useState(false);

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

    let statusColor = "bg-warning";

    switch (data.status) {
      case "CANCELLED":
        statusColor = "bg-danger";
        break;
      case "COMPLETED":
        statusColor = "bg-success";
        break;
    }

    return (
      <div className="row">
        <div className="col-12 col-lg-7 col-xl-8">
          <div className="card mb-3">
            <div className="card-body">
              <h4 className="fw-semibold mb-3">Products</h4>
              <div className="row row-cols-1 row-cols-lg-2 row-cols-xxxl-3 g-3">
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
                            {item.removed ? (
                              <del>{item.productName}</del>
                            ) : (
                              item.productName
                            )}
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
        <div className="col-12 col-lg-5 col-xl-4">
          <div className="card mb-3">
            <div className="card-header bg-white py-2h">
              <div className="hstack justify-content-between">
                <div className="fw-semibold">Status:</div>
                <div
                  className={`ms-2 small text-light ${statusColor} px-2 py-1 rounded`}
                >
                  {data.status.toUpperCase()}
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="hstack justify-content-between mb-2h">
                <div className="text-muted">Quantity:</div>
                <div className="ms-2">{data.quantity}</div>
              </div>
              <div className="hstack justify-content-between mb-2h">
                <div className="text-muted">Subtotal:</div>
                <div className="ms-2">
                  {formatNumber(data.subTotalPrice)} Ks
                </div>
              </div>
              <div className="hstack justify-content-between">
                <div className="text-muted">Discount:</div>
                <div className="ms-2 text-danger">
                  -{formatNumber(data.discount)} Ks
                </div>
              </div>
              <hr className="text-muted" />
              <div className="hstack justify-content-between">
                <div className="fw-semibold">Total Price:</div>
                <div className="ms-2 fw-semibold">
                  {formatNumber(data.totalPrice)} Ks
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
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

          <div className="card">
            <div className="card-header py-3">
              <h5 className="mb-0 fw-semibold">Seller</h5>
            </div>
            <div className="card-body">
              <div className="hstack">
                <div className="position-relative flex-shrink-0">
                  <Image
                    src={data.shop?.logo ?? "/images/placeholder.jpeg"}
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-circle"
                    style={{
                      objectFit: "cover"
                    }}
                  />
                </div>
                <div className="ms-3">
                  {data.shop ? (
                    <>
                      <Link
                        href={`/shops/${data.shop?.slug}`}
                        className="link-dark"
                      >
                        <div className="fw-semibold">
                          {data.shop?.name ?? ""}
                        </div>
                      </Link>
                      <span className="text-muted small">
                        {data.shop?.headline}
                      </span>
                    </>
                  ) : (
                    <div className="fw-semibold">Deleted</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="header-bar">
        <div className="container py-4">
          <div className="row g-3">
            <div className="col-md-6 hstack">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link href="/account/overview">Profile</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/account/orders">Orders</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {typeof code === "string" ? code : ""}
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 d-flex">
              {data?.status === "PENDING" && (
                <button
                  className="text-nowrap ms-md-auto btn btn-danger"
                  onClick={() => setConfirmCancel(true)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-3 mb-5">{content()}</div>

      <ConfirmModal
        message="Are you sure to cancel order?"
        show={confirmCancel}
        close={() => setConfirmCancel(false)}
        onConfirm={async () => {
          try {
            if (!data?.id) {
              throw "Something went wrong. Please try again";
            }
            await cancelOrder(data.id);
            mutate();
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          }
        }}
      />
    </>
  );
}

export default withAuthentication(OrderDetail);
