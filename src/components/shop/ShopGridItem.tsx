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
                Shop Name
              </a>
            </Link>
          </h5>
          <small className="text-muted">Groceries Bakery</small>
          <div className="py-3">
            <ul className="list-unstyled mb-0 small">
              <li>Something</li>
              <li>Something</li>
            </ul>
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
