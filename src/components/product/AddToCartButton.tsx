import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../common/contexts";

interface AddToCartButtonProps {
  productId: number;
  className?: string;
  disabled?: boolean;
}

function AddToCartButton({
  productId,
  className,
  disabled
}: AddToCartButtonProps) {
  const authContext = useContext(AuthenticationContext);
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
        setAdding(true);
        setTimeout(() => {
          setAdding(false);
        }, 2000);
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
