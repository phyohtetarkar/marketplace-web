"use client";
import dayjs from "dayjs";
import { useState } from "react";
import useSWR from "swr";
import {
  PageData,
  ShopSubscription,
  ShopSubscriptionStatus
} from "@/common/models";
import {
  buildQueryParams,
  formatNumber,
  formatTimestamp,
  parseErrorResponse,
  validateResponse
} from "@/common/utils";
import Alert from "@/components/Alert";
import { Select, DatePickerInput2 } from "@/components/forms";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import Tooltip from "@/components/Tooltip";
import { withAuthorization } from "@/common/withAuthorization";
import makeApiRequest from "@/common/makeApiRequest";
import { RiEyeFill } from "@remixicon/react";
import Link from "next/link";
import SubscriptionTransactionDetail from "./SubscriptionTransactionDetail";

export interface ShopSubscriptionQuery {
  shopId?: number;
  fromDate?: Date;
  toDate?: Date;
  status?: ShopSubscriptionStatus;
  page?: number;
}

const getAllSubscriptions = async (query: ShopSubscriptionQuery) => {
  const { shopId, fromDate, toDate, status, page } = query;
  var params = buildQueryParams({
    "shop-id": shopId,
    "from-date": fromDate
      ? dayjs(fromDate.getTime()).format("YYYY-MM-DD")
      : undefined,
    "to-date": toDate
      ? dayjs(toDate.getTime()).format("YYYY-MM-DD")
      : undefined,
    status: status,
    "time-zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    page: page
  });

  const url = `/admin/shop-subscriptions${params}`;
  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp.json() as Promise<PageData<ShopSubscription>>;
};

function SubscripionHistoryPage() {
  const [isShowDetail, setShowDetail] = useState(false);

  const [shopSubscription, setShopSubscription] = useState<ShopSubscription>();

  const [query, setQuery] = useState<ShopSubscriptionQuery>({});

  const { data, error, isLoading } = useSWR(
    [`/admin/shop-subscriptions`, query],
    ([url, q]) => getAllSubscriptions(q),
    {
      revalidateOnFocus: false
    }
  );

  const statusView = (status?: ShopSubscriptionStatus) => {
    if (status === "SUCCESS") {
      return <small className="text-success fw-semibold">{status}</small>;
    }

    if (status === "PENDING") {
      return <small className="text-warning fw-semibold">{status}</small>;
    }

    if (status === "FAILED") {
      return <small className="text-danger fw-semibold">{status}</small>;
    }

    return <></>;
  };

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (!data?.contents || data.contents.length === 0) {
      return <Alert message="No subscriptions found" />;
    }

    return (
      <>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="text-nowrap align-middle">
              <tr>
                <th scope="col" style={{ minWidth: 200 }}>
                  SUBSCRIBE BY
                </th>
                {/* <th scope="col" style={{ minWidth: 300 }}>
                  SUBSCRIPTION PLAN
                </th> */}
                <th scope="col" style={{ minWidth: 200 }}>
                  AMOUNT
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  INVOICE NO
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  STATUS
                </th>
                <th scope="col" style={{ minWidth: 200 }}>
                  ISSUED AT
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {data.contents.map((ss, i) => {
                return (
                  <tr key={ss.invoiceNo}>
                    <th scope="row" className="py-3">
                      <Link
                        href={`/admin/shops/${ss.shop?.id}`}
                        className="link-dark"
                      >
                        {ss.shop?.name}
                      </Link>
                    </th>
                    {/* <td>{ss.title}</td> */}
                    <td>
                      <span>{formatNumber(ss.subTotalPrice ?? 0)}</span>
                      {ss.promoCode && (
                        <span className="text-muted">
                          (-{formatNumber(ss.discount ?? 0)})
                        </span>
                      )}
                    </td>
                    <td>{ss.invoiceNo}</td>
                    <td>{statusView(ss.status)}</td>
                    <td>{formatTimestamp(ss.audit?.createdAt, true)}</td>
                    <td>
                      <div className="d-flex">
                        <Tooltip title="View detail">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setShopSubscription(ss);
                              setShowDetail(true);
                            }}
                          >
                            <RiEyeFill size={20} />
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end pt-3 mb-5">
          <Pagination
            currentPage={data?.currentPage}
            totalPage={data?.totalPage}
            onChange={(p) => {
              setQuery((old) => {
                return { ...old, page: p };
              });
            }}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="row mb-4">
        <div className="col-auto me-auto">
          <h3 className="fw-semibold mb-1">Subscription History</h3>
          <nav aria-label="breadcrumb col-12">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item">
                <Link href="/admin/settings" className="link-anchor">
                  Settings
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Subscription History
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-auto">
          <Select
            name="status"
            value={query.status}
            onChange={(evt) => {
              const status = evt.target.value;
              setQuery((old) => {
                return {
                  ...old,
                  status: status
                    ? (status as ShopSubscriptionStatus)
                    : undefined
                };
              });
            }}
          >
            <option value={""}>All status</option>
            <option value="PENDING">Pending</option>
            <option value="SUCCESS">Success</option>
            <option value="FAILED">Failure</option>
          </Select>
        </div>
        <div className="col-12 col-md-auto">
          <DatePickerInput2
            name="date-range"
            mode="range"
            placeholder="By date range"
            dates={
              query.fromDate && query.toDate
                ? [query.fromDate, query.toDate]
                : []
            }
            onDateChange={(dates) => {
              setQuery((old) => {
                if (dates.length === 2) {
                  return { ...old, fromDate: dates[0], toDate: dates[1] };
                }
                return { ...old, fromDate: undefined, toDate: undefined };
              });
            }}
            style={{
              width: 265
            }}
          />
        </div>
      </div>

      {content()}
      <Modal
        show={isShowDetail}
        onHidden={() => setShopSubscription(undefined)}
      >
        {(isShown) => {
          if (!isShown || !shopSubscription) {
            return <></>;
          }

          return (
            <>
              <div className="modal-header">
                <h4 className="modal-title">Subscription Detail</h4>
              </div>
              <SubscriptionTransactionDetail subscription={shopSubscription} />
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  aria-label="Close"
                  onClick={() => setShowDetail(false)}
                >
                  Close
                </button>
              </div>
            </>
          );
        }}
      </Modal>
    </>
  );
}

export default withAuthorization(SubscripionHistoryPage, [
  "SUBSCRIPTION_HISTORY_READ"
]);
