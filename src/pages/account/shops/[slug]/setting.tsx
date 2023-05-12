import ShopManage from "../../../../components/shop/ShopManage";
import { ShopSetting } from "../../../../components/shopdetail";

function Setting() {
  return (
    <ShopManage activeTab="setting">
      {(shop) => shop && <ShopSetting shop={shop} />}
    </ShopManage>
  );
}

export default Setting;
