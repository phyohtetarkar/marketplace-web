"use client";
import { ReactNode } from "react";
import ProfileMenu from "./ProfileMenu";
import { withAuthentication } from "@/common/WithAuthentication";

function AccountLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="container py-3 mb-5">
      <div className="row g-3">
        <div className="col-lg-4 col-xl-3">
          <ProfileMenu />
        </div>
        <div className="col-lg-8 col-xl-9">{children}</div>
      </div>
    </div>
  );
}

export default withAuthentication(AccountLayoutWrapper);