import ShopManage from "../../../../components/shop/ShopManage";
import { ShopSetting } from "../../../../components/shopdetail";

function Setting() {
  return (
    <ShopManage activeTab="setting">
      {(shop) => shop.id && <ShopSetting shopId={shop.id} />}
    </ShopManage>
  );
}

export default Setting;
