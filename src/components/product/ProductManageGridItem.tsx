import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../common/models";
import { formatPrice } from "../../common/utils";

interface ProductManageGridItemProps {
  value: Product;
  onEditClick?: () => void;
}

function ProductManageGridItem({
  value,
  onEditClick
}: ProductManageGridItemProps) {
  let popular;
  let available;
  let draft;

  let price = <>{formatPrice(value.price ?? 0)} Ks</>;

  //   if (data.images && data.images.length > 0) {
  //     image = `${baseImagbaePath}/books%2F${data.images[0]}?alt=media`;
  //   }

  if (value.status && value.status !== "PUBLISHED") {
    draft = (
      <div
        className="bg-danger px-2 py-1 text-light rounded-1 position-absolute top-0 end-0 m-2"
        style={{
          fontSize: 12
        }}
      >
        {value.status}
      </div>
    );
  }

  //   if (data.popular) {
  //     popular = (
  //       <div
  //         className="badge bg-danger py-2 position-absolute"
  //         style={{ top: "1rem", right: "1rem" }}
  //       >
  //         Popular
  //       </div>
  //     );
  //   }

  //   if (!data.available) {
  //     available = (
  //       <div className="bg-dark opacity-75 py-2 text-light position-absolute text-center bottom-0 start-0 end-0">
  //         Out Of Stock
  //       </div>
  //     );
  //   }

  // if (value.discount) {
  //   price = (
  //     <>
  //       {transformDiscount(data.price, data.discount)}&nbsp;
  //       {localize("kyat")}
  //       <del className="text-muted small fw-normal ms-1">
  //         {formatPrice(data.price)}&nbsp;
  //         {localize("kyat")}
  //       </del>
  //     </>
  //   );
  // }

  return (
    <div className="card h-100 shadow-sm">
      <Link href={`/products/${value.slug}`}>
        <a className="text-decoration-none">
          <div
            className="position-relative"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="ratio ratio-4x3">
              <Image
                className="card-img-top"
                src={value.thumbnail ?? "/placeholder.jpeg"}
                alt="Product image."
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
            {available && available}
            {popular && popular}
            {draft && draft}
          </div>
        </a>
      </Link>
      <div className="card-body">
        <div className="vstack">
          <div className="small text-truncate text-warning fw-medium">
            {value.category?.name}
          </div>

          <Link href={`/products/${value.slug}`}>
            <a
              className="text-muted text-decoration-none text-truncate"
              style={{ fontSize: 18 }}
            >
              {value.name}
            </a>
          </Link>

          <h6 className="fw-semibold mt-2 mb-3">{price}</h6>

          <div className="hstack align-items-stretch gap-2">
            <button
              className="btn btn-primary flex-grow-1"
              onClick={() => onEditClick?.()}
            >
              Edit
            </button>
            <button
              disabled={false}
              className="btn btn-outline-danger"
              onClick={async () => {}}
            >
              <TrashIcon width={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductManageGridItem;
