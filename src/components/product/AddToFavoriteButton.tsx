import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../../common/contexts";
import { parseErrorResponse } from "../../common/utils";
import {
  addToFavoriteProduct,
  checkFavorite,
  deleteFavoriteProduct
} from "../../services/FavoriteProductService";
import Tooltip from "../Tooltip";

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
        className={`btn btn-outline-light text-primary border h-100 position-relative ${
          className ?? ""
        }`}
        onClick={() => {
          // setAdding(true);
          // setTimeout(() => {
          //   setAdding(false);
          // }, 2000);
          if (authContext.status === "success") {
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
                console.log(msg);
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
          <HeartIcon
            width={24}
            style={{
              visibility: loading ? "hidden" : "visible"
            }}
          />
        ) : (
          <HeartIconOutline
            width={24}
            strokeWidth={2}
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
