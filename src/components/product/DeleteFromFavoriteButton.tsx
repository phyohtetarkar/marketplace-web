import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { AuthenticationContext } from "../../common/contexts";
import { parseErrorResponse } from "../../common/utils";
import { deleteFavoriteProduct } from "../../services/FavoriteProductService";

interface DeleteFromFavoriteButtonProps {
  productId: number;
  className?: string;
  disabled?: boolean;
}

function DeleteFromFavoriteButton({
  productId,
  className,
  disabled
}: DeleteFromFavoriteButtonProps) {
  const { mutate } = useSWRConfig();
  const authContext = useContext(AuthenticationContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // if (authContext.status !== "success") {
  //   return null;
  // }

  return (
    <button
      disabled={loading || disabled}
      className={`btn btn-link link-danger h-100 position-relative ${
        className ?? ""
      }`}
      onClick={() => {
        // setAdding(true);
        // setTimeout(() => {
        //   setAdding(false);
        // }, 2000);
        if (authContext.status === "success") {
          setLoading(true);
          deleteFavoriteProduct(productId)
            .then((resp) => {
              toast.success("Removed from favorite");
              mutate(["/favorite-products", 0]);
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
      {/* <TrashIcon
        width={20}
        strokeWidth={2}
        style={{
          visibility: loading ? "hidden" : "visible"
        }}
      /> */}
      <span
        className="fw-medium"
        style={{
          visibility: loading ? "hidden" : "visible"
        }}
      >
        Remove
      </span>
    </button>
  );
}

export default DeleteFromFavoriteButton;
