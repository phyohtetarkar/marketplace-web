import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "../../common/utils";
import { getProductHints } from "../../services/ProductService";
import { getShopHints } from "../../services/ShopService";
import Loading from "../Loading";
import Popover from "../Popover";

function HeaderSearchHints() {
  const router = useRouter();
  const [search, setSearch] = useState<string>();
  const [searchOption, setSearchOption] = useState("product");
  const [isLoading, setIsLoading] = useState(false);
  const [hints, setHints] = useState<string[]>();

  const executeSearch = useMemo(
    () =>
      debounce((op, q) => {
        if (!q) {
          setHints(undefined);
          return;
        }

        if ((q.length ?? 0) < 3) {
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
      }, 700),
    []
  );

  useEffect(() => {
    if (typeof search === "undefined") {
      return;
    }

    // if (search.length < 3) {
    //   return;
    // }

    executeSearch(searchOption, search);
  }, [search, searchOption, executeSearch]);

  const handleSearch = () => {
    if (!search) {
      return;
    }
    let href = "";
    const q = search.toLowerCase();
    if (searchOption === "product") {
      href = `/products?q=${q}`;
    } else if (searchOption === "shop") {
      href = `/shops?q=${q}`;
    }
    setSearch("");
    router.push(href);
  };

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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  hide();
                  handleSearch();
                }}
                className="position-relative"
              >
                <input
                  className="form-control rounded-0 rounded-end"
                  type="text"
                  placeholder={`Search ${searchOption}s...`}
                  aria-label="Search"
                  size={28}
                  value={search ?? ""}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onClick={(e) => show()}
                  style={{
                    height: 44
                  }}
                />
                {isLoading && (
                  <div className="position-absolute top-50 end-0 translate-middle me-2">
                    <div
                      className="spinner-border spinner-border-sm text-light-gray"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </form>
            </Popover.Reference>,
            <Popover.Popper key={2}>
              {hints && hints.length > 0 && (
                <div className="vstack bg-white shadow border rounded overflow-hidden">
                  {hints.map((e, i) => {
                    let href = "";
                    const q = e.toLowerCase();
                    if (searchOption === "product") {
                      href = `/products?q=${q}`;
                    } else if (searchOption === "shop") {
                      href = `/shops?q=${q}`;
                    }
                    return (
                      <Link
                        key={i}
                        href={href}
                        className="text-decoration-none dropdown-item"
                        onClick={() => {
                          setSearch("");
                          hide();
                        }}
                      >
                        <div className="py-2">
                          <span className="fw-medium">{q}</span>
                        </div>
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
