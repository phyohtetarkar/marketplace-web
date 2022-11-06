import { PhotoIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Input, Textarea } from "../../../components/forms";
import ShopEdit from "../../../components/shop/ShopEdit";

function CreateShop() {
  return (
    <ShopEdit create={true}/>
  );
}

export default CreateShop;
