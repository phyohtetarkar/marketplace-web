import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/solid";
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
  const statusView = () => {
    switch (value.status) {
      case "APPROVED":
        return (
          <Tooltip title="Approved">
            <CheckCircleIcon width={24} className="text-success ms-1" />
          </Tooltip>
        );

      case "PENDING":
        return (
          <Tooltip title="Your shop is currently reviewing.">
            <ExclamationTriangleIcon width={24} className="text-warning ms-1" />
          </Tooltip>
        );

      case "DISABLED":
        return (
          <Tooltip title="Your shop has been disabled.">
            <ExclamationCircleIcon width={24} className="text-danger ms-1" />
          </Tooltip>
        );
    }

    return null;
  };

  return (
    <div className="card h-100 border">
      <div className="card-body overflow-hidden position-relative h-100">
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

          <Link href={`/shops/${value.slug}`} className="link-dark">
            <h6 className="mb-3" style={{ fontSize: 16 }}>
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

          <div className="flex-grow-1"></div>

          <div className="hstack gap-2">
            <Link
              href={`/account/shops/${value.slug}/dashboard`}
              className="btn btn-primary flex-grow-1 hstack justify-content-center gap-2"
            >
              <span>Manage shop</span>
            </Link>
          </div>
        </div>

        <div className="position-absolute top-0 end-0 m-3">{statusView()}</div>
      </div>
    </div>
  );
}

export default ShopManageGridItem;
