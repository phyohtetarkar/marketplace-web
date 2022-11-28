import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

function ShopGridItem() {
  return (
    <div className="card bg-white">
      <div className="card-body d-flex p-4">
        <div>
          <Link href={`/shops/1`}>
            <a className="text-decoration-none">
              <div
                className="position-relative bg-light rounded-circle"
                onContextMenu={(e) => e.preventDefault()}
                style={{ height: 70, width: 70 }}
              >
                <Image
                  className="rounded-circle"
                  src={`https://source.unsplash.com/random/200x240?random=${Math.floor(
                    Math.random() * 100
                  )}`}
                  alt="Product image."
                  layout="fill"
                  priority
                />
              </div>
            </a>
          </Link>
        </div>

        <div className="vstack overflow-hidden ms-4">
          <h5 className="mb-0">
            <Link href={`/shops/1`}>
              <a className="link-dark text-decoration-none text-truncate d-block">
                Citicom
              </a>
            </Link>
          </h5>
          <small className="text-muted">Computer Sales & Services</small>
          <div className="hstack py-3  small align-items-start">
            <MapPinIcon className="text-muted flex-shrink-0" width={20} />
            <div className="flex-grow-1">
              Yangon city, Pyay Road, Building 123, House 321
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <small className="text-muted">Since 2000</small>
      </div>
    </div>
  );
}

export default ShopGridItem;
