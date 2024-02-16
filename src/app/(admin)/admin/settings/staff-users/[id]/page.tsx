import { redirect } from "next/navigation";
import UpdatePermissionsPage from "./update-permissions-page";

export default function UpdatePermissions({
  params
}: {
  params: { id: string };
}) {
  var id = parseInt(params.id);
  if (isNaN(id)) {
    redirect("/admin/settings/staff-users");
  }

  return <UpdatePermissionsPage userId={id} />;
}
