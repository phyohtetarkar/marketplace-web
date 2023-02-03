/* eslint-disable @next/next/no-img-element */
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Swiper, { Navigation, Pagination, Zoom } from "swiper";
import { Swiper as SwiperView, SwiperSlide } from "swiper/react";
import { Product, ProductVariant } from "../../common/models";
import { formatPrice } from "../../common/utils";
import { AddToCartButton, AddToFavoriteButton } from "../../components/product";
import Rating from "../../components/Rating";
import Tabs from "../../components/Tabs";
import { getProductBySlug } from "../../services/ProductService";

function ProductDetail({ product }: { product: Product }) {
  const [selectedOptions, setSelectedOptions] = useState<Map<string, string>>();

  const [variant, setVariant] = useState<ProductVariant>();

  const [imageIndex, setImageIndex] = useState(0);

  const [swiper, setSwiper] = useState<Swiper>();

  const [quantity, setQuantity] = useState(1);

  const options = useMemo(() => {
    if (product.variants) {
      const map = new Map<string, string[]>();
      product.variants
        .flatMap((v) => v.options)
        .forEach((op) => {
          const old = map.get(op.option);
          !old?.find((v) => v === op.value) &&
            map.set(op.option, old ? [...old, op.value] : [op.value]);
        });

      return map;
    }
    return null;
  }, [product]);

  useEffect(() => {
    if (!product) {
      return;
    }

    if (!product.variants || product.variants.length === 0) {
      return;
    }

    const v = product.variants?.reduce((p, c) =>
      (p.price ?? 0) <= (c.price ?? 0) ? p : c
    );

    const map = new Map<string, string>();

    v?.options.forEach((op) => {
      map.set(op.option, op.value);
    });

    setSelectedOptions(map);
  }, [product]);

  useEffect(() => {
    if (!selectedOptions) {
      return;
    }

    const sop = selectedOptions;

    const selection = product.variants?.find((v) => {
      return v.options.every((op) => op.value === sop.get(op.option));
    });

    setVariant(selection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  let popular;
  let available;
  // let image = `https://source.unsplash.com/random/200x240?random=${Math.floor(
  //   Math.random() * 50
  // )}`;
  let price = (
    <>
      {formatPrice((variant?.price ?? product.price ?? 0) * quantity)}
      &nbsp;Ks
    </>
  );

  return (
    <div className="vstack">
      <div className="header-bar">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <a className="text-light">Home</a>
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href={`/collections/${product.category?.slug}`}>
                    <a className="text-light">{product.category?.name}</a>
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-white mb-4 border-bottom">
        <div className="container py-3">
          <div className="row gy-3 gx-4">
            <div className="col-lg-5">
              <div
                className="hstack align-items-start gap-2"
                onContextMenu={(evt) => evt.preventDefault()}
              >
                <div className="vstack gap-2 flex-shrink-0 d-none d-lg-flex">
                  {product.images?.map((img, i) => {
                    const selected =
                      i === imageIndex ? "border border-primary" : "";
                    return (
                      <div
                        role={"button"}
                        key={i}
                        style={{ width: 60 }}
                        className={`ratio ratio-1x1 rounded border ${selected}`}
                        onClick={() => {
                          setImageIndex(i);
                          swiper?.slideTo(i, undefined, false);
                        }}
                        onContextMenu={(evt) => evt.preventDefault()}
                      >
                        <Image
                          className="rounded"
                          src={img.name ?? "/images/palceholder.jpeg"}
                          alt="Product image."
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    );
                  })}
                </div>
                {/* <div
                  className="ratio ratio-1x1 rounded border d-none d-lg-block"
                  onContextMenu={(evt) => evt.preventDefault()}
                >
                  <Image
                    className="rounded"
                    src={
                      product.images?.[imageIndex].name ??
                      "/images/placeholder.jpeg"
                    }
                    alt="Product image."
                    layout="fill"
                    priority
                    objectFit="contain"
                  />
                </div> */}
                <SwiperView
                  onInit={setSwiper}
                  className="overflow-hidden border rounded flex-grow-1"
                  initialSlide={imageIndex}
                  autoplay={false}
                  spaceBetween={0}
                  slidesPerView={1}
                  pagination={{
                    clickable: true
                  }}
                  zoom={{}}
                  navigation={{}}
                  modules={[Navigation, Pagination, Zoom]}
                  onActiveIndexChange={(swiper) => {
                    setImageIndex(swiper.activeIndex);
                  }}
                  // onClick={(evt) => {
                  //   swiper?.zoom.in();
                  // }}
                >
                  {product.images?.map((img, i) => {
                    return (
                      <SwiperSlide
                        key={i}
                        className="ratio ratio-1x1"
                        zoom={true}
                      >
                        <img
                          src={img?.name ?? "/images/placeholder.jpeg"}
                          alt="Product image."
                          className="w-100 h-100"
                          style={{
                            objectFit: "contain"
                          }}
                        />
                      </SwiperSlide>
                    );
                  })}
                </SwiperView>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="d-flex flex-column h-100">
                <div className="hstack gap-2">
                  <h4 className="d-inline text-muted me-3">
                    {product.name}
                    {popular && (
                      <span className="badge bg-danger ms-2">Popular</span>
                    )}
                  </h4>
                  {/* <Tooltip title="Add to favorite" className="ms-auto">
                    <button
                      disabled={false}
                      className="btn btn-outline-light text-primary border"
                    >
                      <HeartIcon width={24} strokeWidth={2} />
                    </button>
                  </Tooltip> */}
                  <div className="flex-grow-1"></div>
                  {product.id && <AddToFavoriteButton productId={product.id} />}
                </div>
                <h4 className="mb-0">{price}</h4>

                <hr className="bg-dark-gray" />

                <dl className="row mb-0">
                  <dt className="col-sm-3 fw-semibold">SKU</dt>
                  <dd className="col-sm-9">
                    {!product.sku ? <>&nbsp;</> : product.sku}
                  </dd>
                  <dt className="col-sm-3 fw-semibold">Brand</dt>
                  <dd className="col-sm-9">
                    {!product.brand ? <>&nbsp;</> : product.brand}
                  </dd>
                  <dt className="col-sm-3 fw-semibold">Category</dt>
                  <dd className="col-sm-9">
                    <Link href={`/collections/${product.category?.slug}`}>
                      <a className="text-decoration-none fw-medium">
                        {product.category?.name}
                      </a>
                    </Link>
                  </dd>
                  <dt className="col-sm-3 fw-semibold">Availability</dt>
                  <dd className="col-sm-9">
                    {(product.stockLeft ?? 0) > 1 ? (
                      <span className="text-success">
                        {product.stockLeft} items left
                      </span>
                    ) : (
                      <span className="text-danger">
                        {product.stockLeft} item left
                      </span>
                    )}
                  </dd>
                </dl>

                {product.variants && product.variants.length > 0 && (
                  <hr className="bg-dark-gray" />
                )}

                <div className="row g-2 mb-4 mb-lg-3">
                  {product.options?.map((op, i) => {
                    return (
                      <div key={i} className="col-12">
                        <h6 className="text-muted">{op.name}</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {options?.get(op.name ?? "")?.map((v, j) => {
                            const selected =
                              selectedOptions?.get(op.name ?? "") === v
                                ? "border-primary"
                                : "";
                            return (
                              <div
                                key={j}
                                role="button"
                                className={`bg-light border border-2 rounded px-2h py-1 ${selected}`}
                                onClick={() => {
                                  if (selected) {
                                    return;
                                  }

                                  setSelectedOptions((map) => {
                                    const newMap = new Map(map);
                                    op.name && newMap.set(op.name, v);
                                    return newMap;
                                  });
                                }}
                              >
                                {v}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex-grow-1"></div>

                <div className="row g-3">
                  <div className="col-12 col-lg-auto mb-2 mb-lg-0">
                    <div className="input-group h-100">
                      <button
                        type="button"
                        className="btn btn-outline text-muted border border-end-0"
                        onClick={() => {
                          setQuantity((qty) => {
                            if (qty > 1) {
                              return qty - 1;
                            }
                            return qty;
                          });
                        }}
                      >
                        <MinusIcon width={20} />
                      </button>
                      <div
                        className="bg-light align-items-center justify-content-center d-flex border"
                        style={{ minWidth: 44 }}
                      >
                        {quantity}
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline text-muted border border-start-0"
                        onClick={() => {
                          setQuantity((qty) => {
                            if (qty < (product.stockLeft ?? 0)) {
                              return qty + 1;
                            }
                            return qty;
                          });
                        }}
                      >
                        <PlusIcon width={20} />
                      </button>
                    </div>
                  </div>
                  <div className="col col-lg-auto">
                    {/* <button className="btn btn-primary w-100 py-2h py-lg-2">
                      Add to cart
                    </button> */}
                    {product.id && (
                      <AddToCartButton
                        productId={product.id}
                        className="py-2h py-lg-2 w-100"
                        disabled={
                          (variant && variant.stockLeft === 0) ||
                          product.stockLeft === 0
                        }
                      />
                    )}
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
          {/* <div className="row mt-3 d-none">
            <div className="col-5 hstack gap-2">
              {product.images?.map((img, i) => {
                const selected =
                  i === imageIndex ? "border border-primary" : "";
                return (
                  <div
                    role={"button"}
                    key={i}
                    style={{ width: 80 }}
                    className={`ratio ratio-1x1 rounded border ${selected}`}
                    onClick={() => {
                      setImageIndex(i);
                    }}
                    onContextMenu={(evt) => evt.preventDefault()}
                  >
                    <Image
                      className=""
                      src={img.name ?? "/images/palceholder.jpeg"}
                      alt="Product image."
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
      <div className="container">
        <div className="row mb-12 g-3">
          <div className="col-lg-8">
            <div className="bg-white shadow-sm rounded h-100">
              <Tabs defaultTabKey="description" className="border-bottom">
                <Tabs.Tab tabKey="description" title="Description">
                  <div
                    className="p-3"
                    dangerouslySetInnerHTML={{
                      __html: product.description ?? ""
                    }}
                  ></div>
                </Tabs.Tab>
                <Tabs.Tab tabKey="specification" title="Video">
                  <div className="p-3"></div>
                </Tabs.Tab>
              </Tabs>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white py-3 border-bottom">
                <h5 className="mb-0">Seller</h5>
              </div>
              <div className="card-body">
                <div className="vstack">
                  <div className="d-flex align-items-start">
                    <div
                      className="flex-shrink-0"
                      onContextMenu={(evt) => evt.preventDefault()}
                    >
                      <Image
                        src={product.shop?.logo ?? "/images/placeholder.jpeg"}
                        width={70}
                        height={70}
                        alt=""
                        className="rounded-circle border"
                        objectFit="cover"
                      />
                    </div>

                    <div className="vstack ms-2 overflow-hidden">
                      <h5 className="mb-0 text-truncate">
                        {product.shop?.name}
                      </h5>
                      <div className="text-muted small text-truncate mb-2">
                        {product.shop?.headline}
                      </div>
                      <Rating rating={product.shop?.rating ?? 0} />
                    </div>
                  </div>

                  <div className="clearfix mt-3">
                    <Link href={`/shops/${product.shop?.slug}`}>
                      <a className="btn btn-outline-light border text-primary float-end">
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
    const { Auth } = withSSRContext(context);
    //const accessToken = (await Auth.currentSession()).getAccessToken().getJwtToken();
    const product = await getProductBySlug(slug as string);
    return {
      props: {
        product: product
      } // will be passed to the page component as props
    };
  } catch (e) {
    console.log(e);
  }

  return {
    notFound: true
  };
};

export default ProductDetail;
