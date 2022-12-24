import { ChartBarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Rating from "../Rating";

interface InputProps {
  shop?: any;
}

const _imageSize = 80;

function ShopManageGridItem({
  shop = {
    id: "id",
    name: "Shop Name",
    slug: "slug",
    cover: `https://source.unsplash.com/random/200x240?random=${Math.floor(
      Math.random() * 50
    )}`
  }
}: InputProps) {
  return (
    <div className="card h-100 border">
      <div className="card-body overflow-hidden">
        <div className="vstack text-center">
          <div
            className="bg-light rounded-circle mb-3 align-self-center"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="ratio ratio-1x1" style={{ width: _imageSize }}>
              {shop.cover && (
                <Image
                  className="rounded-circle"
                  src={shop.cover}
                  alt="Shop image."
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              )}
            </div>
          </div>

          <h6 className="text-truncate mb-0" style={{ fontSize: 18 }}>
            {shop.name}
          </h6>
          <div className="small text-muted mb-2 text-truncate">
            Mobile phone sales &amp; services
          </div>
          <div className="mb-4 align-self-center">
            <Rating rating={3.5} />
          </div>

          <div className="hstack gap-2">
            <Link href={`/profile/shops/${shop.id}`}>
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
