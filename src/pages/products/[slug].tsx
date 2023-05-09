/* eslint-disable @next/next/no-img-element */
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Swiper, { Navigation, Pagination, Zoom } from "swiper";
import { Swiper as SwiperView, SwiperSlide } from "swiper/react";
import {
  Category,
  Product,
  ProductVariant,
  ProductVariantAttribute
} from "../../common/models";
import { formatNumber, transformDiscount } from "../../common/utils";
import Alert from "../../components/Alert";
import {
  AddToCartButton,
  AddToFavoriteButton,
  RelatedProducts
} from "../../components/product";
import Rating from "../../components/Rating";
import Tabs from "../../components/Tabs";
import { getProductBySlug } from "../../services/ProductService";

function ProductDetail({ product }: { product: Product | null }) {
  const [variant, setVariant] = useState<ProductVariant>();

  const [imageIndex, setImageIndex] = useState(0);

  const [swiper, setSwiper] = useState<Swiper>();

  const [quantity, setQuantity] = useState(1);

  const attributeValues = useMemo(() => {
    if (!product?.withVariant) {
      return new Map<number, ProductVariantAttribute[]>();
    }

    const variantAttributes = product.variants?.flatMap((v) => v.attributes);

    if (!variantAttributes || variantAttributes.length === 0) {
      return new Map<number, ProductVariantAttribute[]>();
    }

    const map = new Map<number, ProductVariantAttribute[]>();

    for (const va of variantAttributes) {
      if (map.has(va.attributeId)) {
        const list = map.get(va.attributeId) ?? [];
        if (
          list.find(
            (v) => v.attributeId === va.attributeId && v.value === va.value
          )
        ) {
          continue;
        }
        map.set(va.attributeId, [...list, va]);
      } else {
        map.set(va.attributeId, [va]);
      }
    }

    return map;
  }, [product]);

  const [selectedAttributes, setSelectedAttributes] = useState(() => {
    if (!product?.withVariant) {
      return new Map<number, string>();
    }

    if (!product?.attributes || product.attributes.length === 0) {
      return new Map<number, string>();
    }

    const variantAttributes = product.variants?.flatMap((v) => v.attributes);

    if (!variantAttributes || variantAttributes.length === 0) {
      return new Map<number, string>();
    }

    return new Map(
      product.attributes.map((a) => [
        a.id ?? 0,
        variantAttributes.find((va) => va.attributeId === a.id)?.value ?? ""
      ])
    );
  });

  useEffect(() => {
    if (!product?.variants || product.variants.length === 0) {
      return;
    }

    const variants = product.variants;

    const selection = variants.find((v) => {
      return v.attributes.every((a) => {
        return selectedAttributes.get(a.attributeId) === a.value;
      });
    });

    setVariant(selection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttributes]);

  if (!product) {
    return (
      <div className="container py-3">
        <Alert message="Product not found" />
      </div>
    );
  }

  const unitPrice = variant?.price ?? product.price ?? 0;

  let popular;
  let available;
  // let image = `https://source.unsplash.com/random/200x240?random=${Math.floor(
  //   Math.random() * 50
  // )}`;
  let price = (
    <>
      {formatNumber(unitPrice * quantity)}
      &nbsp;Ks
    </>
  );

  if (product.discount) {
    price = (
      <>
        <del className="text-muted small fw-normal me-1">
          {formatNumber(unitPrice * quantity)}&nbsp;Ks
        </del>
        {formatNumber(transformDiscount(product.discount, unitPrice, quantity))}
        &nbsp;Ks
      </>
    );
  }

  const noStock = () => {
    if (product.withVariant) {
      return !variant || variant.stockLeft === 0;
    }
    return product.stockLeft === 0;
  };

  const stockLeft = () => {
    if (product.withVariant) {
      return variant?.stockLeft ?? 0;
    }
    return product.stockLeft ?? 0;
  };

  const breadcrumb = () => {
    const category = product.category;

    if (!category) {
      return (
        <>
          <li className="breadcrumb-item">
            <Link href={`/`} className="">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </>
      );
    }

    const element: JSX.Element[] = [];

    element.push(
      <li
        key={product.slug}
        className="breadcrumb-item active"
        aria-current="page"
      >
        {product.name}
      </li>
    );

    for (let c: Category | undefined = category; !!c; c = c.category) {
      const e = (
        <li key={c.id} className="breadcrumb-item">
          <Link href={`/collections/${c.slug}`} className="">
            {c.name}
          </Link>
        </li>
      );
      element.push(e);
    }

    return element.reverse();
  };

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div className="vstack">
        <div className="header-bar">
          <div className="container">
            <div className="row py-4 px-2">
              <nav aria-label="breadcrumb col-12">
                <ol className="breadcrumb mb-1">
                  {/* <li className="breadcrumb-item">
                  <Link href="/" className="text-light">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link
                    href={`/collections/${product.category?.slug}`}
                    className="text-light"
                  >
                    {product.category?.name}
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.name}
                </li> */}
                  {breadcrumb()}
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-white mb-4 border-bottom">
          <div className="container py-3">
            <div className="row gy-3 gx-4">
              <div className="col-lg-5 col-xxl-6">
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
                            src={img.url ?? "/images/placeholder.jpeg"}
                            alt="Product image."
                            fill
                            sizes="80vw"
                            style={{
                              objectFit: "contain"
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <SwiperView
                    onInit={setSwiper}
                    className="overflow-hidden border rounded flex-grow-1 position-relative"
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
                  >
                    {product.images?.map((img, i) => {
                      return (
                        <SwiperSlide
                          key={i}
                          className="ratio ratio-1x1"
                          zoom={true}
                        >
                          <img
                            src={img?.url ?? "/images/placeholder.jpeg"}
                            alt="Product image."
                            className="w-100 h-100"
                            style={{
                              objectFit: "contain"
                            }}
                          />
                        </SwiperSlide>
                      );
                    })}
                    <div
                      className="position-absolute bottom-0 end-0 m-2 hstack"
                      style={{
                        zIndex: 99
                      }}
                    >
                      <div
                        role="button"
                        className="bg-dark px-2h py-2 bg-opacity-75 rounded-start"
                        onClick={() => {
                          swiper?.zoom.out();
                        }}
                      >
                        <MinusIcon width={20} className="text-light" />
                      </div>
                      <div
                        role="button"
                        className="bg-dark px-2h py-2 bg-opacity-75 rounded-end"
                        onClick={() => swiper?.zoom.in()}
                      >
                        <PlusIcon width={20} className="text-light" />
                      </div>
                    </div>
                  </SwiperView>
                </div>
              </div>
              <div className="col-lg-7 col-xxl-6">
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
                    {product.id && (
                      <AddToFavoriteButton
                        productId={product.id}
                        check={true}
                      />
                    )}
                  </div>
                  <h4 className="mb-0">{price}</h4>

                  <hr className="bg-dark-gray" />

                  <dl className="row mb-0">
                    {/* <dt className="col-sm-3 fw-semibold">SKU</dt>
                    <dd className="col-sm-9">
                      {!product.sku ? <>&nbsp;</> : product.sku}
                    </dd> */}
                    <dt className="col-sm-3 fw-semibold">Category</dt>
                    <dd className="col-sm-9">
                      <Link
                        href={`/collections/${product.category?.slug}`}
                        className="link-anchor"
                      >
                        {product.category?.name}
                      </Link>
                    </dd>
                    <dt className="col-sm-3 fw-semibold">Brand</dt>
                    <dd className="col-sm-9">
                      {!product.brand ? <>&nbsp;</> : product.brand}
                    </dd>
                    <dt className="col-sm-3 fw-semibold">Availability</dt>
                    <dd className="col-sm-9">
                      {stockLeft() > 0 ? (
                        <span className="text-success">
                          {stockLeft()} items left
                        </span>
                      ) : (
                        <span className="text-danger">
                          {stockLeft()} item left
                        </span>
                      )}
                    </dd>
                  </dl>

                  {product.variants && product.variants.length > 0 && (
                    <hr className="bg-dark-gray" />
                  )}

                  <div className="row g-2 mb-4 mb-lg-3">
                    {product.attributes
                      ?.sort((f, s) => f.sort - s.sort)
                      .map((a, i) => {
                        return (
                          <div key={i} className="col-12">
                            <h6 className="text-uppercase small">{a.name}</h6>
                            <div className="d-flex flex-wrap gap-2">
                              {attributeValues.get(a.id ?? 0)?.map((v, j) => {
                                const selected =
                                  selectedAttributes.get(a.id ?? 0) === v.value
                                    ? "border-primary"
                                    : "";
                                return (
                                  <div
                                    key={j}
                                    role="button"
                                    className={`bg-light border rounded px-2h py-1 text-muted ${selected}`}
                                    onClick={() => {
                                      if (selected) {
                                        return;
                                      }

                                      setSelectedAttributes((map) => {
                                        const newMap = new Map(map);
                                        v.value &&
                                          newMap.set(a.id ?? 0, v.value);
                                        return newMap;
                                      });

                                      setQuantity(1);
                                    }}
                                  >
                                    {v.value}
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
                          disabled={noStock()}
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
                          disabled={noStock()}
                          onClick={() => {
                            setQuantity((qty) => {
                              if (variant && qty < (variant.stockLeft ?? 0)) {
                                return qty + 1;
                              } else if (variant) {
                                return qty;
                              }

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
                          variantId={variant?.id}
                          quantity={quantity}
                          className="py-2h py-lg-2 w-100"
                          disabled={noStock()}
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
          </div>
        </div>
        <div className="container">
          <div className="row mb-12 g-3">
            <div className="col-lg-8">
              <div className="rounded border h-100">
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
              <div className="card">
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
                          style={{
                            objectFit: "cover"
                          }}
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
                      <Link
                        href={`/shops/${product.shop?.slug}`}
                        className="btn btn-outline-light border text-secondary float-end"
                      >
                        Visit store
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-6">
              <h4 className="mb-3">Related Products</h4>
              <RelatedProducts
                productId={product.id ?? 0}
                categoryId={product.category?.id ?? 0}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  //const { Auth } = withSSRContext(context);

  try {
    //const accessToken = (await Auth.currentSession()).getAccessToken().getJwtToken();
    const product = await getProductBySlug(slug as string);
    if (product?.hidden === false && !product?.disabled) {
      return {
        props: {
          product: product
        } // will be passed to the page component as props
      };
    } else {
      return {
        props: {
          product: null
        } // will be passed to the page component as props
      };
    }
  } catch (e) {
    console.log(e);
  }

  return {
    notFound: true
  };
};

export default ProductDetail;
