import type { Metadata } from "next";
import AdminLayoutWrapper from "./AdminLayoutWrapper";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " | Admin",
  description: "Multi-vendor marketplace admin"
};

// type Props = {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
