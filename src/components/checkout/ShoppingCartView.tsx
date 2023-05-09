import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext } from "react";
import useSWR from "swr";
import { AuthenticationContext } from "../../common/contexts";
import { countCartItemsByUser } from "../../services/ShoppingCartService";

function ShoppingCartView() {
  const authContext = useContext(AuthenticationContext);
  const { data, error, isLoading } = useSWR(
    [`/profile/cart-count`, authContext.payload?.id],
    ([url, id]) => (!id ? 0 : countCartItemsByUser()),
    {
      revalidateOnFocus: false
    }
  );
  return (
    <Link href="/shopping-cart" className="nav-link">
      <div className="position-relative hstack">
        <ShoppingCartIcon width={24} strokeWidth={1.5} />
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
    </Link>
  );
}

export default ShoppingCartView;
