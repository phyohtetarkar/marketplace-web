import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Shop } from "../../common/models";
import Rating from "../Rating";
import Tooltip from "../Tooltip";

interface ShopManageGridItemProps {
  value: Shop;
}

const _imageSize = 100;

function ShopManageGridItem({ value }: ShopManageGridItemProps) {
  // const statusView = () => {
  //   let color = "success text-success";
  //   if (value.status === "SUBSCRIPTION_EXPIRED") {
  //     color = "warning text-warning";
  //   }

  //   if (value.status === "DENIED") {
  //     color = "danger text-danger";
  //   }

  //   return (
  //     <div className={`rounded small fw-medium bg-${color} bg-opacity-25 px-1`}>
  //       {value.status}
  //     </div>
  //   );
  // };

  return (
    <div className="card h-100 border">
      <div className="card-body overflow-hidden position-relative">
        <div className="vstack text-center">
          <div
            className="bg-light rounded-circle mb-3 align-self-center"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="ratio ratio-1x1" style={{ width: _imageSize }}>
              <Image
                className="rounded-circle border"
                src={value.logo ?? "/images/placeholder.jpeg"}
                alt="Shop image."
                fill
                sizes="33vw"
                priority
                style={{
                  objectFit: "cover"
                }}
              />
            </div>
          </div>

          <Link href={`/shops/${value.slug}`} className="link-dark">
            <h6 className="text-truncate mb-1" style={{ fontSize: 16 }}>
              {value.name}
            </h6>
          </Link>
          <div className="small text-muted mb-2 text-truncate">
            {value.headline}
          </div>
          <div className="mb-3 align-self-center">
            <Rating rating={value.rating!} />
          </div>

          {/* <div className="mb-4 align-self-center">{statusView()}</div> */}

          <div className="hstack gap-2">
            <Link
              href={`/account/shops/${value.slug}`}
              className="btn btn-primary flex-grow-1 hstack justify-content-center gap-2"
            >
              {/* <ChartBarIcon width={20} /> */}
              <span>Manage shop</span>
            </Link>
          </div>

          {value.disabled && (
            <div role={"button"} className="position-absolute top-0 end-0 m-3">
              <Tooltip title="Shop has been disabled">
                <ExclamationTriangleIcon
                  width={24}
                  className="text-danger"
                  strokeWidth={1.5}
                />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopManageGridItem;
