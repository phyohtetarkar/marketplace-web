import Link from "next/link";
import { useContext } from "react";
import useSWR from "swr";
import { AuthenticationContext } from "@/common/contexts";
import { countCartItemsByUser } from "@/services/ShoppingCartService";
import { RiShoppingCartLine } from "@remixicon/react";
import Tooltip from "../Tooltip";

function ShoppingCartView() {
  const { user } = useContext(AuthenticationContext);
  const { data, error, isLoading } = useSWR(
    `/profile/cart-count/${user?.id ?? 0}`,
    () => (!user?.id ? 0 : countCartItemsByUser()),
    {
      revalidateOnFocus: false
    }
  );
  return (
    <Link href="/shopping-cart" className="nav-link">
      <Tooltip title="Shopping cart">
      <div className="position-relative hstack">
        <RiShoppingCartLine size={24} strokeWidth={1.5} />
        <div
          className="position-absolute top-0 start-100 translate-middle rounded-pill bg-danger text-light hstack"
          style={{
            fontSize: 12,
            height: 17,
            padding: "0px 6px"
          }}
        >
          {data ?? 0}
        </div>
      </div>
      </Tooltip>
    </Link>
  );
}

export default ShoppingCartView;
