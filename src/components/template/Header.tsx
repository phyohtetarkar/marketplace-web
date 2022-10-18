import { Offcanvas } from "bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Search } from "react-feather";

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
            outlineStyle: "none",
          }}
        >
          <div
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
          </div>
          <span className="d-block d-lg-none">Developer</span>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="profileMenuLink"
        >
          <li className="d-none d-lg-block">
            <div className="dropdown-header py-0">
              <div className="mb-1">Signed in as</div>
              <h6 className="text-dark">Developer</h6>
            </div>
          </li>
          <li className="d-none d-lg-block">
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link href="/profile">
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
              }}
            >
              Logout
            </div>
          </li>
        </ul>
      </li>
    </ul>
  );
}

function Header({ hideAuth }: HeaderProps) {
  const router = useRouter();
  const offcanvasRef = useRef<HTMLDivElement | null>(null);
  const offcanvas = useRef<Offcanvas>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    const initOffcanvas = async () => {
      const Offcanvas = (await import("bootstrap")).Offcanvas;
      if (!offcanvasRef.current) {
        return;
      }
      offcanvas.current = new Offcanvas(offcanvasRef.current, {
        scroll: true,
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

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top"
      style={{ height: 70 }}
    >
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">
            {/* <FontAwesomeIcon
                icon={["fas", "shopping-basket"]}
                className="d-inline-block"
              /> */}
            <div className="d-flex align-items-center">
              {/* <Image
                src="/images/logo_round.png"
                width={40}
                height={40}
                alt=""
              /> */}
              <h4 className="mb-0 fw-bold text-primary">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </h4>
            </div>
          </a>
        </Link>

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
              <li className="nav-item">
                <NavLink href="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink href="/products">Products</NavLink>
              </li>
              <li className="nav-item">
                <form
                  className="d-flex ms-lg-3 d-none d-lg-block"
                  onSubmit={handleSubmit}
                >
                  <div className="input-group">
                    <button
                      type="submit"
                      className="btn btn-light text-muted pe-0 rounded-end rounded-pill"
                    >
                      <Search size={20} strokeWidth={3} />
                    </button>
                    <input
                      className="form-control border-0 bg-light px-3 rounded-start rounded-pill"
                      type="search"
                      placeholder="Search products..."
                      aria-label="Search"
                      value={search ?? ""}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{
                        height: 45,
                        width: 250,
                      }}
                    />
                  </div>
                </form>
              </li>
            </ul>

            <div className="flex-grow-1"></div>

            <AccountMenu onNavClick={() => offcanvas.current?.hide()} />

            <>
              {!hideAuth && (
                <div className="ms-lg-2 d-flex align-items-center mt-3 mt-lg-0">
                  <div className="nav-item">
                    <Link href="/sign-up">
                      <a className="btn btn-outline-primary d-none d-lg-block">
                        Sign up
                      </a>
                    </Link>
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
                    <Link href="/login">
                      <a className="btn btn-primary ms-2 d-none d-lg-block">
                        Login
                      </a>
                    </Link>
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
              )}
            </>
          </div>
        </div>

        <button
          className="navbar-toggler ms-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
