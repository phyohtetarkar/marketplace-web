"use client"
import { ProductFilter } from "@/common/models";
import Accordion from "@/components/Accordion";
import { getProductFilterByCategory } from "@/services/CategoryService";
import { getProductFilterByNameLike } from "@/services/ProductService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterProps {
    basePath: string;
    q?: string;
    categoryId?: number;
  }
  
  export default function ProductsFilter(props: FilterProps) {
    const { basePath, q, categoryId } = props;
    const router = useRouter();
    const searchParams = useSearchParams();
    const brand = searchParams.getAll("brand");
  
    const [filter, setFilter] = useState<ProductFilter>();
  
    const [maxPrice, setMaxPrice] = useState(0);
  
    useEffect(() => {
      if (categoryId) {
        getProductFilterByCategory(categoryId)
          .then((v) => {
            setFilter(v);
            setMaxPrice(v.maxPrice);
          })
          .catch(console.error);
      } else if (q) {
        getProductFilterByNameLike(q)
          .then((v) => {
            setFilter(v);
            setMaxPrice(v.maxPrice);
          })
          .catch(console.error);
      }
    }, [categoryId, q]);
  
    const isChecked = (b: string) => {
      if (!brand) {
        return false;
      }
  
      if (typeof brand === "string") {
        return brand === b;
      } else if (brand instanceof Array) {
        return brand.includes(b);
      }
  
      return false;
    };
  
    return (
      <div className="rounded border bg-white">
        <Accordion
          open={true}
          header={(open) => {
            return <span className="fw-bold">Filter</span>;
          }}
          headerClassName="px-3 py-2h"
          bodyClassName="border-top"
          iconType="plus-minus"
        >
          <div className="vstack gap-2">
            <div className="p-3 border-bottom">
              <div className="small text-muted mb-3">BRANDS</div>
              <div
                className="scrollbar-custom py-1"
                style={{ overflowY: "auto", overflowX: "hidden" }}
              >
                <div
                  className="vstack gap-2"
                  style={{ maxHeight: 250, minHeight: 100 }}
                >
                  {filter?.brands?.map((b, i) => {
                    return (
                      <div key={i} className="form-check">
                        <input
                          id={`brand${i}`}
                          type="checkbox"
                          name="brand"
                          className="form-check-input shadow-none"
                          checked={isChecked(b)}
                          onChange={(evt) => {
                            const params = new URLSearchParams(searchParams.toString());
  
                            const brands = new Set(params.getAll("brand"))
  
                            if (evt.target.checked) {
                              brands.add(b);
                            } else {
                              brands.delete(b);
                            }
  
                            params.delete("brand");
                            params.delete("page");
                            
                            brands.forEach(v => params.append("brand", v))
  
                            router.push(basePath + "?" + params.toString());
                          }}
                        />
                        <label htmlFor={`brand${i}`} className="form-check-label">
                          {b}
                        </label>
                      </div>
                    );
                  })}
                  <div className="invisible p-1"></div>
                </div>
              </div>
            </div>
  
            <div className="p-3 border-bottom">
              <div className="small text-muted mb-3">PRICE RANGE</div>
              <div className="vstack">
                <input
                  type="range"
                  className="form-range"
                  id="priceRange"
                  step={1000}
                  min={0}
                  max={filter?.maxPrice ?? 10000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                ></input>
                <div className="hstack">
                  <div>0Ks</div>
                  <div className="flex-grow-1"></div>
                  <div>{maxPrice}Ks</div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <button
                className="btn btn-primary w-100 py-2"
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
  
                  params.delete("page");
  
                  if (maxPrice > 0) {
                    params.set("max-price", maxPrice.toPrecision())
                  } else {
                    params.delete("max-price")
                  }
                  router.push(basePath + "?" + params.toString());
                }}
              >
                Apply filter
              </button>
            </div>
          </div>
        </Accordion>
      </div>
    );
  };