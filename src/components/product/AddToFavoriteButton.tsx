import { HeartIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../common/contexts";
import Tooltip from "../Tooltip";

interface AddToFavoriteButtonProps {
  productId: number;
  className?: string;
  disabled?: boolean;
}

function AddToFavoriteButton({
  productId,
  className,
  disabled
}: AddToFavoriteButtonProps) {
  const authContext = useContext(AuthenticationContext);
  const [adding, setAdding] = useState(false);

  // if (authContext.status !== "success") {
  //   return null;
  // }

  return (
    <Tooltip title="Add to favorite">
      <button
        disabled={adding || disabled}
        className={`btn btn-outline-light text-primary border h-100 position-relative ${
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
          <div className="position-absolute top-50 start-50 translate-middle">
            <span
              className="spinner-border spinner-border-sm "
              role="status"
              aria-hidden={!adding}
            ></span>
          </div>
        )}
        <HeartIcon
          width={24}
          strokeWidth={2}
          style={{
            visibility: adding ? "hidden" : "visible"
          }}
        />
      </button>
    </Tooltip>
  );
}

export default AddToFavoriteButton;
