"use client";
import { ShopReview } from "@/common/models";
import { formatTimestamp, parseErrorResponse } from "@/common/utils";
import { getReviews } from "@/services/ShopReviewService";
import Image from "next/image";
import { useEffect, useState } from "react";
import Alert from "../Alert";
import Loading from "../Loading";
import ProgressButton from "../ProgressButton";
import Rating from "../Rating";
import ShopReviewEdit from "./ShopReviewEdit";

interface ShopReviewProps {
  value: ShopReview;
}

function Review({ value }: ShopReviewProps) {
  return (
    <div className="list-group-item px-0 py-2h">
      <div className="hstack gap-3 align-items-start">
        <div className="flex-shrink-0">
          <Image
            src={value.reviewer?.image ?? "/images/profile.png"}
            alt=""
            width={46}
            height={46}
            sizes="50vh"
            className="rounded-circle border"
            style={{
              objectFit: "cover"
            }}
          />
        </div>
        <div>
          <h6 className="mb-0">{value.reviewer?.name}</h6>
          <span className="text-muted small">
            {formatTimestamp(value.createdAt ?? 0)}
          </span>
          <div className="mt-3">
            <Rating rating={value.rating ?? 0} />
          </div>
          <div className="text-muted fw-normal mt-2">{value.description}</div>
        </div>
      </div>
    </div>
  );
}

function ShopReviewListing({ shopId }: { shopId: number }) {
  const [page, setPage] = useState(0);
  const [reviews, setReviews] = useState<ShopReview[]>();

  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [error, setError] = useState<string>();

  // const { data, error, isLoading, mutate } = useSWR(
  //   ["/shop-reviews", page],
  //   ([url, p]) => getReviews(shopId, "DESC", p),
  //   {
  //     revalidateOnFocus: false
  //   }
  // );

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const result = await getReviews(shopId, page);
      setReviews(result.contents);
      setHasNext(result.currentPage < result.totalPage - 1);
      setPage(result.currentPage);
    } catch (error) {
      setError(parseErrorResponse(error));
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResult = async () => {
    try {
      setLoadMore(true);
      const result = await getReviews(shopId, page + 1);
      setReviews((old) => {
        if (old) {
          return [...old, ...result.contents];
        }
        return [...result.contents];
      });
      setHasNext(result.currentPage < result.totalPage - 1);
      setPage(result.currentPage);
    } catch (error) {
      setError(parseErrorResponse(error));
    } finally {
      setLoadMore(false);
    }
  };

  const content = () => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={error} variant="danger" />;
    }

    if (!reviews || reviews.length === 0) {
      return <Alert message="No reviews found" />;
    }

    return (
      <>
        <ul className="list-group list-group-flush">
          {reviews?.map((r, i) => <Review key={i} value={r} />)}
        </ul>
        {
          <div className="hstack justify-content-center">
            {hasNext && (
              <div>
                <ProgressButton
                  loading={loadMore}
                  theme="outline"
                  onClick={loadMoreResult}
                  className="rounded-pill"
                >
                  View more
                </ProgressButton>
              </div>
            )}
          </div>
        }
      </>
    );
  };

  return (
    <div className="row g-3">
      <div className="col-12 col-xl-8 order-2 order-lg-1">
        <div className="card">
          <div className="card-body">{content()}</div>
        </div>
      </div>
      <div className="col-12 col-xl-4 order-1 order-lg-2">
        <ShopReviewEdit
          shopId={shopId}
          reload={() => {
            loadReviews();
          }}
        />
      </div>
    </div>
  );
}

export default ShopReviewListing;
