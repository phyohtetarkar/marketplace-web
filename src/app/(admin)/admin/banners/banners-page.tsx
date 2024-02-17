"use client";
// import {
//     closestCenter,
//     DndContext,
//     DragEndEvent,
//     KeyboardSensor,
//     PointerSensor,
//     useSensor,
//     useSensors
//   } from "@dnd-kit/core";
//   import {
//     arrayMove,
//     rectSortingStrategy,
//     SortableContext,
//     sortableKeyboardCoordinates
//   } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Banner } from "@/common/models";
import { parseErrorResponse, validateResponse } from "@/common/utils";
import { withAuthorization } from "@/common/withAuthorization";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import BannerItem from "./BannerItem";
import Link from "next/link";
import makeApiRequest from "@/common/makeApiRequest";

const getBanners = async (url: string) => {
  const resp = await makeApiRequest({ url, authenticated: true });
  await validateResponse(resp);
  return resp.json() as Promise<Banner[]>;
};

function BannersPage() {
  const [sortMode, setSortMode] = useState(false);

  const { data, error, isLoading } = useSWR("/admin/banners", getBanners, {
    revalidateOnFocus: false,
  });

  // const sensors = useSensors(
  //   useSensor(PointerSensor, {
  //     // activationConstraint: {
  //     //   delay: 150,
  //     //   tolerance: 10
  //     // }
  //   }),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates
  //   })
  // );

  // function handleDragEnd(event: DragEndEvent) {
  //   const { active, over } = event;

  //   if (active.id !== over?.id) {
  //     setList((items) => {
  //       const oldIndex = items.findIndex((e) => e.id === active.id);
  //       const newIndex = items.findIndex((e) => e.id === over?.id);

  //       let newItems = arrayMove(items, oldIndex, newIndex);

  //       return newItems;
  //     });
  //   }
  // }

  const content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Alert message={parseErrorResponse(error)} variant="danger" />;
    }

    if (!data || data.length === 0) {
      return <Alert message="No banners found" />;
    }

    const banners = data.map((e) => {
      return (
        <BannerItem key={e.id} id={e.id} image={e.image} sorting={sortMode} />
      );
    });

    // if (sortMode) {
    //   return (
    //     <div className="d-flex flex-wrap gap-3">
    //       <DndContext
    //           sensors={sensors}
    //           collisionDetection={closestCenter}
    //           onDragEnd={handleDragEnd}
    //         >
    //           <SortableContext
    //             items={list.map((e) => e.id)}
    //             strategy={rectSortingStrategy}
    //           >
    //             {banners}
    //           </SortableContext>
    //         </DndContext>
    //       {banners}
    //     </div>
    //   );
    // }

    return <div className="d-flex flex-wrap gap-3">{banners}</div>;
  };

  return (
    <>
      <div className="row mb-4">
        <div className="col">
          <h2 className="mb-0">Banners</h2>
        </div>

        <div className="col-auto hstack d-none">
          <div className="form-check">
            <input
              id="sortCheck"
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={sortMode}
              onChange={(e) => setSortMode(e.target.checked)}
            ></input>
            <label htmlFor="sortCheck" className="form-check-label fw-medium">
              Sort mode
            </label>
          </div>
        </div>

        <div className="col-auto hstack">
          <Link
            href="/admin/banners/create-banner"
            className="btn btn-primary align-self-center text-nowrap"
          >
            Add new
          </Link>
        </div>
      </div>
      <div className="row">
        {/* <DndProvider backend={HTML5Backend}>
            <div className="d-flex flex-wrap gap-2">
              {list.map((e, i) => {
                return (
                  <BannerItem
                    key={e.id}
                    id={e.id}
                    index={i}
                    moveCard={moveCard}
                  />
                );
              })}
            </div>
          </DndProvider> */}

        <div className="col-12">{content()}</div>
      </div>
    </>
  );
}

export default withAuthorization(BannersPage, ["BANNER_READ", "BANNER_WRITE"]);
