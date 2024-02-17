"use client";

import { firebaseAuth } from "@/common/firebase.config";
import { parseErrorResponse } from "@/common/utils";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import { RiCheckLine } from "@remixicon/react";
import { applyActionCode } from "firebase/auth";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function VerifyEmailPage({ oobCode }: { oobCode: string }) {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string>();

  const verifyCode = useCallback(async () => {
    if (verified) {
      return;
    }
    try {
      setError(undefined);
      const auth = firebaseAuth;
      await applyActionCode(auth, oobCode);
      setVerified(true);
    } catch (error) {
      setError(parseErrorResponse(error));
    }
  }, [oobCode, verified]);

  useEffect(() => {
    verifyCode();
  }, [oobCode, verifyCode]);

  

  const content = () => {
    if (error) {
      return <Alert message={error} variant="danger" />;
    }

    if (!verified) {
      return <Loading />;
    }

    return (
      <div className="vstack align-items-center">
        <div className="mt-4 mb-3">
          <div className="rounded-circle bg-success p-2h">
            <RiCheckLine size={64} className="text-light" />
          </div>
        </div>

        <h3 className="text-center mb-4">Your email has been verified</h3>

        <div className="d-flex justify-content-center gap-2 flex-wrap mb-3">
          <Link href={"/shops"} className="btn btn-primary py-2 shadow-none">
            Browse shops
          </Link>
          <Link
            href={"/profile"}
            className="btn btn-outline-primary py-2 shadow-none"
          >
            Go to profile
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xxl-4 offset-xxl-4">
          <div className="card">
            <div className="card-body p-lg-4">{content()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
