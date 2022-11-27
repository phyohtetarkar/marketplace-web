import { PencilIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface InputProps {
  shop?: any;
}

function ShopManageGridItem({
  shop = {
    id: "id",
    name: "Shop Name",
    slug: "slug",
    cover: `https://source.unsplash.com/random/200x240?random=${Math.floor(
      Math.random() * 100
    )}`
  }
}: InputProps) {
  return (
    <div className="card h-100">
      <Link href={`/shops/${shop.id}`}>
        <a className="text-decoration-none">
          <div
            className="position-relative bg-light"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="ratio ratio-4x3">
              {shop.cover && (
                <Image
                  className="card-img-top"
                  src={shop.cover}
                  alt="Shop image."
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              )}
            </div>
          </div>
        </a>
      </Link>
      <div className="card-body">
        <div className="vstack">
          <Link href={`/shops/${shop.id}`}>
            <a
              className="text-dark text-decoration-none text-truncate mb-3"
              style={{ fontSize: 18 }}
            >
              {shop.name}
            </a>
          </Link>

          <div className="hstack gap-2">
            <Link href={`/profile/shops/${shop.id}`}>
              <a className="btn btn-primary flex-grow-1">Detail</a>
            </Link>
            <Link href={`/profile/shops/${shop.id}/edit`}>
              <a className="btn btn-outline-light text-primary border hstack">
                <PencilSquareIcon width={20} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopManageGridItem;
