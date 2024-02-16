import { Metadata } from "next";
import CollectionsPage from "./collections-page";

export const metadata: Metadata = {
  title: "Categories",
};

export default function Collections() {
  return <CollectionsPage />;
}
