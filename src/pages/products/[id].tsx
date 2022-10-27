import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus } from "react-feather";
import { formatPrice } from "../../common/utils";
import { ProductGridItem } from "../../components/product";
import Tooltip from "../../components/Tooltip";

function ProductDetail() {
  let popular;
  let available;
  let image = `https://source.unsplash.com/random/200x240?random=${Math.floor(
    Math.random() * 100
  )}`;
  let images = [2, 4, 6];
  let price = <>{formatPrice(1000)}</>;

  return (
    <div className="vstack">
      <div className="bg-secondary">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <a href="#">All Categories</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Electronics</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Product name
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-white mb-4">
        <div className="container py-4">
          <div className="row gy-3 gx-4">
            <div className="col-lg-5">
              <div className="row">
                <div className="col-12">
                  <div className="ratio ratio-1x1 rounded bg-light d-lg-block">
                    <Image
                      className="p-2"
                      src={image}
                      alt="Product image."
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-3 d-none d-lg-block">
                <div className="col-12 d-flex justify-content-center">
                  {images.map((i) => {
                    return (
                      <div
                        key={i}
                        style={{ width: 80 }}
                        className="ratio ratio-1x1 rounded bg-light"
                      >
                        <Image
                          className="p-2"
                          src={image}
                          alt="Product image."
                          layout="fill"
                        />
                      </div>
                    );
                  })}{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="d-flex flex-column h-100">
                <div className="hstack gap-2 mt-1">
                  <h4 className="d-inline text-muted me-3">
                    {"Product name"}
                    {popular && (
                      <span className="badge bg-danger ms-2">Popular</span>
                    )}
                  </h4>
                  <Tooltip title="Add to favourite" className="ms-auto">
                    <button
                      disabled={false}
                      className="btn btn-outline-light text-primary border"
                    >
                      <Heart size={20} />
                    </button>
                  </Tooltip>
                </div>
                <h4 className="fw-semibold mb-0">{price}</h4>

                <hr />

                <dl className="row mb-3">
                  <dt className="col-sm-3 fw-semibold">{"Product Code"}</dt>
                  <dd className="col-sm-9">{"YFC45"}</dd>
                  <dt className="col-sm-3 fw-semibold">{"Barcode"}</dt>
                  <dd className="col-sm-9">{"8272504010218"}</dd>
                  <dt className="col-sm-3 fw-semibold">{"Category"}</dt>
                  <dd className="col-sm-9">{"Electronic"}</dd>
                  <dt className="col-sm-3 fw-semibold">{"Availability"}</dt>
                  <dd className="col-sm-9 fw-semibold">
                    {!available ? (
                      <span className="text-success">In Stock</span>
                    ) : (
                      <span className="text-danger">Out Of Stock</span>
                    )}
                  </dd>
                </dl>

                <div className="flex-grow-1"></div>

                <div className="d-flex">
                  <div className="col col-md-auto me-3">
                    <div className="input-group">
                      <button className="btn btn-outline text-muted border border-end-0">
                        <Minus />
                      </button>
                      <div
                        className="bg-light align-items-center justify-content-center d-flex border"
                        style={{ minWidth: 44 }}
                      >
                        1
                      </div>
                      <button className="btn btn-outline text-muted border border-start-0">
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <button className="btn btn-primary me-3">Add to cart</button>
                  <button className="btn btn-outline-primary">Buy now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mb-12 g-3">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">Description</h5>
              </div>
              <div className="card-body">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<div>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac turpis egestas integer eget aliquet. Ultricies tristique nulla aliquet enim. Ut lectus arcu bibendum at varius vel. Tempus egestas sed sed risus pretium quam vulputate dignissim.</p>
</div>
<h5>Specification</h5>
<ul style="list-style-type: circle;">
<li style="line-height: 1.5;">Lorem ipsum dolor sit amet</li>
<li style="line-height: 1.5;">Lorem ipsum dolor sit amet</li>
<li style="line-height: 1.5;">Lorem ipsum dolor sit amet</li>
<li style="line-height: 1.5;">Lorem ipsum dolor sit amet</li>
</ul>
<p>Duis facilisis ex a urna blandit ultricies. Nullam sagittis ligula non eros semper, nec mattis odio ullamcorper. Phasellus feugiat sit amet leo eget consectetur.</p>`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0">
                  <a>About Seller</a>
                </h5>
              </div>
              <div className="card-body">
                <div className="vstack">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <Image
                        src="/images/profile.png"
                        width={60}
                        height={60}
                        alt=""
                        className="rounded-circle"
                        objectFit="cover"
                      />
                    </div>

                    <div className="vstack ms-2 overflow-hidden">
                      <h5 className="mb-0 text-truncate me-2">Store</h5>
                      <div className="text-muted small text-truncate">
                        lorem ipsum dolor sit amet
                      </div>
                    </div>
                  </div>

                  <hr className="bg-light-gray my-2" />

                  <p className="text-muted fw-light">
                    Established in 1980, lorem ipsum dolor sit amet, consectetur
                    adipisicing elit, sed do eiusmod tempor ut labore et dolore
                    ipsum
                  </p>

                  <div>
                    <Link href="/profile/1">
                      <a className="btn btn-outline-light border text-primary">
                        Visit store
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-12">
            <h4 className="mb-3">Related Products</h4>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
              <div className="col">
                <ProductGridItem />
              </div>
              <div className="col">
                <ProductGridItem />
              </div>
              <div className="col">
                <ProductGridItem />
              </div>
              <div className="col">
                <ProductGridItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
