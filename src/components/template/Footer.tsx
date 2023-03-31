/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

function Footer() {
  const copyRight = `© ${new Date().getFullYear()} ${
    process.env.NEXT_PUBLIC_APP_NAME
  }. All rights reserved.`;

  return (
    <div className="bg-secondary">
      <footer className="py-4 d-none d-lg-block">
        <div className="container py-3">
          <div className="row g-3">
            <div className="col-lg-4">
              <h5 className="text-light">Contact us</h5>
              <div className="vstack gap-1">
                <p className="mb-2 text-light text-opacity-75 small">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer in feugiat lorem.
                </p>
              </div>
            </div>
            <div className="col-lg-2">
              <h5 className="text-light">Information</h5>
              <div className="vstack small gap-2">
                <a href="#" className="dark-link">
                  About us
                </a>
                <a href="#" className="dark-link">
                  Terms &amp; conditions
                </a>
                <a href="#" className="dark-link">
                  Privacy policy
                </a>
              </div>
            </div>
            <div className="col-lg-2">
              <h5 className="text-light">Account</h5>
              <div className="vstack small gap-2">
                <Link href="/account/favorites" className="dark-link">
                  My favorites
                </Link>
                <Link href="/account/orders" className="dark-link">
                  My orders
                </Link>
                <Link href="/account/setting" className="dark-link">
                  Account Setting
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <h5 className="text-light">Download apps</h5>
              <div className="hstack gap-2">
                <img
                  src="/images/apple-app-store-badge.svg"
                  alt=""
                  style={{
                    objectFit: "fill"
                  }}
                />

                <img
                  src="/images/google-play-badge.svg"
                  alt=""
                  style={{
                    objectFit: "fill"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="container">
        <hr className="my-0 bg-light-gray" />
      </div>
      <footer className="py-4">
        <div className="container">
          <div className="row align-items-center gap-2">
            <div className="col-12 col-lg-auto order-3 order-lg-1">
              <div className="text-light text-opacity-75 my-auto small text-center">
                {copyRight}
              </div>
            </div>
            {/* <div className="col order-2 order-lg-2"></div>
            <div className="col-12 col-lg-auto order-1 order-lg-3">
              = <div className="hstack gap-4 justify-content-center small">
                <Link href="/privacy-policy">
                  <a className="link-light text-decoration-none">Privacy</a>
                </Link>
                <Link href="/terms-and-conditions">
                  <a className="link-light text-decoration-none">Terms</a>
                </Link>
                <Link href="/about-us">
                  <a className="link-light text-decoration-none">About</a>
                </Link>
              </div>
            </div> */}
          </div>
          {/* <div className="ms-auto hstack gap-4">
            <a href="#" className="ms-auto text-muted"></a>
            <a href="#" className="ms-auto text-muted"></a>
          </div> */}
        </div>
      </footer>
    </div>
  );
}

export default Footer;
