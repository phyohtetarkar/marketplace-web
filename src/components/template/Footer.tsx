import Link from "next/link";

function Footer() {
  const copyRight = `© ${new Date().getFullYear()} ${
    process.env.NEXT_PUBLIC_APP_NAME
  }. All rights reserved.`;
  return (
    <>
      {/* <footer className="py-4">
        <div className="container py-3">
          <div className="row g-3">
            <div className="col-lg-4">
              <h5 className="text-light">About us</h5>
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
                <Link href="/">
                  <a className="dark-link">User Login</a>
                </Link>
                <Link href="/">
                  <a className="dark-link">User Register</a>
                </Link>
                <Link href="/">
                  <a className="dark-link">Account Setting</a>
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <h5 className="text-light">Newsletter</h5>
              <div className="text-light text-opacity-75 mb-3 small">
                Subscribe for promotions and wonderful events
              </div>
              <form className="hstack gap-2 mb-3">
                <div>
                  <input
                    type="email"
                    className="form-control border border-primary"
                    placeholder="Your email"
                  />
                </div>
                <button className="btn btn-warning">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </footer> */}
      <div className="container">
        <hr className="my-0 bg-dark-gray" />
      </div>
      <footer className="py-4">
        <div className="container">
          <div className="row align-items-center gap-2">
            <div className="col-12 col-lg-auto order-3 order-lg-1">
              <div className="text-nowrap text-muted text-opacity-50 my-auto small text-center">
                {copyRight}
              </div>
            </div>
            <div className="col order-2 order-lg-2"></div>
            <div className="col-12 col-lg-auto order-1 order-lg-3">
              <div className="hstack gap-4 justify-content-center small">
                <Link href="/privacy-policy">
                  <a className="link-primary text-decoration-none">Privacy</a>
                </Link>
                <Link href="/terms-and-conditions">
                  <a className="link-primary text-decoration-none">Terms</a>
                </Link>
                <Link href="/about-us">
                  <a className="link-primary text-decoration-none">About</a>
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="ms-auto hstack gap-4">
            <a href="#" className="ms-auto text-muted">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="ms-auto text-muted">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div> */}
        </div>
      </footer>
    </>
  );
}

export default Footer;
