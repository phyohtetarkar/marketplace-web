"use client";
import { ProgressContext } from "@/common/contexts";
import { OrderItem } from "@/common/models";
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
import Tooltip from "@/components/Tooltip";
import {
  cancelOrderBySeller,
  cancelOrderItem,
  completeOrder,
  confirmOrder,
  getOrderById
} from "@/services/OrderService";
import { RiDeleteBinLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { useSWRConfig } from "swr";

interface Props {
  shopId: number;
  orderId: number;
}

function OrderPage({ shopId, orderId }: Props) {
  const [updateStatus, setUpdateStatus] = useState<
    "confirm" | "complete" | "cancel"
  >();

  const [showReceipt, setShowReceipt] = useState(false);

  const [showCancelItemConfirm, setShowCancelItemConfirm] = useState(false);

  const [orderItem, setOrderItem] = useState<OrderItem>();

  const progressContext = useContext(ProgressContext);

  const swrConfig = useSWRConfig();

  const { data, error, isLoading, mutate } = useSWR(
    `/orders/${orderId}`,
    () => getOrderById(shopId, orderId),
    {
      revalidateOnFocus: false
    }
  );

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

  const showCancel = data.items.filter((item) => !item.cancelled).length > 1;

  return (
    <>
      <div className="row g-3 mb-3 align-items-center">
        <div className="col-lg-6">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href={`/profile/shops/${shopId}/dashboard`}>
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={`/profile/shops/${shopId}/orders`}>Orders</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {data.orderCode}
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-lg-6 d-flex">
          <div className="hstack gap-3 ms-lg-auto">
            {data?.paymentMethod === "BANK_TRANSFER" && (
              <button
                className="btn btn-default text-nowrap"
                onClick={() => setShowReceipt(true)}
              >
                View receipt
              </button>
            )}
            {data?.status !== "COMPLETED" && data?.status !== "CANCELLED" && (
              <Dropdown
                toggle={<div>Update status</div>}
                menuClassName="dropdown-menu-end"
                toggleClassName="btn btn-primary dropdown-toggle hstack"
              >
                {data?.status == "PENDING" && (
                  <li
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      setUpdateStatus("confirm");
                    }}
                  >
                    Confirm
                  </li>
                )}
                <li
                  className="dropdown-item"
                  role="button"
                  onClick={() => {
                    setUpdateStatus("complete");
                  }}
                >
                  Complete
                </li>
                <div className="dropdown-divider"></div>
                <li
                  className="dropdown-item text-danger"
                  role="button"
                  onClick={() => {
                    setUpdateStatus("cancel");
                  }}
                >
                  Cancel
                </li>
              </Dropdown>
            )}
          </div>
        </div>
      </div>

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
                            style={{
                              objectFit: "contain"
                            }}
                          />
                        </div>
                        <div className="vstack">
                          <div className="d-flex flex-wrap align-items-center">
                            <Link
                              href={`/products/${item.product?.slug}`}
                              className={`fw-semibold text-decoration-none text-dark`}
                            >
                              {item.cancelled ? (
                                <del>{item.product.name}</del>
                              ) : (
                                item.product.name
                              )}
                            </Link>
                            {showCancel && (
                              <Tooltip title="Cancel Item" className="ms-1">
                                <RiDeleteBinLine
                                  size={20}
                                  role="button"
                                  className="text-danger"
                                  onClick={() => {
                                    setOrderItem(item);
                                    setShowCancelItemConfirm(true);
                                  }}
                                />
                              </Tooltip>
                            )}
                          </div>
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
                <dt className="col-sm-4  fw-semibold">Code:</dt>
                <dd className="col-sm-8 text-muted text-sm-end mb-2">
                  <b>{data.orderCode}</b>
                </dd>

                <dt className="col-sm-4 fw-semibold">Status:</dt>
                <dd
                  className={`col-sm-8 ${statusColor} text-sm-end mb-2 fw-medium`}
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
                  -{formatNumber(data.discountPrice)} Ks
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
              <h5 className="mb-0 fw-semibold">Payment</h5>
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
              <h5 className="mb-0 fw-semibold">Customer</h5>
            </div>
            <div className="card-body">
              <div className="hstack gap-3">
                {/* <div className="position-relative flex-shrink-0">
                  <Image
                    src={data.customer?.image ?? "/images/profile.png"}
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-circle"
                    style={{
                      objectFit: "cover"
                    }}
                  />
                </div> */}
                <div className="">
                  <h6 className="mb-0">{data.customer?.name ?? "Deleted"}</h6>
                  <span className="text-muted small">
                    {data.customer?.phone ?? data.customer?.email ?? ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={!!updateStatus}
        message={`Are you sure to ${updateStatus ?? ""} order?`}
        close={() => setUpdateStatus(undefined)}
        onConfirm={async (result) => {
          try {
            if (!result) {
              return;
            }
            if (!updateStatus || !data?.id) {
              throw "Something went wrong. Please try again";
            }
            progressContext.update(true);
            switch (updateStatus) {
              case "cancel":
                await cancelOrderBySeller(shopId, data.id);
                break;
              case "confirm":
                await confirmOrder(shopId, data.id);
                break;
              case "complete":
                await completeOrder(shopId, data.id);
                break;
            }
            mutate();
            toast.success("Update order status successfully");
            swrConfig.mutate(`/shops/${shopId}/pending-order-count`);
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          } finally {
            progressContext.update(false);
          }
        }}
      />

      <ConfirmModal
        show={showCancelItemConfirm}
        message={`Are you sure to cancel item?`}
        close={() => setShowCancelItemConfirm(false)}
        onConfirm={async (result) => {
          try {
            if (!result) {
              return;
            }
            if (!orderItem || !data?.id) {
              throw Error();
            }
            progressContext.update(true);
            await cancelOrderItem(shopId, data.id, orderItem.id);
            mutate();
            toast.success("Item cancelled");
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          } finally {
            setOrderItem(undefined);
            progressContext.update(false);
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
    </>
  );
}

export default OrderPage;
