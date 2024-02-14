"use client";
import { RiDeleteBinLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { AuthenticationContext } from "@/common/contexts";
import { parseErrorResponse } from "@/common/utils";
import { deleteFavoriteProduct } from "@/services/FavoriteProductService";
import ProgressButton from "../ProgressButton";

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
    <ProgressButton
      loading={loading || disabled}
      theme="outline"
      className={`h-100 position-relative ${className ?? ""}`}
      variant="danger"
      onClick={() => {
        if (authContext.status === "success") {
          if (!authContext.user?.emailVerified) {
            router.push("/verify-email");
            return;
          }
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
      <RiDeleteBinLine size={18} className="me-2" />
      Remove
    </ProgressButton>
  );
}

export default DeleteFromFavoriteButton;
