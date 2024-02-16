/* eslint-disable @next/next/no-img-element */
import { Shop } from "@/common/models";
import Rating from "@/components/Rating";

interface ShopHeadingProps {
  shop: Shop;
}

function ShopHeading(props: ShopHeadingProps) {
  const { shop } = props;

  const heading = (
    <>
      <h5 className="mb-0">{shop.name}</h5>
      <div className="text-muted small mb-1 text-truncate">{shop.headline}</div>
    </>
  );

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: 200
        }}
        className="position-relative bg-secondary"
        onContextMenu={(e) => e.preventDefault()}
      >
        {shop?.cover && (
          <img
            src={shop.cover}
            alt=""
            style={{
              objectFit: "cover",
              width: "100%",
              height: 200
            }}
          />
        )}
      </div>
      <div
        className="row p-3 py-sm-4"
        style={{ zIndex: 999 }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="col">
          <div className="hstack">
            <div className="flex-shrink-0 mt-n6">
              <div className="bg-white p-1 rounded border position-relative">
                <img
                  src={shop?.logo ?? "/images/placeholder.jpeg"}
                  width={100}
                  height={100}
                  alt=""
                  className="rounded-1"
                  style={{
                    objectFit: "cover"
                  }}
                />
              </div>
            </div>
            <div className="ms-3 flex-column mt-n2 mt-sm-n3 d-none d-md-flex">
              {heading}
            </div>
          </div>
        </div>
        <div className="col-12 mt-2 d-block d-md-none">
          <div className="vstack">{heading}</div>
        </div>
        <div className="col-sm-auto">
          <div className="mt-sm-0 gap-1 hstack" style={{ zIndex: 999 }}>
            <div className="flex-grow-1 d-none d-md-block"></div>
            <div className="hstack gap-1">
              <Rating rating={shop?.rating ?? 0} />
              <span className="text-dark-gray">{shop?.rating?.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopHeading;
