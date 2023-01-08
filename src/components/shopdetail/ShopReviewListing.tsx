import Image from "next/image";
import Pagination from "../Pagination";
import Rating from "../Rating";
import useSWR from "swr";
import ShopReviewForm from "./ShopReviewForm";
import { PageData, ShopReview } from "../../common/models";
import { getReviews } from "../../services/ShopReviewService";

interface ShopReviewProps {
  value: ShopReview;
}

function Review({ value }: ShopReviewProps) {
  return (
    <div className="p-2">
      <div className="hstack gap-3 align-items-start">
        <div className="position-relative flex-shrink-0 ">
          <Image
            src={value.reviewer?.image ?? "{/images/profile.png}"}
            width={60}
            height={60}
            alt=""
            className="rounded-circle"
            objectFit="cover"
          />
        </div>
        <div>
          <h6 className="mb-0">{value.reviewer?.name}</h6>
          <span className="text-muted small">{value.createdAt}</span>
          <div className="mt-3">
            <Rating rating={value.rating ?? 0} />
          </div>
          <h6 className="text-muted fw-normal mt-2">{value.description}</h6>
        </div>
      </div>
      <hr className="bg-dark-gray" />
    </div>
  );
}

function ShopReviewListing({ shopId }: { shopId: number }) {
  const { data, error, isLoading } = useSWR<PageData<ShopReview>, Error>(
    ["/shops", shopId],
    ([url, id]) => getReviews(id, "ASC"),
    {
      revalidateOnFocus: false
    }
  );

  return (
    <div>
      <ShopReviewForm />
      <div className="card shadow-sm">
        <div className="card-body">
          {data?.contents &&
            data?.contents.map((r, i) => <Review key={i} value={r} />)}
          <div className="hstack justify-content-end">
            <div>
              <Pagination
                currentPage={data?.currentPage}
                totalPage={data?.totalPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopReviewListing;
