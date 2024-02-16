import { ReactNode } from "react";
import AccountLayoutWrapper from "./AccountLayoutWrapper";

// export const metadata: Metadata = {
//   title: "Profile",
// };

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <AccountLayoutWrapper>{children}</AccountLayoutWrapper>;
}
