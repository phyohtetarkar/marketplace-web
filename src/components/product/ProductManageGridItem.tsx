import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../common/models";
import { formatNumber, transformDiscount } from "../../common/utils";

interface ProductManageGridItemProps {
  value: Product;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

function ProductManageGridItem({
  value,
  onEditClick,
  onDeleteClick
}: ProductManageGridItemProps) {
  let popular;
  let outOfStock;

  let price = <>{formatNumber(value.price ?? 0)} Ks</>;

  const status = () => {
    if (value.status === "PUBLISHED") {
      return (
        <div
          className="bg-success px-2 py-1 text-light rounded-1 position-absolute top-0 end-0 m-2"
          style={{
            fontSize: 12
          }}
        >
          PUBLISHED
        </div>
      );
    }

    if (value.status === "DRAFT") {
      return (
        <div
          className="bg-default px-2 py-1 text-light rounded-1 position-absolute top-0 end-0 m-2"
          style={{
            fontSize: 12
          }}
        >
          DRAFT
        </div>
      );
    }

    return null;
  };

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

  if (value.discount) {
    price = (
      <>
        <del className="text-muted small fw-normal me-1">
          {formatNumber(value.price ?? 0)}&nbsp;Ks
        </del>
        {formatNumber(transformDiscount(value.discount, value.price))}&nbsp;Ks
      </>
    );
  }

  if ((value.stockLeft ?? 0) === 0) {
    outOfStock = (
      <div className="bg-dark opacity-75 py-2 text-light position-absolute text-center bottom-0 start-0 end-0">
        Out Of Stock
      </div>
    );
  }

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
    <div className="card h-100">
      <Link href={`/products/${value.slug}`} className="text-decoration-none">
        <div
          className="position-relative"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="ratio ratio-4x3">
            <Image
              className="card-img-top"
              src={value.thumbnail ?? "/images/placeholder.jpeg"}
              alt="Product image."
              fill
              sizes="33vw"
              priority
              style={{
                objectFit: "cover"
              }}
            />
          </div>
          {outOfStock && outOfStock}
          {popular && popular}
          {status()}
        </div>
      </Link>
      <div className="card-body">
        <div className="vstack">
          {/* <div className="small text-truncate text-success fw-medium">
            {value.category?.name}
          </div> */}

          <Link
            href={`/products/${value.slug}`}
            className="text-muted text-decoration-none text-truncate"
            style={{ fontSize: 18 }}
          >
            {value.name}
          </Link>

          <h6 className="fw-semibold mt-2 mb-0">{price}</h6>

          <div className="mt-3 hstack align-items-stretch gap-2">
            <button
              className="btn btn-default flex-grow-1"
              onClick={() => onEditClick?.()}
            >
              <span>Edit</span>
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDeleteClick?.()}
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
