"use client";
import { withAuthentication } from "@/common/WithAuthentication";
import { AuthenticationContext } from "@/common/contexts";
import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import { getUserStatistic } from "@/services/UserService";
import { RiPencilFill } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import useSWR from "swr";

function ProfilePage() {
  const { user } = useContext(AuthenticationContext);

  const { data, error, isLoading } = useSWR(
    "/profile/statistic",
    getUserStatistic,
    {
      revalidateOnFocus: false
    }
  );

  if (!user) {
    return <></>;
  }

  if (error) {
    return <Alert message={parseErrorResponse(error)} variant="danger" />
  }

  return (
    <div className="card mb-3">
      <div className="card-body p-md-4">
        <div className="hstack">
          <div className="position-relative flex-shrink-0">
            <Image
              src={user?.image ?? "/images/profile.png"}
              width={60}
              height={60}
              alt=""
              sizes="50vh"
              className="rounded-circle border"
              style={{
                objectFit: "cover"
              }}
            />
          </div>
          <div className="ms-3 text-truncate">
            <h6 className="mb-0">{user?.name ?? ""}</h6>
            <span className="text-muted small">
              {user?.email ?? user?.phone ?? ""}
            </span>
          </div>
          <div className="ms-auto">
            <div className="d-flex d-none d-lg-block">
              <Link
                href={"/profile/setting"}
                className="btn btn-outline-primary"
              >
                Edit
              </Link>
            </div>
          </div>
          <div className="d-flex d-block d-lg-none ms-2">
            <button className="btn btn-primary">
              <RiPencilFill size={20} />
            </button>
          </div>
        </div>
        <hr className="bg-dark-gray" />
        <div className="text-muted mb-3">Overview</div>
        <div className="card-group mt-2">
          <div className="card border bg-light">
            <div className="p-3">
              <h4 className="title">{data?.totalOrder ?? 0}</h4>
              <span>Orders</span>
            </div>
          </div>
          <div className="card border bg-light">
            <div className="p-3">
              <h4 className="title">{data?.totalFavorite ?? 0}</h4>
              <span>Favorites</span>
            </div>
          </div>
          <div className="card border bg-light">
            <div className="p-3">
              <h4 className="title">{data?.totalShop ?? 0}</h4>
              <span>Shops</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuthentication(ProfilePage);
