"use client";
import { ProgressContext } from "@/common/contexts";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse
} from "@/common/utils";
import Alert from "@/components/Alert";
import ConfirmModal from "@/components/ConfirmModal";
import Dropdown from "@/components/Dropdown";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import AcceptedPaymentList from "@/components/shop/AcceptedPaymentList";
import {
  cancelOrderByBuyer,
  getOrderByCode,
  uploadPayslip
} from "@/services/OrderService";
import Image from "next/image";
import Link from "next/link";
import {
  ChangeEvent,
  useContext,
  useRef,
  useState
} from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

function OrderPage({ code }: { code: string }) {
  const progressContext = useContext(ProgressContext);

  const [confirmCancel, setConfirmCancel] = useState(false);

  const [showReceipt, setShowReceipt] = useState(false);

  const [showAcceptedPayments, setShowAcceptedPayments] = useState(false);

  const paySlipFileRef = useRef<HTMLInputElement | null>(null);

  const { data, error, isLoading, mutate } = useSWR(
    `/orders/${code}`,
    () => (typeof code === "string" ? getOrderByCode(code) : undefined),
    {
      revalidateOnFocus: false
    }
  );

  const handleUploadPayslip = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;
      if (files && files.length > 0 && data?.id) {
        const file = files[0];
        const fileSize = file.size / (1024 * 1024);
        if (fileSize > 0.6) {
          throw "File size must not greater than 600KB";
        }
        progressContext.update(true);

        await uploadPayslip(data.id, file);
        mutate();
        toast.success("Pay slip uploaded successfully");
      }
    } catch (error) {
      const msg = parseErrorResponse(error);
      toast.error(msg);
    } finally {
      progressContext.update(false);
      event.target.value = "";
    }
  };

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
        <div className="col-12 col-xl-7">
          <div className="card mb-3">
            <div className="card-header py-2h">
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
                              item.product.thumbnail ??
                              "/images/placeholder.jpeg"
                            }
                            alt="Product image."
                            fill
                            sizes="33vw"
                            priority
                            style={{
                              objectFit: "contain"
                            }}
                          />
                        </div>
                        <div className="vstack">
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="fw-semibold text-decoration-none text-dark"
                          >
                            {item.cancelled ? (
                              <del>{item.product.name}</del>
                            ) : (
                              item.product.name
                            )}
                          </Link>
                          {item.productVariant?.attributes && (
                            <div
                              className="text-muted small"
                              style={{
                                fontSize: "0.8rem"
                              }}
                            >
                              {item.productVariant.attributes
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
                Order date: {formatTimestamp(data.audit?.createdAt)}
              </span>
            </div>
          </div>

          <div className="card">
            <div className="card-header py-2h">
              <h5 className="mb-0 fw-semibold">Delivery info</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-lg-6">
                  <h6 className="fw-semibold mb-1">Name</h6>
                  <div className="text-muted">{data.delivery.name}</div>
                </div>
                <div className="col-lg-6">
                  <h6 className="fw-semibold mb-1">Phone</h6>
                  <div className="text-muted">{data.delivery.phone}</div>
                </div>
                <div className="col-12">
                  <h6 className="fw-semibold mb-1">Address</h6>
                  <div className="text-muted">{data.delivery.address}</div>
                </div>
                <div className="col-12">
                  <h6 className="fw-semibold mb-1">Note</h6>
                  <div className="text-muted">{data.note}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-5">
          <div className="card mb-3">
            <div className="card-header py-2h">
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

                <dt
                  className="col-sm-4 fw-semibold"
                  style={{ fontSize: "1.2rem" }}
                >
                  Total:
                </dt>
                <dd
                  className="col-sm-8 text-sm-end mb-0 fw-semibold"
                  style={{ fontSize: "1.2rem" }}
                >
                  {formatNumber(data.totalPrice)} Ks
                </dd>
              </dl>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header py-2h">
              <div className="hstack gap-2">
                <h5 className="mb-0 fw-semibold">Payment</h5>
                <div className="flex-grow-1"></div>
                {data.paymentMethod === "BANK_TRANSFER" && (
                  <div
                    role={"button"}
                    className="link-anchor"
                    onClick={() => setShowAcceptedPayments(true)}
                  >
                    View accounts
                  </div>
                )}
              </div>
            </div>
            <div className="card-body">
              <dl className="row mb-0">
                <dt className="col-12 fw-semibold">Payment method</dt>
                <dd className="col-12 text-muted mb-2">
                  {data.paymentMethod === "BANK_TRANSFER"
                    ? "Bank Transfer"
                    : "Cash On Delivery"}
                </dd>

                {data.paymentMethod === "BANK_TRANSFER" && (
                  <>
                    <dt className="col-12 fw-semibold">Account type</dt>
                    <dd className="col-12 text-muted mb-0">
                      {data.payment.accountType}
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </div>

          <div className="card">
            <div className="card-header py-2h">
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
                    className="rounded-circle border"
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
      <div className="row g-3 mb-3">
        <div className="col-md-6 hstack">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="/profile">
                  Profile
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/profile/orders">
                  Orders
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {code}
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-md-6 d-flex gap-3">
          <div className="flex-grow-1 d-none d-md-flex"></div>
          {data?.status === "PENDING" && (
            <button
              className="text-nowrap btn btn-danger"
              onClick={() => setConfirmCancel(true)}
            >
              Cancel Order
            </button>
          )}
          {data?.paymentMethod === "BANK_TRANSFER" && (
            <Dropdown
              toggle="Receipt image"
              toggleClassName="btn btn-default dropdown-toggle"
              menuClassName="dropdown-menu-end"
            >
              <li
                className="dropdown-item"
                role="button"
                onClick={() => {
                  setShowReceipt(true);
                }}
              >
                View
              </li>
              <li
                className="dropdown-item"
                role="button"
                onClick={() => {
                  paySlipFileRef.current?.click();
                }}
              >
                Upload
              </li>
            </Dropdown>
          )}
          <input
            ref={paySlipFileRef}
            onChange={handleUploadPayslip}
            name="paySlip"
            className="d-none"
            type="file"
            accept="image/x-png,image/jpeg"
          />
        </div>
      </div>

      {content()}

      <ConfirmModal
        message="Are you sure to cancel order?"
        show={confirmCancel}
        close={() => setConfirmCancel(false)}
        onConfirm={async () => {
          try {
            if (!data?.id) {
              throw "Something went wrong. Please try again";
            }
            await cancelOrderByBuyer(data.id);
            mutate();
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          }
        }}
      />

      <Modal show={showReceipt}>
        {(isShown) => {
          return (
            <>
              <div className="modal-header">
                <h4 className="modal-title">Receipt</h4>
                <button
                  type="button"
                  className="btn-close shadow-none"
                  aria-label="Close"
                  onClick={() => setShowReceipt(false)}
                ></button>
              </div>
              <div className="modal-body p-0">
                {data?.payment?.receiptImage ? (
                  <Image
                    src={data.payment.receiptImage + "?t=" + new Date().getTime()}
                    alt=""
                    sizes="100vw"
                    width={0}
                    height={0}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "auto"
                    }}
                  />
                ) : (
                  <div className="p-3 text-muted">No image uploaded</div>
                )}
              </div>
            </>
          );
        }}
      </Modal>

      <Modal show={showAcceptedPayments}>
        {(isShown) => {
          if (!isShown) {
            return <></>;
          }

          return (
            <>
              <div className="modal-header">
                <h4 className="modal-title">Accepted payments</h4>
                <button
                  type="button"
                  className="btn-close shadow-none"
                  aria-label="Close"
                  onClick={() => setShowAcceptedPayments(false)}
                ></button>
              </div>
              <div className="modal-body">
                <AcceptedPaymentList shopId={data?.shop?.id ?? 0} />
              </div>
            </>
          );
        }}
      </Modal>
    </>
  );
}

export default OrderPage;
