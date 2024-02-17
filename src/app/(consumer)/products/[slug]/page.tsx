import { getProductBySlug } from "@/services/ProductService";
import { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
import ProductPage from "./product-page";

interface Props {
  params: { slug: string };
}
const getProduct = cache(async (slug: string) => {
  return getProductBySlug(slug);
});

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProduct(params.slug);

  const previousImages = (await parent).openGraph?.images || [];

  if (product) {
    return {
      title: product.name,
      description: product.shop?.name,
      openGraph: {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`,
        title: product.name,
        description: product.shop?.name,
        images: [`${product.thumbnail ?? ""}`, ...previousImages],
        type: "website"
      },
      twitter: {
        title: product.name,
        description: product.shop?.name,
        card: "summary_large_image",
        images: [`${product.thumbnail ?? ""}`, ...previousImages]
      }
    };
  }

  return {};
}

export default async function Product({ params }: Props) {
  const product = await getProduct(params.slug);

  // if (!product) {
  //   notFound();
  // }

  return <ProductPage product={product} />;
}
