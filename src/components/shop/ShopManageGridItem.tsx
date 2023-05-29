import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Shop, ShopStatus } from "../../common/models";
import { formatTimestamp } from "../../common/utils";

interface ShopManageGridItemProps {
  value: Shop;
}

const _imageSize = 100;

function ShopManageGridItem({ value }: ShopManageGridItemProps) {
  const statusView = (status?: ShopStatus) => {
    if (status === "APPROVED") {
      return <small className="fw-semibold text-success">{status}</small>;
    }

    if (status === "PENDING") {
      return <small className="fw-semibold text-warning">{status}</small>;
    }

    if (status === "DISABLED") {
      return <small className="fw-semibold text-danger">{status}</small>;
    }
    return <></>;
  };

  return (
    <div className="card h-100 border">
      <div className="card-body overflow-hidden h-100">
        <div className="vstack text-center h-100">
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

          <Link
            href={`/account/shops/${value.slug}/dashboard`}
            className="link-dark"
          >
            <h6 className="mb-1" style={{ fontSize: 16 }}>
              {value.name}
            </h6>
          </Link>

          {value.headline && (
            <div className="small text-muted mb-4 text-truncate">
              {value.headline}
            </div>
          )}

          <div className="flex-grow-1"></div>

          <div className="vstack text-start flex-grow-0">
            <div className="hstack">
              <span className="flex-grow-1 text-muted">Rating</span>
              <div className="hstack text-warning gap-1">
                <span>{value?.rating?.toFixed(1) ?? "0.0"}</span>
                <StarIcon width={16} />
              </div>
            </div>
            <hr className="bg-dark-gray my-2h" />
            <div className="hstack">
              <span className="flex-grow-1 text-muted">Since</span>
              <span>{formatTimestamp(value?.createdAt ?? 0)}</span>
            </div>
            <hr className="bg-dark-gray my-2h" />
            <div className="hstack">
              <span className="flex-grow-1 text-muted">Status</span>
              {statusView(value?.status)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopManageGridItem;
