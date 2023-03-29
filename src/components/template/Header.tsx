import {
  BuildingStorefrontIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";
import { Offcanvas } from "bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AuthenticationContext } from "../../common/contexts";
import MultiCategoryDropdown from "./MultiCategoryDropdown";
import { ShoppingCartView } from "../checkout";
import Dropdown from "../Dropdown";
import AccountDropdown from "./AccountDropdown";
import HeaderSearchHints from "./HeaderSearchHints";

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
  const [lang, setLang] = useState("mm");

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
    <header className="fixed-top">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white border-bottom"
        style={{ height: 70 }}
      >
        <div className="container">
          <Link href="/" className="navbar-brand d-none d-lg-block">
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
              <h4 className="mb-0 fw-bold text-primary">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </h4>
            </div>
          </Link>

          <div className="hstack w-100">
            <ul className="navbar-nav align-items-lg-center gap-2">
              <li className="nav-item">
                <HeaderSearchHints />
              </li>
            </ul>

            <div className="flex-grow-1"></div>

            <AuthenticationContext.Consumer>
              {({ payload, status }) => {
                if (payload || status === "loading") {
                  return null;
                }
                return (
                  <div className="ms-lg-2 d-flex align-items-center mt-3 mt-lg-0">
                    <div className="nav-item">
                      <Link
                        href="/sign-up"
                        className="btn btn-outline-primary d-none d-lg-block text-nowrap"
                      >
                        Register
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link
                        href="/login"
                        className="btn btn-primary ms-2 d-none d-lg-block"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                );
              }}
            </AuthenticationContext.Consumer>

            <div className="nav-item ms-2">
              <ShoppingCartView />
              {/* <Link href="/shopping-cart">
                <a className="nav-link">
                  <div className="position-relative ms-2 hstack">
                    <ShoppingCartIcon width={24} strokeWidth={1.5} />
                    <div
                      className="position-absolute top-0 start-100 translate-middle rounded-pill bg-danger text-light px-1 fw-light hstack"
                      style={{
                        fontSize: 12,
                        height: 17
                      }}
                    >
                      0
                    </div>
                  </div>
                </a>
              </Link> */}
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <div
            ref={offcanvasRef}
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5
                className="offcanvas-title fw-bold text-primary mb-0 d-flex align-items-center"
                id="offcanvasNavbarLabel"
              >
                {/* <Image
                src="/images/logo_round.png"
                width={30}
                height={30}
                alt=""
              /> */}
                <span className="">{process.env.NEXT_PUBLIC_APP_NAME}</span>
              </h5>
              <button
                type="button"
                className="btn-close text-reset shadow-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
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
                {/* <li className="nav-item">
                  <NavLink href="/shops">
                    <div className="hstack">
                      <QuestionMarkCircleIcon
                        width={20}
                        className="me-1 d-none d-lg-block"
                      />
                      <span>FAQs</span>
                    </div>
                  </NavLink>
                </li> */}
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
                  if (status === "loading") {
                    return null;
                  }
                  if (payload) {
                    return (
                      <div className="navbar-nav align-items-lg-center mt-3 mt-lg-0">
                        <AccountDropdown
                          onNavClick={() => offcanvas.current?.hide()}
                        />
                      </div>
                    );
                  }
                  return (
                    <div className="ms-lg-2 d-flex align-items-center mt-3 mt-lg-0 d-lg-none">
                      <div className="nav-item">
                        <div
                          role="button"
                          className="btn btn-outline-primary text-nowrap"
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
                      <div className="nav-item">
                        <div
                          role="button"
                          className="btn btn-primary ms-2"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasNavbar"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push("/login");
                          }}
                        >
                          Login
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
              toggleClassName="dropdown-toggle hstack"
              menuClassName="dropdown-menu-end"
            >
              {localeItems}
            </Dropdown>
          </div>

          <div className="d-block d-lg-none">
            <Dropdown
              toggle={localeImage}
              toggleClassName="dropdown-toggle hstack"
            >
              {localeItems}
            </Dropdown>
          </div>

          <button
            className="navbar-toggler ms-auto"
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
  );
}

export default Header;
