import { Auth } from "aws-amplify";
import { Offcanvas } from "bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CSSProperties,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState
} from "react";
import { AuthenticationContext } from "../../common/contexts";
import Dropdown from "../Dropdown";
import {
  BuildingStorefrontIcon,
  ListBulletIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/outline";

interface HeaderProps {
  hideAuth?: boolean;
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter();
  return (
    <>
      <Link href={href}>
        <a className="nav-link d-flex align-items-center d-none d-lg-block">
          {children}
        </a>
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

function AccountMenu({ onNavClick }: { onNavClick?: () => void }) {
  const profileDropdownToggle = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    let profileDropdown: any;

    const initDropdowns = async () => {
      const Dropdown = (await import("bootstrap")).Dropdown;
      if (!profileDropdownToggle.current) {
        return;
      }
      profileDropdown = new Dropdown(profileDropdownToggle.current);
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      profileDropdown?.show();
    };

    initDropdowns();

    const element = profileDropdownToggle.current;

    element?.addEventListener("click", handleClick);

    return () => {
      element?.removeEventListener("click", handleClick);
      profileDropdown?.dispose();
    };
  }, []);

  return (
    <AuthenticationContext.Consumer>
      {({ payload, status }) => {
        if (status !== "success" || !payload) {
          return null;
        }
        return (
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                ref={profileDropdownToggle}
                href="#"
                className="nav-link hstack dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                id="profileMenuLink"
                style={{
                  outlineStyle: "none"
                }}
              >
                {/* <div
            className="d-none d-lg-block me-1 ratio ratio-1x1"
            style={{ width: 35, height: 35 }}
          >
            <Image
              src="/images/profile.png"
              alt=""
              className="rounded-circle"
              layout="fill"
              objectFit="cover"
            />
          </div> */}
                <span className="">Hi, {payload.name ?? ""}</span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="profileMenuLink"
              >
                {/* <li className="d-none d-lg-block">
                  <div className="dropdown-header py-0">
                    <div className="mb-1">Signed in as</div>
                    <h6 className="text-dark">{payload.name ?? ""}</h6>
                  </div>
                </li>
                <li className="d-none d-lg-block">
                  <hr className="dropdown-divider" />
                </li> */}
                <li>
                  <Link href="/profile/overview">
                    <a
                      className="dropdown-item text-decoration-none"
                      onClick={(e) => onNavClick && onNavClick()}
                    >
                      My profile
                    </a>
                  </Link>
                </li>
                <div className="dropdown-divider"></div>
                <li className="dropdown-item">
                  <div
                    role="button"
                    onClick={() => {
                      onNavClick && onNavClick();
                      Auth.signOut().catch(console.error);
                    }}
                  >
                    Logout
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        );
      }}
    </AuthenticationContext.Consumer>
  );
}

function Header({ hideAuth }: HeaderProps) {
  const router = useRouter();
  const offcanvasRef = useRef<HTMLDivElement | null>(null);
  const offcanvas = useRef<Offcanvas>();
  const [search, setSearch] = useState<string>();
  const [searchOption, setSearchOption] = useState("product");
  const [lang, setLang] = useState("mm");

  useEffect(() => {
    const initOffcanvas = async () => {
      const Offcanvas = (await import("bootstrap")).Offcanvas;
      if (!offcanvasRef.current) {
        return;
      }
      offcanvas.current = new Offcanvas(offcanvasRef.current, {
        scroll: true
      });
    };

    initOffcanvas();

    return () => {
      offcanvas.current?.dispose();
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLElement>) {
    event.preventDefault();
  }

  const localeImage = (
    <Image
      src={`/images/${lang}.png`}
      width={28}
      height={22}
      alt=""
      objectFit="cover"
      className="rounded-1"
    />
  );

  const localeItems = (
    <>
      <li role="button" className="dropdown-item" onClick={() => setLang("mm")}>
        Myanmar
      </li>
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
          <Link href="/">
            <a className="navbar-brand d-none d-lg-block">
              {/* <FontAwesomeIcon
                icon={["fas", "shopping-basket"]}
                className="d-inline-block"
              /> */}
              <div className="d-flex align-items-center me-2">
                <div
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
                </div>
                {/* <h4 className="mb-0 fw-bold text-primary">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </h4> */}
              </div>
            </a>
          </Link>

          <div className="hstack w-100">
            <ul className="navbar-nav align-items-lg-center gap-2">
              <li className="nav-item">
                <form className="d-flex" onSubmit={handleSubmit}>
                  <div className="input-group flex-nowrap">
                    <div className="d-flex">
                      <select
                        className="form-select bg-light rounded-0 rounded-start"
                        value={searchOption}
                        onChange={(e) => {
                          setSearchOption(e.target.value);
                        }}
                      >
                        <option value="product">Product</option>
                        <option value="shop">Shop</option>
                      </select>
                    </div>
                    <input
                      className="form-control"
                      type="search"
                      placeholder={`Search ${searchOption}s...`}
                      aria-label="Search"
                      size={20}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{
                        height: 44
                      }}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary shadow-none"
                    >
                      <MagnifyingGlassIcon width={20} />
                    </button>
                  </div>
                </form>
              </li>
            </ul>

            <div className="flex-grow-1"></div>

            <AuthenticationContext.Consumer>
              {({ payload, status }) => {
                if (payload) {
                  return null;
                }
                return (
                  <div className="ms-lg-2 d-flex align-items-center mt-3 mt-lg-0">
                    <div className="nav-item">
                      <Link href="/sign-up">
                        <a className="btn btn-outline-primary d-none d-lg-block">
                          Sign up
                        </a>
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link href="/login">
                        <a className="btn btn-primary ms-2 d-none d-lg-block">
                          Login
                        </a>
                      </Link>
                    </div>
                  </div>
                );
              }}
            </AuthenticationContext.Consumer>

            <div className="nav-item">
              <Link href="/shopping-cart">
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
                      3
                    </div>
                  </div>
                </a>
              </Link>
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
                  <NavLink href="/products">
                    <div className="hstack">
                      <ListBulletIcon
                        width={20}
                        className="me-1 d-none d-lg-block"
                      />
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
                  <NavLink href="/shops">
                    <div className="hstack">
                      <QuestionMarkCircleIcon
                        width={20}
                        className="me-1 d-none d-lg-block"
                      />
                      <span>FAQs</span>
                    </div>
                  </NavLink>
                </li>
              </ul>

              <div className="flex-grow-1"></div>

              <AccountMenu onNavClick={() => offcanvas.current?.hide()} />

              <AuthenticationContext.Consumer>
                {({ payload, status }) => {
                  if (payload) {
                    return null;
                  }
                  return (
                    <div className="ms-lg-2 d-flex align-items-center mt-3 mt-lg-0">
                      <div className="nav-item">
                        <div
                          role="button"
                          className="btn btn-outline-primary d-block d-lg-none"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasNavbar"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push("/sign-up");
                          }}
                        >
                          Sign up
                        </div>
                      </div>
                      <div className="nav-item">
                        <div
                          role="button"
                          className="btn btn-primary ms-2 d-block d-lg-none"
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
