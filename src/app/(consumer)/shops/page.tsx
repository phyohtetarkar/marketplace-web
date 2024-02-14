import { ShopQuery } from "@/services/ShopService";
import ShopsPage from "./shops-page";

export default function Shops({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const { q , page} = searchParams; 

  var query: ShopQuery = {
    q: typeof q === "string" ? q : undefined,
    page: typeof page === "string" ? parseInt(page) : undefined,
  }

  return <ShopsPage query={query} />;
}
