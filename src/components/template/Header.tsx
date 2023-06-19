import {
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { Offcanvas } from "bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { AuthenticationContext } from "../../common/contexts";
import { ShoppingCartView } from "../checkout";
import Dropdown from "../Dropdown";
import { Input, Select } from "../forms";
import Modal from "../Modal";
import AccountDropdown from "./AccountDropdown";
import HeaderSearchHints from "./HeaderSearchHints";
import MultiCategoryDropdown from "./MultiCategoryDropdown";

interface HeaderProps {
  hideAuth?: boolean;
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter();
  return (
    <>
      <Link
        href={href}
        className="nav-link d-flex align-items-center d-none d-lg-block"
      >
        {children}
      </Link>
      <div
        className="nav-link d-flex align-items-center d-block d-lg-none"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        onClick={(e) => {
          e.preventDefault();
          router.push(href);
        }}
        role="button"
      >
        {children}
      </div>
    </>
  );
}

function Header({ hideAuth }: HeaderProps) {
  const router = useRouter();
  const offcanvasRef = useRef<HTMLDivElement | null>(null);
  const offcanvas = useRef<Offcanvas>();
  const [isShowSearch, setShowSearch] = useState(false);
  const [lang, setLang] = useState("mm");

  const searchRef = useRef<HTMLInputElement | null>(null);
  const optionRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    const initOffcanvas = async () => {
      const Offcanvas = (await import("bootstrap")).Offcanvas;
      if (!offcanvasRef.current) {
        return;
      }
      offcanvas.current = new Offcanvas(offcanvasRef.current, {
        scroll: false
      });
    };

    initOffcanvas();

    return () => {
      offcanvas.current?.dispose();
    };
  }, []);

  const localeImage = (
    <Image
      src={`/images/${lang}.png`}
      width={28}
      height={22}
      alt=""
      className="rounded-1"
      style={{
        objectFit: "cover"
      }}
    />
  );

  const localeItems = (
    <>
      <li role="button" className="dropdown-item" onClick={() => setLang("mm")}>
        Myanmar
      </li>
      <div className="dropdown-divider"></div>
      <li role="button" className="dropdown-item" onClick={() => setLang("en")}>
        English
      </li>
    </>
  );

  return (
    <>
      <header className="fixed-top">
        <nav
          className="navbar navbar-expand-lg navbar-light bg-white border-bottom"
          style={{ height: 70 }}
        >
          <div className="container">
            <Link href="/" className="navbar-brand">
              {/* <FontAwesomeIcon
              icon={["fas", "shopping-basket"]}
              className="d-inline-block"
            /> */}
              <div className="d-flex align-items-center me-2">
                {/* <div
                className="ratio"
                style={
                  { width: 160, "--bs-aspect-ratio": "30%" } as CSSProperties
                }
              >
                <Image
                  src="/images/logo2.png"
                  layout="fill"
                  alt=""
                  priority
                  objectFit="contain"
                />
              </div> */}
                <div
                  className="ratio"
                  style={
                    { width: 160, "--bs-aspect-ratio": "30%" } as CSSProperties
                  }
                >
                  <Image
                    src="/images/logo-h.svg"
                    fill
                    alt=""
                    sizes="33vw"
                    priority
                    style={{
                      objectFit: "contain"
                    }}
                  />
                </div>
                {/* <h4 className="mb-0 fw-bold text-secondary">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </h4> */}
              </div>
            </Link>

            <div className="hstack flex-grow-1">
              <ul className="navbar-nav align-items-lg-center gap-2 d-none d-lg-inline">
                <li className="nav-item">
                  <HeaderSearchHints />
                </li>
              </ul>

              <div className="flex-grow-1"></div>

              <div className="nav-item d-block d-lg-none">
                <div
                  role={"button"}
                  className="nav-link pe-0"
                  onClick={() => {
                    setShowSearch(true);
                  }}
                >
                  <MagnifyingGlassIcon width={24} strokeWidth={1.5} />
                </div>
              </div>

              <AuthenticationContext.Consumer>
                {({ payload, status }) => {
                  if (!status || status === "loading") {
                    return null;
                  }

                  if (status === "success") {
                    return null;
                  }

                  return (
                    <div className="ms-lg-2 d-flex align-items-center mt-3 mt-lg-0 d-none d-lg-flex">
                      <div className="nav-item">
                        <Link
                          href="/login"
                          className="text-decoration-none fw-medium nav-link"
                        >
                          Sign in
                        </Link>
                      </div>
                      <div className="nav-item">
                        <Link
                          href="/sign-up"
                          className="btn btn-primary text-nowrap"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  );
                }}
              </AuthenticationContext.Consumer>

              <div className="nav-item ms-2">
                <ShoppingCartView />
              </div>
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
          <div className="container">
            <div
              ref={offcanvasRef}
              className="offcanvas offcanvas-end bg-white"
              tabIndex={-1}
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header py-2h">
                <h5
                  className="offcanvas-title fw-bold text-primary mb-0 d-flex align-items-center"
                  id="offcanvasNavbarLabel"
                >
                  <Image
                    src="/images/logo-h.svg"
                    width={130}
                    height={40}
                    alt=""
                    priority
                    style={{
                      objectFit: "contain"
                    }}
                  />
                  {/* <span className="">{process.env.NEXT_PUBLIC_APP_NAME}</span> */}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close text-reset shadow-none"
                  aria-label="Close"
                  onClick={() => {
                    offcanvas.current?.hide();
                  }}
                ></button>
              </div>
              <hr className="my-0 bg-light-gray d-block d-lg-none" />
              <div className="offcanvas-body">
                <ul className="navbar-nav align-items-lg-center gap-2">
                  <li className="nav-item d-none d-lg-block">
                    <MultiCategoryDropdown />
                  </li>
                  <li className="nav-item d-block d-lg-none">
                    <NavLink href="/collections">
                      <div className="hstack">
                        <span>Categories</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink href="/shops">
                      <div className="hstack">
                        <BuildingStorefrontIcon
                          width={20}
                          className="me-1 d-none d-lg-block"
                        />
                        <span>Shops</span>
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink href="/account/shops/create">
                      <div className="hstack">
                        <PlusCircleIcon
                          width={20}
                          className="me-1 d-none d-lg-block"
                        />
                        <span>Create shop</span>
                      </div>
                    </NavLink>
                  </li>
                </ul>

                <div className="flex-grow-1"></div>

                <AuthenticationContext.Consumer>
                  {({ payload, status }) => {
                    if (payload && status === "success") {
                      return (
                        <div className="navbar-nav align-items-lg-center mt-3 mt-lg-0">
                          <AccountDropdown
                            onNavClick={() => offcanvas.current?.hide()}
                          />
                        </div>
                      );
                    }

                    if (status === "success") {
                      return null;
                    }

                    return (
                      <div className="ms-lg-2 d-flex align-items-center mt-3 mt-lg-0 d-lg-none">
                        <div className="nav-item">
                          <div
                            role="button"
                            className="btn btn-outline-primary me-2"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/login");
                            }}
                          >
                            Sign in
                          </div>
                        </div>
                        <div className="nav-item">
                          <div
                            role="button"
                            className="btn btn-primary text-nowrap"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            onClick={(e) => {
                              e.preventDefault();
                              router.push("/sign-up");
                            }}
                          >
                            Register
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </AuthenticationContext.Consumer>
              </div>
            </div>

            <div className="navbar-nav ms-3 d-none d-lg-block">
              <Dropdown
                toggle={localeImage}
                className="nav-item"
                toggleClassName="dropdown-toggle nav-link hstack"
                menuClassName="dropdown-menu-end"
              >
                {localeItems}
              </Dropdown>
            </div>

            <div className="d-block d-lg-none">
              <Dropdown
                toggle={localeImage}
                toggleClassName="dropdown-toggle hstack text-light"
              >
                {localeItems}
              </Dropdown>
            </div>

            <button
              className="navbar-toggler ms-auto border-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </header>
      <Modal
        show={isShowSearch}
        onHidden={() => {
          if (searchRef.current) {
            searchRef.current.value = "";
          }
          if (optionRef.current) {
            optionRef.current.value = "product";
          }
        }}
      >
        {(isShown) => {
          if (!isShown) {
            return <></>;
          }
          return (
            <div className="modal-body">
              <div className="position-relative">
                <form
                  className={`input-group`}
                  onSubmit={(evt) => {
                    evt.preventDefault();
                    const type = optionRef.current?.value;
                    const search = searchRef.current?.value;
                    if (!search) {
                      return;
                    }

                    if (type === "product") {
                      router.push(`/products?q=${search.toLowerCase()}`);
                    } else if (type === "shop") {
                      router.push(`/shops?q=${search.toLowerCase()}`);
                    }

                    setShowSearch(false);
                  }}
                >
                  <div className="input-group-text p-0 border-0">
                    <Select ref={optionRef} className="rounded-0 rounded-start">
                      <option value="product">Product</option>
                      <option value="shop">Shop</option>
                    </Select>
                  </div>
                  <Input
                    ref={searchRef}
                    type={"text"}
                    placeholder={`Type here...`}
                  />
                </form>

                <div
                  role={"button"}
                  className="position-absolute top-50 end-0 translate-middle-y me-2"
                  onClick={() => {
                    setShowSearch(false);
                  }}
                >
                  <XMarkIcon width={24} />
                </div>
              </div>
            </div>
          );
        }}
      </Modal>
    </>
  );
}

export default Header;
