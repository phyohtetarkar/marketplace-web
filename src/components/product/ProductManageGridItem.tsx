import { TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../../common/utils";
import { Product } from "../../models";

interface InputProps {
  data?: Product;
}

function ProductManageGridItem({ data }: InputProps) {
  const product = data ?? {
    id: "1",
    slug: "slug",
    name: "Product Name",
    price: 10000,
    images: [
      `https://source.unsplash.com/random/200x240?random=${Math.floor(
        Math.random() * 100
      )}`
    ],
    shop: { id: "1", name: "Seller", slug: "seller" },
    category: { id: "1", name: "Category", slug: "Category" }
  };
  let popular;
  let available;
  let image = product.images![0]!;
  let price = <>{formatPrice(product.price ?? 0)} Ks</>;

  //   if (data.images && data.images.length > 0) {
  //     image = `${baseImagbaePath}/books%2F${data.images[0]}?alt=media`;
  //   }

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

  //   if (data.isDiscount) {
  //     price = (
  //       <>
  //         {transformDiscount(data.price, data.discount)}&nbsp;
  //         {localize("kyat")}
  //         <del className="text-muted small fw-normal ms-1">
  //           {formatPrice(data.price)}&nbsp;
  //           {localize("kyat")}
  //         </del>
  //       </>
  //     );
  //   }

  return (
    <div className="card h-100">
      <Link href={`/products/${product.slug}`}>
        <a className="text-decoration-none">
          <div
            className="position-relative"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="ratio ratio-4x3">
              <Image
                className="card-img-top"
                src={image}
                alt="Product image."
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            {available && available}
            {popular && popular}
          </div>
        </a>
      </Link>
      <div className="card-body">
        <div className="vstack">
          <div className="small text-truncate text-warning fw-medium">
            {product.category?.name}
          </div>

          <Link href={`/products/${product.id}`}>
            <a
              className="text-muted text-decoration-none text-truncate"
              style={{ fontSize: 18 }}
            >
              {product.name}
            </a>
          </Link>

          <h6 className="fw-semibold mt-2 mb-3">{price}</h6>

          <div className="hstack align-items-stretch gap-2">
            <Link href={`/profile/shops/id/id`}>
              <a className="btn btn-primary flex-grow-1">Edit</a>
            </Link>
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
