"use client";
import { useLocalization } from "@/common/hooks";
import {
  RiFacebookBoxFill,
  RiInstagramLine,
  RiMailLine,
  RiMapPinLine
} from "@remixicon/react";
import Link from "next/link";

function Footer() {
  const { locale, localize } = useLocalization();

  const copyRight = `© ${new Date().getFullYear()} ${
    process.env.NEXT_PUBLIC_APP_NAME
  }. All rights reserved.`;

  return (
    <div className="bg-secondary">
      <footer className="py-4">
        <div className="container py-3">
          <div className="row gx-3 gy-4">
            <div className="col-lg-4">
              <h5 className="text-light">About us</h5>
              <p className="text-light text-opacity-75 mb-0 small">
                {process.env.NEXT_PUBLIC_APP_DESCRIPTION}
              </p>
            </div>
            <div className="col-lg-2">
              <h5 className="text-light">Information</h5>
              <div className="vstack small gap-2">
                <Link href="/about-us" className="dark-link">
                  {localize("about_us")}
                </Link>
                <Link href="/terms-and-conditions" className="dark-link">
                  {localize("terms_and_conditions")}
                </Link>
                <Link href="/privacy-policy" className="dark-link">
                  {localize("privacy_policy")}
                </Link>
              </div>
            </div>
            <div className="col-lg-2">
              <h5 className="text-light">Account</h5>
              <div className="vstack small gap-2">
                <Link href="/profile/favorites" className="dark-link">
                  My favorites
                </Link>
                <Link href="/profile/orders" className="dark-link">
                  My orders
                </Link>
                <Link href="/profile/setting" className="dark-link">
                  Account Setting
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <h5 className="text-light">Contact Us</h5>
              <div className="vstack gap-2 text-light text-opacity-75">
                <div className="hstack gap-2">
                  <RiMapPinLine size={20} />
                  <span className="small">
                    {process.env.NEXT_PUBLIC_CONTACT_LOCATION}
                  </span>
                </div>
                <div className="hstack gap-2">
                  <RiMailLine size={20} />
                  <a
                    href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                    className="small text-light text-opacity-75"
                  >
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="container">
        <hr className="my-0 text-dark-gray" />
      </div>
      <footer className="py-4">
        <div className="container">
          <div className="row gap-2">
            <div className="col-12 col-lg-auto order-3 order-lg-1">
              <div className="text-light text-opacity-75 my-auto small text-center">
                {copyRight}
              </div>
            </div>
            <div className="col order-2 order-lg-2"></div>
            <div className="col-12 col-lg-auto order-1 order-lg-3">
              <div className="hstack justify-content-center gap-3">
                <a
                  href="https://www.facebook.com"
                  className="dark-link text-decoration-none"
                  target="_blank"
                >
                  <RiFacebookBoxFill />
                </a>
                <a
                  href="https://www.instagram.com"
                  className="dark-link text-decoration-none"
                  target="_blank"
                >
                  <RiInstagramLine />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
