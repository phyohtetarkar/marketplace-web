"use client";

import { useLocalization } from "@/common/hooks";
import { HomeData } from "@/common/models";
import { getCategoryName } from "@/common/utils";
import Alert from "@/components/Alert";
import { ProductGridItem } from "@/components/product";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HomePage = ({ data }: { data?: HomeData }) => {
  const { locale } = useLocalization();

  if (!data) {
    return (
      <div className="container py-3">
        <Alert message="No data found" />
      </div>
    );
  }

  return (
    <div className="container py-3">
      <div className="row mb-4 mb-lg-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-0 p-lg-3">
              <div className="row g-3">
                <div className="col-lg-3 d-none d-lg-inline">
                  <div className="h-100 overflow-auto scrollbar-custom">
                    <div className="position-relative">
                      <div className="d-flex flex-column gap-1 position-absolute top-0 bottom-0 start-0 end-0">
                        {data?.mainCategories
                          ?.sort((a, b) => {
                            const nameA = getCategoryName(locale, a);
                            const nameB = getCategoryName(locale, b);
                            return nameA.localeCompare(nameB);
                          })
                          .map((e, i) => {
                            return (
                              <Link
                                key={e.id}
                                href={`/collections/${e.slug}`}
                                className="my-list-item rounded user-select-none py-1"
                              >
                                {getCategoryName(locale, e)}
                              </Link>
                            );
                          })}
                        <a href="#" className="invisible p-1"></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <Swiper
                    className="rounded-1 overflow-hidden"
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{
                      clickable: true
                    }}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false
                    }}
                    modules={[Autoplay, Pagination]}
                  >
                    {data?.banners &&
                      data.banners.map((b, i) => {
                        return (
                          <SwiperSlide
                            key={b.id}
                            onContextMenu={(e) => e.preventDefault()}
                            className="ratio ratio-21x9 overflow-hidden"
                          >
                            <Image
                              src={b.image}
                              alt="Cover image"
                              className="rounded"
                              fill
                              priority
                              sizes="80vw"
                              style={{
                                objectFit: "cover"
                              }}
                            />
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="d-flex overflow-auto scrollbar-none mb-4 d-lg-none">
        {data.categories.map((e, i) => {
          return (
            <Link key={e.id} href={`/${e.slug}`}>
              <a
                className={
                  "btn btn-primary text-nowrap " + (i > 0 ? "ms-2" : "")
                }
              >
                {e.name}
              </a>
            </Link>
          );
        })}
      </div> */}

      {/* {data.featuredShops && (
        <>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h4
              className="fw-semibold text-nowrap"
              style={{ textOverflow: "ellipsis", overflowX: "clip" }}
            >
              Featured shops
            </h4>
            <Link
              href="/shops"
              className="text-decoration-none fw-medium text-nowrap"
            >
              View all
            </Link>
          </div>
          <div className="mb-5">
            <Swiper
              spaceBetween={20}
              slidesPerView={2}
              preventClicks={false}
              preventClicksPropagation={false}
              pagination={{
                el: ""
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 40
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 50
                }
              }}
              modules={[Autoplay, Pagination]}
            >
              {data.featuredShops.map((s, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link
                      href={`/shops/${s.slug}`}
                      className="vstack gap-3 position-relative align-items-center text-decoration-none"
                    >
                      <div
                        className=""
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <Image
                          src={s.logo ?? "/images/placeholder.jpeg"}
                          alt="Logo image"
                          className="rounded-circle"
                          width={100}
                          height={100}
                          objectFit="cover"
                          priority
                        />
                      </div>
                      <h6 className="text-truncate text-dark">{s.name}</h6>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </>
      )} */}

      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4
          className="fw-semibold text-nowrap"
          style={{ textOverflow: "ellipsis", overflowX: "clip" }}
        >
          Featured Products
        </h4>
        {/* <Link
          href="/products/new-arrivals"
          className="text-decoration-none fw-medium text-nowrap"
        >
          View all
        </Link> */}
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-5">
        {data?.featuredProducts?.map((p, i) => {
          return (
            <div className="col" key={p.id}>
              <ProductGridItem value={p} hideAction />
            </div>
          );
        })}
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4
          className="fw-semibold text-nowrap"
          style={{ textOverflow: "ellipsis", overflowX: "clip" }}
        >
          Discount Products
        </h4>
        {/* <Link
          href="/products/new-arrivals"
          className="text-decoration-none fw-medium text-nowrap"
        >
          View all
        </Link> */}
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-5">
        {data?.discountProducts?.map((p, i) => {
          return (
            <div className="col" key={p.id}>
              <ProductGridItem value={p} hideAction />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
