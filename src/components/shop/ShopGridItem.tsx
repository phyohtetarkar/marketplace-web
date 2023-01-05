import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Shop } from "../../common/models";

const _imageSize = 90;

interface ShopGridItemProps {
  value: Shop;
}

function ShopGridItem({value} : ShopGridItemProps ) {
  return (
    <div className="card shadow-sm">
      <div className="card-body p-4 overflow-hidden">
        <div className="vstack text-center">
          <div
            className="bg-light rounded-circle mb-3 align-self-center"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="ratio ratio-1x1" style={{ width: _imageSize }}>
              <Image
                className="rounded-circle"
                src={value.logo ?? ""}
                alt="Shop image."
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </div>

          <div className="text-truncate">
            <Link href={`/shops/slug`}>
              <a
                className="h6 mb-1 text-decoration-none link-dark"
                style={{ fontSize: 18 }}
              >
                {value.name}
              </a>
            </Link>
          </div>
          <div className="small text-muted mb-5 text-truncate">
            {value.headline}
          </div>
          {/* <div className="mb-4">
            <Rating rating={3.5} />
          </div> */}

          {/* <div className="hstack gap-2 align-items-stretch">
            <Link href={`/shops/slug`}>
              <a className="btn btn-primary flex-grow-1">View detail</a>
            </Link>
            <button className="btn btn-outline-light text-primary border">
              <ShareIcon width={20} />
            </button>
          </div> */}
          <div className="vstack text-start">
            {/* <div className="hstack">
              <span className="flex-grow-1 text-muted">Products</span>
              <span>500</span>
            </div> */}
            <div className="hstack">
              <span className="flex-grow-1 text-muted">Rating</span>
              <div className="hstack text-warning gap-1">
                <span>{value.rating}</span>
                <StarIcon width={16} />
              </div>
            </div>
            <hr className="bg-dark-gray my-2h" />
            <div className="hstack">
              <span className="flex-grow-1 text-muted">Since</span>
              <span>{value.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopGridItem;
