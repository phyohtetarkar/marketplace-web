"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthenticationContext } from "@/common/contexts";
import { parseErrorResponse } from "@/common/utils";
import {
  addToFavoriteProduct,
  checkFavorite,
  deleteFavoriteProduct
} from "@/services/FavoriteProductService";
import Tooltip from "../Tooltip";
import { RiHeart3Fill, RiHeart3Line } from "@remixicon/react";

interface AddToFavoriteButtonProps {
  productId: number;
  className?: string;
  disabled?: boolean;
  check?: boolean;
}

function AddToFavoriteButton({
  productId,
  className,
  disabled,
  check
}: AddToFavoriteButtonProps) {
  const authContext = useContext(AuthenticationContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // if (authContext.status !== "success") {
  //   return null;
  // }

  useEffect(() => {
    if (!check || authContext.status !== "success") {
      return;
    }

    checkFavorite(productId)
      .then((result) => {
        setFavorite(result);
      })
      .catch((error) => {});
  }, [authContext, productId, check]);

  return (
    <Tooltip title={favorite ? "Remove from favorite" : "Add to favorite"}>
      <button
        disabled={loading || disabled}
        className={`btn btn-light text-muted rounded-circle position-relative p-0 ${
          className ?? ""
        }`}
        style={{
          width: "2.5rem",
          minHeight: "2.5rem"
        }}
        onClick={() => {
          if (authContext.status === "success") {
            if (!authContext.user?.emailVerified) {
              router.push("/verify-email");
              return;
            }
            setLoading(true);
            const operation = favorite
              ? deleteFavoriteProduct(productId)
              : addToFavoriteProduct(productId);
            operation
              .then((resp) => {
                if (favorite) {
                  toast.success("Removed from favorite");
                } else {
                  toast.success("Added to favorite list");
                }
                setFavorite((old) => !old);
              })
              .catch((error) => {
                const msg = parseErrorResponse(error);
                toast.error(msg);
              })
              .finally(() => {
                setLoading(false);
              });
          } else {
            router.push("/login");
          }
        }}
      >
        {loading && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <span
              className="spinner-border spinner-border-sm "
              role="status"
              aria-hidden={!loading}
            ></span>
          </div>
        )}
        {favorite ? (
          <RiHeart3Fill
            size={20}
            className="position-absolute top-50 start-50 translate-middle text-primary"
            style={{
              visibility: loading ? "hidden" : "visible"
            }}
          />
        ) : (
          <RiHeart3Line
            size={20}
            strokeWidth={2}
            className="position-absolute top-50 start-50 translate-middle"
            style={{
              visibility: loading ? "hidden" : "visible"
            }}
          />
        )}
      </button>
    </Tooltip>
  );
}

export default AddToFavoriteButton;
