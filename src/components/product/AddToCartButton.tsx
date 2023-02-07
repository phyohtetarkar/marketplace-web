import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { AuthenticationContext } from "../../common/contexts";
import { parseErrorResponse } from "../../common/utils";
import { addToCart } from "../../services/ShoppingCartService";

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
  const authContext = useContext(AuthenticationContext);
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
        // setAdding(true);
        // setTimeout(() => {
        //   setAdding(false);
        // }, 2000);
        if (authContext.status === "success") {
          setAdding(true);
          addToCart({
            productId: productId,
            variantId: variantId,
            quantity: quantity ?? 1
          })
            .then((resp) => {
              toast.success("Product added to cart");
              mutate(["/cart-items/count", authContext.payload?.id]);
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
          aria-hidden={!adding}
        ></span>
      )}
      <ShoppingCartIcon width={24} />
      <span>Add to cart</span>
    </button>
  );
}

export default AddToCartButton;
