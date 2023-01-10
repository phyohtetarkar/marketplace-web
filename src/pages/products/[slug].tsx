import { HeartIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../../common/utils";
import { ProductGridItem } from "../../components/product";
import Tabs from "../../components/Tabs";
import Tooltip from "../../components/Tooltip";

function ProductDetail() {
  let popular;
  let available;
  let image = `https://source.unsplash.com/random/200x240?random=${Math.floor(
    Math.random() * 50
  )}`;
  let images = [2, 4, 6];
  let price = <>{formatPrice(1000)}</>;

  return (
    <div className="vstack">
      <div className="bg-primary">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <a href="#" className="text-light">
                    All Categories
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#" className="text-light">
                    Electronics
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Product name
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-white mb-4 border-bottom">
        <div className="container py-4">
          <div className="row gy-3 gx-4">
            <div className="col-lg-5">
              <div className="ratio ratio-1x1 rounded bg-light d-lg-block">
                <Image
                  className="p-2"
                  src={image}
                  alt="Product image."
                  layout="fill"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="d-flex flex-column h-100">
                <div className="hstack gap-2">
                  <h4 className="d-inline text-muted me-3">
                    {"Product name"}
                    {popular && (
                      <span className="badge bg-danger ms-2">Popular</span>
                    )}
                  </h4>
                  <Tooltip title="Add to favorite" className="ms-auto">
                    <button
                      disabled={false}
                      className="btn btn-outline-light text-primary border"
                    >
                      <HeartIcon width={24} strokeWidth={2} />
                    </button>
                  </Tooltip>
                </div>
                <h4 className="fw-semibold mb-0">{price}</h4>

                <hr />

                <dl className="row mb-3">
                  <dt className="col-sm-3 fw-semibold">{"SKU"}</dt>
                  <dd className="col-sm-9">{"YFC45"}</dd>
                  <dt className="col-sm-3 fw-semibold">{"Brand"}</dt>
                  <dd className="col-sm-9">{"Adidas"}</dd>
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

                <div className="row g-3">
                  <div className="col-12 col-lg-auto mb-2 mb-lg-0">
                    <div className="input-group h-100">
                      <button className="btn btn-outline text-muted border border-end-0">
                        <MinusIcon width={20} />
                      </button>
                      <div
                        className="bg-light align-items-center justify-content-center d-flex border"
                        style={{ minWidth: 44 }}
                      >
                        1
                      </div>
                      <button className="btn btn-outline text-muted border border-start-0">
                        <PlusIcon width={20} />
                      </button>
                    </div>
                  </div>
                  <div className="col col-lg-auto">
                    <button className="btn btn-primary w-100">
                      Add to cart
                    </button>
                  </div>
                  {/* <div className="col col-lg-auto">
                    <button className="btn btn-outline-primary w-100">
                      Buy now
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 d-none d-lg-block">
            <div className="col-5 hstack gap-2">
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
      </div>
      <div className="container">
        <div className="row mb-12 g-3">
          <div className="col-lg-8">
            <div className="bg-white shadow-sm rounded h-100">
              <Tabs defaultTabKey="description">
                <Tabs.Tab tabKey="description" title="Description">
                  <div
                    className="p-3"
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
<p>Duis facilisis ex a urna blandit ultricies. Nullam sagittis ligula non eros semper, nec mattis odio ullamcorper. Phasellus feugiat sit amet leo eget consectetur.</p>`
                    }}
                  ></div>
                </Tabs.Tab>
                <Tabs.Tab tabKey="specification" title="Video">
                  <div className="p-3">Video</div>
                </Tabs.Tab>
              </Tabs>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white py-3 border-bottom">
                <h5 className="mb-0">About Seller</h5>
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
                      <h5 className="mb-0 text-truncate">Store Name</h5>
                      <div className="text-muted small text-truncate">
                        lorem ipsum dolor sit amet
                      </div>
                    </div>
                  </div>

                  <hr className="bg-dark-gray my-2" />

                  <p className="text-muted fw-light">
                    Established in 1980, lorem ipsum dolor sit amet, consectetur
                    adipisicing elit, sed do eiusmod tempor ut labore et dolore
                    ipsum
                  </p>

                  <div>
                    <Link href="/shops/slug">
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
              {/* <div className="col">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.query;
    return {
      props: {} // will be passed to the page component as props
    };
  } catch (e) {
    console.log(e);
  }

  return {
    notFound: true
  };
};

export default ProductDetail;
