import { SwatchIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCategories } from "../../common/hooks";
import { Category } from "../../common/models";
import Accordion from "../../components/Accordion";
import Loading from "../../components/Loading";

interface CollectionItemProps {
  item: Category;
  onClick?: (c?: Category) => void;
}

const CollectionItem = ({ item, onClick }: CollectionItemProps) => {
  return (
    <div
      role="button"
      className="vstack gap-1 py-2 px-1"
      onClick={() => onClick?.(item)}
    >
      {item?.image ? (
        <Image
          src={item.imageUrl}
          width={50}
          height={50}
          alt=""
          style={{
            objectFit: "contain"
          }}
        />
      ) : (
        <SwatchIcon width={44} className="text-default mx-auto" />
      )}
      <div className="text-center small">{item?.name}</div>
    </div>
  );
};

function Collections() {
  const router = useRouter();

  const { categories, error, isLoading } = useCategories(false);

  const [subCategories, setSubCategories] = useState<Category[]>();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return null;
  }

  return (
    <div className="h-100 bg-white d-block d-lg-none">
      <div className="row g-0 h-100">
        <div
          className="col-auto h-100 border-end border-light-gray"
          style={{ width: 108 }}
        >
          <ul className="list-group list-group-flush">
            {categories?.map((e, i) => {
              return (
                <li key={i} className="list-group-item p-0">
                  <CollectionItem
                    item={e}
                    onClick={(c) => setSubCategories(c?.children)}
                  />
                </li>
              );
            })}
            {/* <CollectionItem />
            <div className="dropdown-divider m-0"></div>
            <CollectionItem />
            <div className="dropdown-divider m-0"></div>
            <CollectionItem />
            <div className="dropdown-divider m-0"></div>
            <CollectionItem />
            <div className="dropdown-divider m-0"></div>
            <CollectionItem />
            <div className="dropdown-divider m-0"></div>
            <CollectionItem /> */}
          </ul>
        </div>
        <div
          className="col h-100 scrollbar-none"
          style={{ overflowY: "auto", overflowX: "hidden" }}
        >
          <div className="position-relative">
            <div className="vstack position-absolute top-0 bottom-0 start-0 end-0">
              {subCategories?.map((e, i) => {
                if (!e.children || e.children.length === 0) {
                  return (
                    <div
                      key={i}
                      role="button"
                      className="fw-semibold px-3 py-2h border-bottom"
                      onClick={() => {
                        router.push(`/collections/${e.slug}`);
                      }}
                    >
                      <div className="text-truncate">{e.name}</div>
                    </div>
                  );
                }
                return (
                  <Accordion
                    key={i}
                    open={false}
                    header={(open) => {
                      return (
                        <div className="fw-semibold text-truncate">
                          {e.name}
                        </div>
                      );
                    }}
                    headerClassName="px-3 py-2h border-bottom"
                    iconType="plus-minus"
                  >
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3 border-bottom">
                      {e.children.map((c, i) => {
                        return (
                          <div key={i} className="col">
                            <CollectionItem
                              item={c}
                              onClick={(item) => {
                                router.push(`/collections/${item?.slug}`);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Accordion>
                );
              })}

              {/* <Accordion
                open={false}
                header={(open) => {
                  return <span className="fw-semibold">Home Appliances</span>;
                }}
                headerClassName="px-3 py-2h border-bottom"
                iconType="plus-minus"
              >
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
                  <div className="col">
                    <CollectionItem />
                  </div>
                  <div className="col">
                    <CollectionItem />
                  </div>
                  <div className="col">
                    <CollectionItem />
                  </div>
                </div>
              </Accordion> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;
