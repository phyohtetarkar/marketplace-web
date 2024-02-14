import { useRouter } from "next/navigation";
import { useState } from "react";

function HeaderSearchHints() {
  const router = useRouter();
  const [search, setSearch] = useState<string>();
  const [searchOption, setSearchOption] = useState("product");

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
          style={{
            height: 44
          }}
        />
      </form>
      {/* <Popover offset={[0, 4]} sameWidth>
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
                          <span className="">{q}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </Popover.Popper>
          ];
        }}
      </Popover> */}
    </div>
  );
}

export default HeaderSearchHints;
