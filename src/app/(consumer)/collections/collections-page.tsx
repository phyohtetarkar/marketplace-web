"use client";
import { useCategories, useLocalization } from "@/common/hooks";
import { Category } from "@/common/models";
import { getCategoryName, parseErrorResponse } from "@/common/utils";
import Accordion from "@/components/Accordion";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import { RiImageLine } from "@remixicon/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CollectionItemProps {
  item: Category;
  locale: string;
  onClick?: (c?: Category) => void;
}

const CollectionItem = ({ item, locale, onClick }: CollectionItemProps) => {
  return (
    <div
      role="button"
      className="vstack gap-1 py-2 px-1 align-items-center"
      onClick={() => onClick?.(item)}
    >
      {item?.image ? (
        <Image
          src={item.image}
          width={50}
          height={50}
          alt=""
          style={{
            objectFit: "contain"
          }}
        />
      ) : (
        <RiImageLine size={44} className="text-default mx-auto" />
      )}
      <div className="text-center small">{getCategoryName(locale, item)}</div>
    </div>
  );
};

function CollectionsPage() {
  const router = useRouter();

  const { locale } = useLocalization();

  const { categories, error, isLoading } = useCategories(false);

  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    if (categories && category) {
      for (const c of categories) {
        if (c.id === category?.id) {
          setCategory(c);
          break;
        }
      }
    }
  }, [categories, category]);

  const sortByName = (a: Category, b: Category) => {
    const nameA = getCategoryName(locale, a);
    const nameB = getCategoryName(locale, b);

    return nameA.localeCompare(nameB);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container py-3">
        <Alert message={parseErrorResponse(error)} variant="danger" />
      </div>
    );
  }

  return (
    <div className="h-100 bg-white d-block d-lg-none">
      <div className="row g-0 h-100">
        <div
          className="col-auto h-100 border-end border-light-gray"
          style={{ width: 108 }}
        >
          <ul className="list-group list-group-flush">
            {categories
              ?.sort((a, b) => sortByName(a, b))
              .map((e, i) => {
                return (
                  <li key={i} className="list-group-item p-0">
                    <CollectionItem
                      item={e}
                      locale={locale}
                      onClick={(c) => setCategory(c)}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
        <div
          className="col h-100 scrollbar-none"
          style={{ overflowY: "auto", overflowX: "hidden" }}
        >
          <div className="position-relative" style={{ height: "70vh" }}>
            <div className="vstack position-absolute top-0 bottom-0 start-0 end-0">
              {category?.children
                ?.sort((a, b) => sortByName(a, b))
                .map((e, i) => {
                  if (!e.children || e.children.length === 0) {
                    return (
                      <div
                        key={i}
                        role="button"
                        className="fw-semibold px-3 py-2h border-bottom bg-white"
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
                            {getCategoryName(locale, e)}
                          </div>
                        );
                      }}
                      headerClassName="px-3 py-2h border-bottom"
                      iconType="plus-minus"
                    >
                      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3 border-bottom">
                        {e.children
                          .sort((a, b) => sortByName(a, b))
                          .map((c, i) => {
                            return (
                              <div key={i} className="col">
                                <CollectionItem
                                  item={c}
                                  locale={locale}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionsPage;
