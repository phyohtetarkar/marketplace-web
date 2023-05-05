import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Category } from "../../common/models";
import Alert from "../../components/Alert";
import ProductCatalog from "../../components/product/ProductCatalog";
import { getCategory } from "../../services/CategoryService";
import { ProductQuery } from "../../services/ProductService";

function Collection({ category }: { category: Category | null }) {
  const router = useRouter();

  if (!router.isReady) {
    return;
  }

  const { page, brand } = router.query;

  const query: ProductQuery = {
    page: typeof page === "string" ? parseInt(page) : undefined,
    "category-id": category?.id,
    brand: brand
  };

  if (!category) {
    return (
      <div className="container py-3">
        <Alert message="No products found" />
      </div>
    );
  }

  return (
    <ProductCatalog
      basePath="/collections/[slug]"
      category={category}
      query={query}
    />
  );

  // const firstLoadRef = useRef(false);

  // const { slug } = router.query;

  // const [query, setQuery] = useState<ProductQuery>();

  // const [category, setCategory] = useState<Category>();

  // const { data, error, isLoading } = useSWR(
  //   ["/products", query],
  //   ([url, q]) => (q ? findProducts(q) : undefined),
  //   {
  //     revalidateOnFocus: false
  //   }
  // );

  // useEffect(() => {
  //   if (!router.isReady) {
  //     return;
  //   }

  //   if (firstLoadRef.current) {
  //     return;
  //   }

  //   const { slug, brand, page } = router.query;

  //   getCategory(slug as string)
  //     .then((value) => {
  //       setCategory(value);
  //       firstLoadRef.current = true;
  //       setQuery({
  //         "category-id": value.id,
  //         brand: brand,
  //         page: page && typeof page === "string" ? parseInt(page) : undefined
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   return () => {
  //     firstLoadRef.current = false;
  //   };
  // }, [router]);

  // const breadcrumb = () => {
  //   const element: JSX.Element[] = [];

  //   if (!category) {
  //     return null;
  //   }

  //   element.push(
  //     <li
  //       key={category.id}
  //       className="breadcrumb-item active"
  //       aria-current="page"
  //     >
  //       {category.name}
  //     </li>
  //   );

  //   for (let c = category?.category; !!c; c = c?.category) {
  //     const e = (
  //       <li key={c.id} className="breadcrumb-item">
  //         <Link href={`/collections/${c.slug}`} className="text-light">
  //           {c.name}
  //         </Link>
  //       </li>
  //     );
  //     element.push(e);
  //   }

  //   return element.reverse();
  // };

  // const content = () => {
  //   if (error) {
  //     return <Alert message={parseErrorResponse(error)} variant="danger" />;
  //   }

  //   if (isLoading) {
  //     return <Loading />;
  //   }

  //   if (data?.contents.length === 0) {
  //     return <Alert message="No products found" />;
  //   }

  //   return (
  //     <>
  //       <div className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 g-3">
  //         {data?.contents &&
  //           data.contents.map((p, i) => {
  //             return (
  //               <div className="col" key={p.id}>
  //                 <ProductGridItem value={p} />
  //               </div>
  //             );
  //           })}
  //       </div>
  //       <div className="mt-4 d-flex justify-content-end">
  //         {/* <button className="btn btn-outline-primary rounded-pill">
  //                   Load more products
  //                 </button> */}

  //         <Pagination
  //           currentPage={data?.currentPage}
  //           totalPage={data?.totalPage}
  //           onChange={(page) => {
  //             if (!query || query.page === page) {
  //               return;
  //             }

  //             const q = { ...router.query };

  //             if (page > 0) {
  //               q["page"] = `${page}`;
  //             } else {
  //               delete q["page"];
  //             }

  //             router.replace({
  //               pathname: "/collections/[slug]",
  //               query: q
  //             });
  //           }}
  //         />
  //       </div>
  //     </>
  //   );
  // };

  // return (
  //   <div className="mb-5">
  //     <Head>
  //       <title>All Proudcts</title>
  //     </Head>
  //     <div className="header-bar">
  //       <div className="container">
  //         <div className="row py-4 px-2">
  //           <nav aria-label="breadcrumb col-12">
  //             <ol className="breadcrumb mb-1">
  //               {/* <li className="breadcrumb-item">
  //                 <Link href="/">
  //                   <a className="text-light">Home</a>
  //                 </Link>
  //               </li>
  //               <li className="breadcrumb-item">
  //                 <Link href="/">
  //                   <a className="text-light">Sub Category</a>
  //                 </Link>
  //               </li>
  //               <li className="breadcrumb-item active" aria-current="page">
  //                 Child Category
  //               </li> */}
  //               {breadcrumb()}
  //             </ol>
  //           </nav>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="container py-3">
  //       <div className="row g-3">
  //         <div className="col-lg-4 col-xl-3">
  //           <Filter categoryId={category?.id} />
  //         </div>
  //         <div className="col-lg-8 col-xl-9 mt-3 mt-lg-0">
  //           <div className="d-flex mb-3">
  //             {/* <div className="btn-group ms-auto d-none d-md-block">
  //               <button className="btn py-2 btn-outline-primary">
  //                 <ListBulletIcon width={24} />
  //               </button>
  //               <button className="btn py-2 btn-primary">
  //                 <Squares2X2Icon width={24} />
  //               </button>
  //             </div> */}
  //           </div>
  //           {content()}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.query;
    if (typeof slug === "string") {
      const category = await getCategory(slug);
      return {
        props: {
          category: category
        }
      };
    }
  } catch (e) {
    console.log(e);
  }

  return {
    notFound: true
  };
};

export default Collection;
