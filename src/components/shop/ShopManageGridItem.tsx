import { ChartBarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Shop } from "../../common/models";
import Rating from "../Rating";

interface ShopManageGridItemProps {
  value: Shop;
}

const _imageSize = 80;

function ShopManageGridItem({value}: ShopManageGridItemProps) {
  return (
    <div className="card h-100 border">
      <div className="card-body overflow-hidden">
        <div className="vstack text-center">
          <div
            className="bg-light rounded-circle mb-3 align-self-center"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="ratio ratio-1x1" style={{ width: _imageSize }}>
              {value.logo && (
                <Image
                  className="rounded-circle"
                  src={value.logo ?? ""}
                  alt="Shop image."
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              )}
            </div>
          </div>

          <h6 className="text-truncate mb-0" style={{ fontSize: 18 }}>
            {value.name}
          </h6>
          <div className="small text-muted mb-2 text-truncate">
            {value.headline}
          </div>
          <div className="mb-4 align-self-center">
            <Rating rating={value.rating} />
          </div>

          <div className="hstack gap-2">
            <Link href={`/profile/shops/${value.id}`}>
              <a className="btn btn-primary flex-grow-1 hstack justify-content-center gap-2">
                <ChartBarIcon width={20} />
                <span>Dashboard</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopManageGridItem;
