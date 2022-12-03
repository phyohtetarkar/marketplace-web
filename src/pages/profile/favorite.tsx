import { useContext, useState } from "react";
import useSWR from "swr";
import { AuthenticationContext } from "../../common/contexts";
import AccountMenu from "../../components/account/AccountMenu";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { ProductFavoriteItem } from "../../components/product";
import { getFavoriteProductsByUser } from "../../services/FavoriteProductService";

function MyFavorites() {
  // const authContext = useContext(AuthenticationContext);
  // const [userId, setUserId] = useState();

  // const { data, error } = useSWR([userId], (id) =>
  //   id ? getFavoriteProductsByUser({ userId: id }) : []
  // );

  return (
    <div>
      <div className="bg-primary">
        <div className="container">
          <div className="py-4 py-lg-5">
            <h1 className="text-light text-center text-lg-start">
              My Favorites
            </h1>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-4 col-xl-3">
            <AccountMenu />
          </div>
          <div className="col-lg-8 col-xl-9">
            {/* {!data && !error && <Loading />} */}
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {/* {data &&
                !error &&
                data.map((p) => {
                  return (
                    <div key={p.id} className="col">
                      <ProductFavoriteItem />
                    </div>
                  );
                })} */}
              <div className="col">
                <ProductFavoriteItem />
              </div>
              <div className="col">
                <ProductFavoriteItem />
              </div>
              <div className="col">
                <ProductFavoriteItem />
              </div>
              <div className="col">
                <ProductFavoriteItem />
              </div>
              <div className="col">
                <ProductFavoriteItem />
              </div>
            </div>
            <div className="float-end mt-3">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyFavorites;
