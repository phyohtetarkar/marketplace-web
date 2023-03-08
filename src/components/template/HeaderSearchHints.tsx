import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Product, Shop } from "../../common/models";
import { debounce } from "../../common/utils";
import { getProductHints } from "../../services/ProductService";
import { getShopHints } from "../../services/ShopService";
import Loading from "../Loading";
import Popover from "../Popover";

function HeaderSearchHints() {
  const [search, setSearch] = useState<string>();
  const [searchOption, setSearchOption] = useState("product");
  const [isLoading, setIsLoading] = useState(false);
  const [hints, setHints] = useState<Shop[] | Product[]>();

  const executeSearch = useMemo(
    () =>
      debounce((op, q) => {
        if (!q) {
          setHints(undefined);
          return;
        }

        setIsLoading(true);
        if (op === "product") {
          getProductHints(q)
            .then(setHints)
            .catch((e) => {
              setHints(undefined);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else if (op === "shop") {
          getShopHints(q)
            .then(setHints)
            .catch((e) => {
              setHints(undefined);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      }, 800),
    []
  );

  useEffect(() => {
    if (typeof search === "undefined") {
      return;
    }

    executeSearch(searchOption, search);
  }, [search, searchOption, executeSearch]);

  return (
    <div className="d-flex flex-nowrap">
      <div className="d-flex">
        <select
          className="form-select bg-light rounded-0 rounded-start border-end-0"
          value={searchOption}
          onChange={(e) => {
            setSearch("");
            setSearchOption(e.target.value);
          }}
        >
          <option value="product">Product</option>
          <option value="shop">Shop</option>
        </select>
      </div>
      <Popover offset={[0, 4]} sameWidth>
        {(show, hide) => {
          return [
            <Popover.Reference key={1}>
              <input
                className="form-control rounded-0 rounded-end"
                type="search"
                placeholder={`Search ${searchOption}s...`}
                aria-label="Search"
                size={28}
                value={search ?? ""}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => show()}
                style={{
                  height: 44
                }}
              />
            </Popover.Reference>,
            <Popover.Popper key={2}>
              {isLoading && (
                <div className="bg-white shadow border rounded">
                  <Loading />
                </div>
              )}
              {hints && hints.length > 0 && (
                <div className="vstack bg-white shadow border rounded">
                  {hints.map((e, i) => {
                    let imageUrl = "/images/placeholder.jpeg";
                    let href = "";
                    if ("thumbnail" in e) {
                      imageUrl = e.thumbnail ?? imageUrl;
                      href = `/products/${e.slug}`;
                    }

                    if ("logo" in e) {
                      imageUrl = e.logo ?? imageUrl;
                      href = `/shops/${e.slug}`;
                    }
                    return (
                      <Link key={i} href={href}>
                        <a
                          className="hstack text-decoration-none dropdown-item"
                          onClick={() => {
                            setSearch("");
                            hide();
                          }}
                        >
                          {/* <Image
                            src={imageUrl}
                            alt=""
                            width={40}
                            height={40}
                            className="flex-shrink-0 rounded-1"
                          /> */}
                          <div className="fw-medium py-2">{e.name}</div>
                        </a>
                      </Link>
                    );
                  })}
                </div>
              )}
            </Popover.Popper>
          ];
        }}
      </Popover>
    </div>
  );
}

export default HeaderSearchHints;
