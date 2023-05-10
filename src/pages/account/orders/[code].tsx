import { MapPinIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse
} from "../../../common/utils";
import { withAuthentication } from "../../../common/WithAuthentication";
import Alert from "../../../components/Alert";
import Loading from "../../../components/Loading";
import ProgressButton from "../../../components/ProgressButton";
import { getOrderByCode } from "../../../services/OrderService";

function OrderRow() {
  return (
    <tr>
      <td className="ps-3 ps-lg-4 w-100 pt-3">
        <a
          href="#"
          className="text-inherit text-dark text-decoration-none text-block"
        >
          <div className="hstack gap-3">
            <div className="ratio ratio-1x1" style={{ width: 80 }}>
              <span
                style={{
                  boxSizing: "border-box",
                  display: "block",
                  overflow: "hidden",
                  width: "initial",
                  height: "initial",
                  background: "none",
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  inset: 0
                }}
              >
                <Image
                  className="card-img-top rounded"
                  src={`https://source.unsplash.com/random/200x240?random=${Math.floor(
                    Math.random() * 100
                  )}`}
                  alt="Product image."
                  fill
                  style={{
                    objectFit: "contain"
                  }}
                  priority
                />
              </span>
            </div>
            <div className="align-self-start ms-2">
              <h6 className="mb-1">Product name here</h6>
              <span className="small text-muted">White, Medium</span>
            </div>
          </div>
        </a>
      </td>
      <td className="pt-3">
        <span className="text-nowrap fw-light">2</span>
      </td>
      <td className="pt-3">
        <span className="text-nowrap fw-light">300,000ks</span>
      </td>
    </tr>
  );
}

function OrderDetail() {
  const list = [1, 2, 3, 4];

  const router = useRouter();

  const { code } = router.query;

  const { data, error, isLoading } = useSWR(
    [`/orders`, code],
    ([url, code]) =>
      typeof code === "string" ? getOrderByCode(code) : undefined,
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

    return (
      <div className="row">
        <div className="col-12 col-lg-7 col-xl-8 mb-3">
          <div className="card">
            <div className="card-body">
              <h4 className="fw-semibold mb-3">Products</h4>
              <div className="row row-cols-1 row-cols-lg-2 row-cols-xxl-3 g-3">
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

              <hr className="text-muted" />

              <div className="row g-3">
                <div className="col-12 col-lg-6">
                  <h5 className="fw-semibold">Contact</h5>
                  <div className="d-flex small">
                    <span className="fw-medium">Name:</span>
                    <span className="ms-2 text-muted">
                      {data.delivery.name}
                    </span>
                  </div>
                  <div className="d-flex small">
                    <span className="fw-medium">Phone:</span>
                    <span className="text-muted ms-2">
                      {data.delivery.phone}
                    </span>
                  </div>

                  <div className="d-flex small">
                    <span className="fw-medium">Address:</span>
                    <p className="text-muted mb-0 ms-2">
                      {data.delivery.address},&nbsp;{data.delivery.city}.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <h5 className="fw-semibold">Note</h5>
                  <p className="text-muted mb-0 small">{data.note}</p>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <span className="text-muted small">
                Order date: {formatTimestamp(data.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5 col-xl-4">
          <div className="card">
            <div className="card-body">
              <div className="hstack justify-content-between mb-2">
                <div className="text-muted">Status:</div>
                <div className="ms-2 fw-semibold">
                  {data.status.toUpperCase()}
                </div>
              </div>
              <div className="hstack justify-content-between mb-2">
                <div className="text-muted">Quantity:</div>
                <div className="ms-2">{data.quantity}</div>
              </div>
              <div className="hstack justify-content-between mb-2">
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
                    <Link href="/account/overview">My profile</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/account/orders">orders</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {typeof code === "string" ? code : ""}
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 d-flex">
              {data?.status === "PENDING" && (
                <ProgressButton
                  className="text-nowrap ms-md-auto"
                  variant="danger"
                >
                  Cancel Order
                </ProgressButton>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-3 mb-5">{content()}</div>
    </>
  );
}

export default withAuthentication(OrderDetail);
