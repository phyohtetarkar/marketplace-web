interface MetaTagsProps {
  title?: string;
  cover?: string;
  description?: string;
  coanical?: string;
}

function MetaTags({
  title = process.env.NEXT_PUBLIC_APP_NAME ?? "",
  cover = `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/images/cover.png`,
  description = process.env.NEXT_PUBLIC_APP_DESCRIPTION ?? "",
  coanical = process.env.NEXT_PUBLIC_BASE_URL ?? ""
}: MetaTagsProps) {
  return (
    <>
      <meta name="description" content={description} />

      <meta property="og:url" content={coanical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={cover} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={coanical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={cover} />
      <meta name="twitter:description" content={description} />

      <link rel="canonical" href={coanical} />
    </>
  );
}

export default MetaTags;
