import { ListBulletIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useCategories } from "../../common/hooks";
import { Category } from "../../common/models";
import MultiLevelDropdown from "../MultiLevelDropdown";

function MultiCategoryDropdown() {
  const router = useRouter();
  const { categories, error, isLoading } = useCategories(true);

  return (
    <MultiLevelDropdown<Category>
      toggle={
        <div role="button" className="nav-link hstack">
          <ListBulletIcon width={20} className="me-1 d-none d-lg-block" />
          <span>Categories</span>
        </div>
      }
      items={categories ?? []}
      getMenuLabel={(v) => v.name}
      getSubItems={(v) => v.children}
      onMenuClick={(v) => {
        router.push(`/collections/${v.slug}`);
      }}
    />
  );
}

export default MultiCategoryDropdown;
