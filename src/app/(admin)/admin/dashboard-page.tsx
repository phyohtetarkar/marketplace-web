"use client";
import makeApiRequest from "@/common/makeApiRequest";
import { DashboardData } from "@/common/models";
import {
  formatNumber,
  formatTimestamp,
  parseErrorResponse,
  validateResponse
} from "@/common/utils";
import { withAuthorization } from "@/common/withAuthorization";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import {
  RiBox3Line,
  RiGroupLine,
  RiMoneyDollarCircleLine,
  RiStore2Line
} from "@remixicon/react";
import dayjs from "dayjs";
import Link from "next/link";
import useSWR from "swr";

const getDashboardData = async () => {
  const url = "/admin/dashboard";

  const resp = await makeApiRequest({ url, authenticated: true });

  await validateResponse(resp);

  return resp.json() as Promise<DashboardData>;
};

function DashboardPage() {
  const { data, error, isLoading } = useSWR("/dashboard", getDashboardData, {
    revalidateOnFocus: false
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="row g-4">
      <div className="col-12 mb-2">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="hstack gap-3">
                  <RiMoneyDollarCircleLine size={36} className="text-muted" />
                  <div className="vstack">
                    <div className="mb-1 text-muted">Total Subscription</div>
                    <h4 className="mb-0 fw-semibold">
                      {formatNumber(data.totalSubscription)}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="card-footer py-2h">
                <Link
                  href="/admin/settings/subscription-history"
                  className="text-decoration-none link-anchor"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="hstack gap-3">
                  <RiStore2Line size={36} className="text-muted" />
                  <div className="vstack">
                    <div className="mb-1 text-muted">Shops</div>
                    <h4 className="mb-0 fw-semibold">
                      {formatNumber(data.totalShop)}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="card-footer py-2h">
                <Link href="/admin/shops" className="text-decoration-none link-anchor">
                  View all
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="hstack gap-3">
                  <RiBox3Line size={36} className="text-muted" />
                  <div className="vstack">
                    <div className="mb-1 text-muted">Products</div>
                    <h4 className="mb-0 fw-semibold">
                      {formatNumber(data.totalProduct)}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="card-footer py-2h">
                <Link href="/admin/products" className="text-decoration-none link-anchor">
                  View all
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="hstack gap-3">
                  <RiGroupLine size={36} className="text-muted" />
                  <div className="vstack">
                    <div className="mb-1 text-muted">Users</div>
                    <h4 className="mb-0 fw-semibold">
                      {formatNumber(data.totalUser)}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="card-footer py-2h">
                <Link href="/admin/users" className="text-decoration-none link-anchor">
                  View all
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <h4 className="mb-3 fw-semibold">Recent subscriptions</h4>

        <div className="card overflow-hidden border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                {data.recentSubscriptions?.length === 0 && (
                  <caption>No subscriptions</caption>
                )}
                <thead className="text-nowrap align-middle">
                  <tr className="">
                    <th scope="col" className="ps-3 py-2h">
                      SUBSCRIBE BY
                    </th>
                    <th scope="col">AMOUNT</th>
                    <th scope="col">DURATION</th>
                    <th scope="col" className="pe-3">
                      ISSUED AT
                    </th>
                    <th scope="col" className="pe-3">
                      PROMO CODE
                    </th>
                  </tr>
                </thead>
                <tbody className="text-nowrap">
                  {data.recentSubscriptions?.map((ss, i) => {
                    return (
                      <tr key={ss.invoiceNo}>
                        <th scope="row" className="py-3 ps-3">
                          <Link href={`/admin/shops/${ss.shop?.id}`} className="link-dark">
                            {ss.shop?.name}
                          </Link>
                        </th>
                        <td>
                          <span>{formatNumber(ss.subTotalPrice ?? 0)}</span>
                          <span className="text-muted">(-{formatNumber(ss.discount ?? 0)})</span>
                        </td>
                        <td>{ss.duration} days</td>
                        <td className="pe-3">
                          {formatTimestamp(ss.audit?.createdAt, true)}
                        </td>
                        <td>{ss.promoCode ?? "--"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(DashboardPage, ["DASHBOARD_READ"]);
