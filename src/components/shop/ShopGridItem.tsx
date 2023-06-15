import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Shop } from "../../common/models";
import { formatTimestamp } from "../../common/utils";

const _imageSize = 90;

interface ShopGridItemProps {
  value: Shop;
}

function ShopGridItem({ value }: ShopGridItemProps) {
  return (
    <div className="card h-100">
      <div className="card-body overflow-hidden position-relative h-100">
        <div
          style={{
            height: 108
          }}
          className="position-absolute start-0 top-0 end-0 bg-primary rounded-top"
        >
          {/* <Image
            src={value.cover ?? "/images/cover.png"}
            alt="Shop cover"
            fill
            sizes="33vw"
            className="rounded-top"
            priority
            style={{
              objectFit: "cover"
            }}
          /> */}
        </div>
        <div className="vstack text-center h-100">
          <div
            className="rounded-circle bg-white mb-3 align-self-center"
            onContextMenu={(e) => e.preventDefault()}
            style={{
              marginTop: 36,
              zIndex: 10,
              padding: 5
            }}
          >
            <Image
              className="rounded-circle"
              src={value.logo ?? "/images/placeholder.jpeg"}
              alt="Shop image"
              width={_imageSize}
              height={_imageSize}
              priority
              style={{
                objectFit: "cover"
              }}
            />
          </div>

          <div className="text-truncate mb-1">
            <Link
              href={`/shops/${value.slug}`}
              className="h6 link-dark"
              style={{ fontSize: 18 }}
            >
              {value.name}
            </Link>
          </div>
          <div className="small text-muted mb-4 text-truncate">
            {value.headline}
          </div>
          <div className="flex-grow-1"></div>
          <div className="vstack text-start flex-grow-0">
            <div className="hstack">
              <span className="flex-grow-1 text-muted">Rating</span>
              <div className="hstack text-warning gap-1">
                <span>{value.rating?.toFixed(1)}</span>
                <StarIcon width={16} />
              </div>
            </div>
            <hr className="bg-dark-gray my-2h" />
            <div className="hstack">
              <span className="flex-grow-1 text-muted">Since</span>
              <span>{formatTimestamp(value.createdAt!)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopGridItem;
