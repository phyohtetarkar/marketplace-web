import { useState } from "react";
import useSWR from "swr";
import { parseErrorResponse } from "../../common/utils";
import { withAuthentication } from "../../common/WithAuthentication";
import AccountMenu from "../../components/account/AccountMenu";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { ProductFavoriteItem } from "../../components/product";
import { getFavoriteProducts } from "../../services/FavoriteProductService";

function MyFavorites() {
  // const authContext = useContext(AuthenticationContext);
  // const [userId, setUserId] = useState();

  // const { data, error } = useSWR([userId], (id) =>
  //   id ? getFavoriteProductsByUser({ userId: id }) : []
  // );

  const [page, setPage] = useState(0);

  const { data, error, isLoading } = useSWR(
    ["/favorite-products", page],
    ([url, p]) => getFavoriteProducts(p),
    {
      revalidateOnFocus: false
    }
  );

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (data?.contents.length === 0) {
      return <Alert message="No favorites found" />;
    }

    return (
      <>
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {data?.contents &&
            data.contents.map((f, i) => {
              return (
                <div className="col" key={f.id}>
                  <ProductFavoriteItem value={f} />
                </div>
              );
            })}
        </div>
        <div className="float-end mt-3">
          <Pagination
            currentPage={data?.currentPage}
            totalPage={data?.totalPage}
            onChange={setPage}
          />
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="bg-primary">
        <div className="container">
          <div className="py-4">
            <h1 className="text-light text-center text-lg-start">
              My Favorites
            </h1>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-4 col-xl-3">
            <AccountMenu />
          </div>
          <div className="col-lg-8 col-xl-9">{content()}</div>
        </div>
      </div>
    </div>
  );
}

export default withAuthentication(MyFavorites);
