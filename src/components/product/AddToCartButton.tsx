"use client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { AuthenticationContext } from "@/common/contexts";
import { parseErrorResponse } from "@/common/utils";
import { addToCart } from "@/services/ShoppingCartService";
import { RiShoppingCartLine } from "@remixicon/react";

interface AddToCartButtonProps {
  productId: number;
  variantId?: number;
  quantity?: number;
  className?: string;
  disabled?: boolean;
}

function AddToCartButton({
  productId,
  variantId,
  quantity,
  className,
  disabled
}: AddToCartButtonProps) {
  const { status, user } = useContext(AuthenticationContext);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [adding, setAdding] = useState(false);

  //   if (authContext.status !== "success") {
  //     return null;
  //   }

  return (
    <button
      disabled={adding || disabled}
      className={`btn btn-primary hstack gap-2 justify-content-center ${
        className ?? ""
      }`}
      onClick={() => {
        if (status === "success") {
          if (!user?.emailVerified) {
            router.push("/verify-email");
            return;
          }
          setAdding(true);
          addToCart({
            productId: productId,
            variantId: variantId,
            quantity: quantity ?? 1
          })
            .then((resp) => {
              toast.success("Product added to cart");
              mutate(`/profile/cart-count/${user.id}`);
            })
            .catch((error) => {
              const msg = parseErrorResponse(error);
              toast.error(msg);
            })
            .finally(() => {
              setAdding(false);
            });
        } else {
          router.push("/login");
        }
      }}
    >
      {adding && (
        <span
          className="spinner-border spinner-border-sm "
          role="status"
        ></span>
      )}
      <RiShoppingCartLine size={24} />
      <span className="text-nowrap">Add to cart</span>
    </button>
  );
}

export default AddToCartButton;
