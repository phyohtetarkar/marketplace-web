"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { SubscriptionPlan } from "@/common/models";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse,
  validateResponse
} from "@/common/utils";
import Alert from "@/components/Alert";
import ConfirmModal from "@/components/ConfirmModal";
import Loading from "@/components/Loading";
import Link from "next/link";
import { withAuthorization } from "@/common/withAuthorization";
import { RiDeleteBinLine, RiPencilFill } from "@remixicon/react";
import makeApiRequest from "@/common/makeApiRequest";

const getSubscriptionPlans = async () => {
  const url = `/admin/subscription-plans`;
  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp.json() as Promise<SubscriptionPlan[]>;
};

const deletePlan = async (id: number) => {
  const url = `/admin/subscription-plans/${id}`;
  const resp = await makeApiRequest({
    url,
    options: {
      method: "DELETE"
    }, 
    authenticated: true
  });

  await validateResponse(resp);
};

function SubscriptionPlansPage() {
  //const [page, setPage] = useState(0);
  const [plan, setPlan] = useState<SubscriptionPlan>();
  const [showConfirm, setShowConfirm] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(
    "/subscription-plans",
    getSubscriptionPlans,
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

    if ((data?.length ?? 0) === 0) {
      return <Alert message="No plans found" variant="info" />;
    }

    return (
      <>
        <div className="table-responsive py-1 scrollbar-custom">
          <table className="table align-middle">
            <thead className="text-nowrap align-middle">
              <tr>
                <th scope="col" style={{ minWidth: 200 }}>
                  TITLE
                </th>
                <th scope="col" style={{ minWidth: 200 }}>
                  PRICE
                </th>
                <th scope="col" style={{ minWidth: 150 }}>
                  DURATION
                </th>
                <th scope="col" style={{ minWidth: 100 }}>
                  PROMO USEABLE
                </th>
                <th scope="col" style={{ minWidth: 250 }}>
                  CREATED AT
                </th>
                <th scope="col" style={{ minWidth: 100 }}>
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((p) => {
                return (
                  <tr key={p.id}>
                    <th scope="row" className="py-3">
                      <span>{p.title}</span>
                    </th>
                    <td>
                      <span>{`${formatNumber(p.price!)} Ks`}</span>
                    </td>
                    <td>
                      <span>{`${p.duration} days`}</span>
                    </td>
                    <td>
                      <span>{p.promoUsable ? "YES" : "NO"}</span>
                    </td>
                    <td>
                      <span className="text-nowrap">
                        {formatTimestamp(p.audit?.createdAt, true)}
                      </span>
                    </td>
                    <td>
                      <div className="hstack align-items-center gap-2">
                        <Link
                          href={`/admin/settings/subscription-plans/${p.id}`}
                          className="btn btn-default"
                        >
                          <RiPencilFill size={20} />
                        </Link>
                        <button
                          disabled={false}
                          className="btn btn-danger"
                          onClick={() => {
                            setPlan(p);
                            setShowConfirm(true);
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

        {/* <div className="d-flex justify-content-end pt-3">
          <Pagination
            currentPage={data?.currentPage}
            totalPage={data?.totalPage}
            onChange={setPage}
          />
        </div> */}
      </>
    );
  };

  return (
    <>
      <div className="row mb-4 g-3">
        <div className="col-auto me-auto">
          <h3 className="fw-semibold mb-1">Subscription Plans</h3>
          <nav aria-label="breadcrumb col-12">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item">
                <Link href="/admin/settings" className="link-anchor">
                  Settings
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Subscription Plans
              </li>
            </ol>
          </nav>
        </div>

        <div className="col-auto hstack">
          <Link
            href="/admin/settings/subscription-plans/create-subscription-plan"
            className="btn btn-primary hstack text-nowrap align-self-center"
          >
            Add new
          </Link>
        </div>
      </div>
      {content()}
      <ConfirmModal
        show={showConfirm}
        message="Are you sure to delete?"
        onConfirm={async () => {
          try {
            plan?.id && (await deletePlan(plan.id));
            mutate();
          } catch (error) {
            const msg = parseErrorResponse(error);
            toast.error(msg);
          }
        }}
        close={() => {
          setShowConfirm(false);
          setPlan(undefined);
        }}
      />
    </>
  );
}

export default withAuthorization(SubscriptionPlansPage, [
  "SUBSCRIPTION_PLAN_READ"
]);
