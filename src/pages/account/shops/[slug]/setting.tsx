import { withAuthentication } from "../../../../common/WithAuthentication";
import { ShopManage, ShopSetting } from "../../../../components/shop";

function Setting() {
  return (
    <ShopManage activeTab="setting">
      {(shop) => shop && <ShopSetting shop={shop} />}
    </ShopManage>
  );
}

export default withAuthentication(Setting);
