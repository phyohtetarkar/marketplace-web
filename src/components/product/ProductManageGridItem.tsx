import { RiDeleteBin6Line } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/common/models";
import { formatNumber, transformDiscount } from "@/common/utils";

interface ProductManageGridItemProps {
  shopId: number;
  value: Product;
  onDeleteClick?: () => void
}

function ProductManageGridItem({
  shopId,
  value,
  onDeleteClick,
}: ProductManageGridItemProps) {
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
          className="bg-default px-2 py-1 text-dark rounded-1 position-absolute top-0 end-0 m-2"
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

  if (!value.withVariant && !value.available) {
    outOfStock = (
      <div className="bg-dark opacity-75 py-2 text-light position-absolute text-center bottom-0 start-0 end-0">
        Out Of Stock
      </div>
    );
  }

  return (
    <div className="card h-100">
      <Link href={`/products/${value.slug}`} className="text-decoration-none">
        <div
          className="position-relative"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="ratio ratio-4x3">
            <Image
              className="card-img-top bg-light"
              src={value.thumbnail ?? "/images/placeholder.jpeg"}
              alt="Product image."
              fill
              sizes="33vw"
              priority
              style={{
                objectFit: "contain"
              }}
            />
          </div>
          {outOfStock && outOfStock}
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

          <h6 className="fw-semibold mt-2 mb-0" style={{ fontSize: "1.2rem" }}>
            {price}
          </h6>

          <div className="mt-3 hstack align-items-stretch gap-2">
            <Link
              href={`/profile/shops/${shopId}/products/${value.id}`}
              className="btn btn-default flex-grow-1"
            >
              <span>Edit</span>
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => onDeleteClick?.()}
            >
              <RiDeleteBin6Line size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductManageGridItem;
