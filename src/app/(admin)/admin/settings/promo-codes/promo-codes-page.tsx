"use client";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { PageData, SubscriptionPromo } from "@/common/models";
import {
  buildQueryParams,
  formatNumber,
  formatTimestamp,
  parseErrorResponse,
  validateResponse
} from "@/common/utils";
import Alert from "@/components/Alert";
import ConfirmModal from "@/components/ConfirmModal";
import { Select } from "@/components/forms";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { withAuthorization } from "@/common/withAuthorization";
import makeApiRequest from "@/common/makeApiRequest";
import Link from "next/link";
import { RiDeleteBinLine, RiPencilFill } from "@remixicon/react";
import { ProgressContext } from "@/common/contexts";

export interface SubscriptionPromoQuery {
  available?: boolean;
  used?: boolean;
  expired?: boolean;
  page?: number;
}

const getPromoCodes = async (query: SubscriptionPromoQuery) => {
  const params = buildQueryParams(query);
  const url = `/admin/subscription-promos${params}`;

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return (await resp.json()) as PageData<SubscriptionPromo>;
};

const deletePromoCode = async (id: number) => {
  const url = `/admin/subscription-promos/${id}`;

  const resp = await makeApiRequest({
    url,
    options: {
      method: "DELETE"
    },
    authenticated: true
  });

  await validateResponse(resp);
};

function PromoCodesPage() {
  const [query, setQuery] = useState<SubscriptionPromoQuery>({});

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [promo, setPromo] = useState<SubscriptionPromo>();

  const progressContext = useContext(ProgressContext);

  const { data, error, isLoading, mutate } = useSWR(
    ["/admin/subscription-promos", query],
    ([url, q]) => getPromoCodes(q),
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

    if ((data?.totalPage ?? 0) === 0) {
      return <Alert message="No promo codes found" variant="info" />;
    }

    return (
      <>
        <div className="table-responsive py-1 scrollbar-custom">
          <table className="table align-middle">
            <thead className="text-nowrap align-middle">
              <tr>
                <th scope="col" style={{ minWidth: 250 }}>
                  CODE
                </th>
                <th scope="col" style={{ minWidth: 200 }}>
                  AMOUNT
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  TYPE
                </th>
                <th scope="col" style={{ minWidth: 100 }}>
                  USED
                </th>
                <th scope="col" style={{ minWidth: 200 }}>
                  EXPIRED AT
                </th>
                <th scope="col" style={{ minWidth: 100 }}>
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.contents?.map((c) => {
                return (
                  <tr key={c.id}>
                    <th scope="row" className="py-3">
                      {c.code}
                    </th>
                    <td>{formatNumber(c.value ?? 0)}</td>
                    <td>{c.valueType === "FIXED_AMOUNT" ? ".00" : "%"}</td>
                    <td>
                      <span className="fw-semibold">
                        {c.used ? "YES" : "NO"}
                      </span>
                    </td>
                    <td>{formatTimestamp(c.expiredAt ?? 0)}</td>
                    <td>
                      <div className="hstack align-items-center gap-2">
                        <Link
                          href={`/admin/settings/promo-codes/${c.id}`}
                          className="btn btn-default"
                        >
                          <RiPencilFill size={20} />
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setPromo(c);
                            setShowDeleteConfirm(true);
                          }}
                        >
                          <RiDeleteBinLine size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end mb-5 pt-3">
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
      <div className="row mb-4 g-3">
        <div className="col-auto me-auto">
          <h3 className="fw-semibold mb-1">Promo Codes</h3>
          <nav aria-label="breadcrumb col-12">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item">
                <Link href="/admin/settings" className="link-anchor">
                  Settings
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Promo Codes
              </li>
            </ol>
          </nav>
        </div>

        <div className="col-auto hstack gap-3">
          <Select
            value={query.used ? "used" : query.available ? "available" : ""}
            onChange={(evt) => {
              setQuery((old) => {
                return {
                  used: evt.target.value === "used" ? true : undefined,
                  available: evt.target.value === "available" ? true : undefined
                };
              });
            }}
          >
            <option value="">All Promos</option>
            <option value="available">Available</option>
            <option value="used">Used</option>
          </Select>
          <Link
            href="/admin/settings/promo-codes/create-promo-code"
            className="btn btn-primary hstack text-nowrap align-self-center"
          >
            Add new
          </Link>
        </div>
      </div>
      {content()}

      <ConfirmModal
        message="Are you sure to delete?"
        show={showDeleteConfirm}
        close={() => setShowDeleteConfirm(false)}
        onConfirm={async (result) => {
          try {
            if (!result) {
              return;
            }
            if (!promo?.id) {
              throw Error();
            }
            progressContext.update(true);
            await deletePromoCode(promo.id);
            toast.success("Promo code deleted");
            mutate();
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          } finally {
            setPromo(undefined);
            progressContext.update(false);
          }
        }}
      />
    </>
  );
}

export default withAuthorization(PromoCodesPage, ["PROMO_CODE_READ", "PROMO_CODE_WRITE"]);
