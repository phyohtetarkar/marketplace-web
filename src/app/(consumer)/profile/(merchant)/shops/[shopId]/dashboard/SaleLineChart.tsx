"use client";
import { Chart, ChartConfiguration, ChartData } from "chart.js";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { getMonthlySale } from "@/services/ShopService";
import { Select } from "@/components/forms";

const _weekDays = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

function SaleLineChart({ shopId }: { shopId: number }) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const { data, error, isLoading } = useSWR(
    [`/shops/${shopId}/monthly-sales`, year],
    ([url, year]) => getMonthlySale(shopId, year),
    {
      revalidateOnFocus: false
    }
  );

  const years = useMemo(() => {
    const start = 2023;
    const now = new Date().getFullYear();
    const diff = now - start;
    const array: number[] = [];
    for (let i = diff; i >= 0; i--) {
      array.push(start + i);
    }
    return array;
  }, []);

  useEffect(() => {
    let chart: Chart | undefined = undefined;

    if (!canvas) {
      return;
    }

    if (!data) {
      return;
    }

    const chartData: ChartData = {
      labels: _weekDays,
      datasets: [
        {
          backgroundColor: "rgba(245, 123, 9, 0.1)",
          borderColor: "rgb(245, 123, 9)",
          pointBackgroundColor: "rgb(245, 123, 9)",
          data: data.map((d) => d.totalSale),
          tension: 0.3,
          fill: true
        }
      ]
    };

    const chartConfig: ChartConfiguration = {
      type: "line",
      data: chartData,
      options: {
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              drawTicks: false
            },
            ticks: {
              padding: 8
            }
          }
        }
      }
    };
    chart = new Chart(canvas, chartConfig);

    return () => {
      chart?.destroy();
    };
  }, [canvas, data]);

  return (
    <div className="card">
      <div className="card-header py-3">
        <div className="hstack">
          <h5 className="mb-0">Monthly</h5>
          <div className="flex-grow-1"></div>
          <div>
            <Select height={36} onChange={evt => setYear(parseInt(evt.target.value))}>
              <option disabled>Year</option>
              {years.map((y, i) => {
                return (
                  <option key={i} value={y}>
                    {y}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="overflow-auto pb-3">
          <div style={{ minWidth: 800 }}>
            <canvas ref={setCanvas} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleLineChart;
