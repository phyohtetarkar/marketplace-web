import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import { ProductGridItem } from "../components/product";

const _categories = [
  "Electronics",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools and equipments",
  "Food and drinks",
  "Sports and outdoor",
  "Health and beauty",
];

const _banners = ["banner.jpeg", "banner.jpeg", "banner.jpeg"];

const Home: NextPage = () => {
  return (
    <div className="container py-4">
      <div className="row mb-4 mb-lg-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0 p-lg-3">
              <div className="row g-3">
                <div className="col-lg-3 d-none d-lg-inline">
                  <div className="h-100 overflow-auto scrollbar-custom">
                    <div className="position-relative">
                      <div className="d-flex flex-column gap-1 position-absolute top-0 bottom-0 start-0 end-0">
                        {_categories.map((e, i) => {
                          return (
                            <Link key={i} href={`/${e}`}>
                              <a className="p-2 my-list-item user-select-none">
                                {e}
                              </a>
                            </Link>
                          );
                        })}

                        <a href="#" className="invisible p-1"></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <Carousel
                    className="rounded-1 overflow-hidden"
                    autoPlay={true}
                    infiniteLoop={true}
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    transitionTime={300}
                    renderIndicator={(
                      onClickHandler,
                      isSelected,
                      index,
                      label
                    ) => {
                      if (isSelected) {
                        return (
                          <li
                            className="d-inline-block mx-2 mb-lg-3 text-light small"
                            style={{ outline: "none" }}
                          >
                            <div
                              className="bg-light rounded-circle"
                              style={{ width: 12, height: 12 }}
                            ></div>
                          </li>
                        );
                      }
                      return (
                        <li
                          className="d-inline-block mx-2 mb-lg-3 small"
                          onClick={onClickHandler}
                          key={index}
                          role="button"
                          tabIndex={0}
                          style={{ outline: "none" }}
                        >
                          <div
                            className="bg-light bg-opacity-25 rounded-circle"
                            style={{ width: 12, height: 12 }}
                          ></div>
                        </li>
                      );
                    }}
                  >
                    {_banners.map((e, i) => {
                      return (
                        <div
                          key={i}
                          onContextMenu={(e) => e.preventDefault()}
                          className="ratio ratio-21x9 overflow-hidden"
                        >
                          <Image
                            src={`/images/${e}`}
                            alt="Cover image"
                            className="rounded-1"
                            layout="fill"
                            objectFit="cover"
                            priority
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex overflow-auto scrollbar-none mb-4 d-lg-none">
        {_categories.map((e, i) => {
          return (
            <Link key={i} href={`/${e}`}>
              <a
                className={
                  "btn btn-primary text-nowrap " + (i > 0 ? "ms-2" : "")
                }
              >
                {e}
              </a>
            </Link>
          );
        })}
      </div>

      {/* {data.promotions && data.promotions.length > 0 && (
        <>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4
              className="fw-semibold text-nowrap"
              style={{ textOverflow: "ellipsis", overflowX: "clip" }}
            >
              {localize("promotions")}
            </h4>
            <Link href="/products/promotions">
              <a className="text-decoration-none fw-medium text-nowrap">
                {localize("view_all")}
              </a>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-5">
            {data.promotions.map((e, i) => {
              return (
                <div className="col" key={i}>
                  <ProductGridItem data={e} />
                </div>
              );
            })}
          </div>
        </>
      )}

      {data.populars && data.populars.length > 0 && (
        <>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4
              className="fw-semibold text-nowrap"
              style={{ textOverflow: "ellipsis", overflowX: "clip" }}
            >
              {localize("popular_products")}
            </h4>
            <Link href="/products/populars">
              <a className="text-decoration-none fw-medium text-nowrap">
                {localize("view_all")}
              </a>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-5">
            {data.populars.map((e, i) => {
              return (
                <div className="col" key={i}>
                  <ProductGridItem data={e} />
                </div>
              );
            })}
          </div>
        </>
      )} */}

      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4
          className="fw-semibold text-nowrap"
          style={{ textOverflow: "ellipsis", overflowX: "clip" }}
        >
          New Arrivals
        </h4>
        <Link href="/products/new-arrivals">
          <a className="text-decoration-none fw-medium text-nowrap">View all</a>
        </Link>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-5">
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
  );
};

export default Home;
