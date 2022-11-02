import Link from "next/link";
import ShopEdit from "../../../../components/shop/ShopEdit";

function EditShop() {
    return (
      <div>
        <div className="bg-primary">
          <div className="container" style={{ height: 120 }}>
            <div className="d-flex align-items-center flex-wrap h-100">
              <h1 className="text-light">Edit Shop</h1>
              <div className="hstack ms-auto">
                <Link href="/profile/shops">
                <a className="btn btn-light px-3 py-2" >
                  Back to shops
                </a>
                </Link>
                <button className="btn btn-warning px-3 py-2 ms-2" onClick={() => {}}>Update</button>
              </div>
            </div>
          </div>
        </div>
  
        <div className="container py-4">
            <ShopEdit/>
        </div>
      </div>
    );
  }
  
  export default EditShop;