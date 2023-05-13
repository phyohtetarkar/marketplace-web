import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR, { useSWRConfig } from "swr";
import { Shop } from "../../common/models";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse
} from "../../common/utils";
import {
  cancelOrder,
  completeOrder,
  confirmOrder,
  getOrderByCode,
  markRemoveOrderItem
} from "../../services/OrderService";
import Alert from "../Alert";
import ConfirmModal from "../ConfirmModal";
import Dropdown from "../Dropdown";
import Loading from "../Loading";
import Modal from "../Modal";
import Tooltip from "../Tooltip";

function ShopOrderDetail({ shop }: { shop: Shop }) {
  const router = useRouter();

  const swrConfig = useSWRConfig();

  const [updateStatus, setUpdateStatus] = useState<
    "confirm" | "complete" | "cancel"
  >();

  const [showReceipt, setShowReceipt] = useState(false);

  const [removeItemId, setRemoveItemId] = useState<number>();

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
        <div className="col-12 col-xl-7 col-xxxl-8">
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
                          <div className="d-flex flex-wrap align-items-center">
                            <Link
                              href={`/products/${item.productSlug}`}
                              className={`fw-semibold text-decoration-none text-dark`}
                            >
                              {item.removed ? (
                                <del>{item.productName}</del>
                              ) : (
                                item.productName
                              )}
                            </Link>
                            {data.status !== "COMPLETED" &&
                              !item.removed &&
                              data.items.length > 1 && (
                                <Tooltip title="Mark as removed">
                                  <div
                                    className="small text-danger ms-1"
                                    role="button"
                                    onClick={() => {
                                      setRemoveItemId(item.id);
                                    }}
                                  >
                                    <TrashIcon width={18} />
                                  </div>
                                </Tooltip>
                              )}
                          </div>
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
                  <h6 className="fw-semibold mb-1">City</h6>
                  <div className="text-muted">{data.delivery.city}</div>
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
        <div className="col-12 col-xl-5 col-xxxl-4">
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

          <div className="card mb-3">
            <div className="card-header py-3">
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
            <div className="card-header py-3">
              <h5 className="mb-0 fw-semibold">Customer</h5>
            </div>
            <div className="card-body">
              <div className="hstack">
                <div className="position-relative flex-shrink-0">
                  <Image
                    src={data.user?.image ?? "/images/profile.png"}
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
                  <h6 className="mb-0">{data.user?.name ?? "Deleted"}</h6>
                  {data.user?.phone && (
                    <span className="text-muted small">
                      Phone: {data.user.phone.replace("+95", "0") ?? ""}
                    </span>
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
          <div className="hstack flex-wrap gap-2 h-100">
            <div className="flex-grow-1 d-none d-lg-flex"></div>
            {data?.paymentMethod === "BANK_TRANSFER" && (
              <button
                className="btn btn-default text-nowrap"
                onClick={() => setShowReceipt(true)}
              >
                View receipt
              </button>
            )}
            {data?.status !== "COMPLETED" && (
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
                {data?.status !== "CANCELLED" && (
                  <li
                    className="dropdown-item"
                    role="button"
                    onClick={() => {
                      setUpdateStatus("complete");
                    }}
                  >
                    Complete
                  </li>
                )}
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
      <div className="mb-5">{content()}</div>

      <ConfirmModal
        show={!!updateStatus}
        message={`Are you sure to ${updateStatus ?? ""} order?`}
        close={() => setUpdateStatus(undefined)}
        onConfirm={async () => {
          try {
            if (!updateStatus || !data?.id) {
              throw "Something went wrong. Please try again";
            }
            switch (updateStatus) {
              case "cancel":
                await cancelOrder(data.id);
                break;
              case "confirm":
                await confirmOrder(data.id);
                break;
              case "complete":
                await completeOrder(data.id);
                break;
            }
            mutate();
            swrConfig.mutate(`/shops/${shop.id ?? 0}/pending-order-count`);
            toast.success("Update order status successfully");
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          }
        }}
      />

      <ConfirmModal
        show={typeof removeItemId === "number" && removeItemId > 0}
        message="Are you sure to remove item?"
        close={() => setRemoveItemId(undefined)}
        onConfirm={async () => {
          try {
            if (!removeItemId || removeItemId <= 0 || !data?.id) {
              throw "Something went wrong. Please try again";
            }
            await markRemoveOrderItem(data.id, removeItemId);
            mutate();
            toast.success("Item removed successfully");
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
                {data?.payment.receiptImage ? (
                  <Image
                    src={data.payment.receiptImage}
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

export default ShopOrderDetail;
