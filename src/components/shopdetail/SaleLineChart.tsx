import { Chart, ChartConfiguration, ChartData } from "chart.js";
import { useEffect, useState } from "react";

const _weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sun", "Sat"];

function SaleLineChart() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let chart: Chart | undefined = undefined;

    if (!canvas) {
      return;
    }

    const data: ChartData = {
      labels: _weekDays,
      datasets: [
        {
          backgroundColor: "rgba(245, 123, 9, 0.1)",
          borderColor: "rgb(245, 123, 9)",
          pointBackgroundColor: "rgb(245, 123, 9)",
          data: [0, 10, 5, 2, 20, 30, 45],
          tension: 0.3,
          fill: true
        }
      ]
    };

    const chartConfig: ChartConfiguration = {
      type: "line",
      data: data,
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
  }, [canvas]);

  return (
    <div className="card">
      <div className="card-header py-3">
        <h5 className="mb-0">Weekly</h5>
      </div>
      <div className="card-body">
        <canvas ref={setCanvas} />
      </div>
    </div>
  );
}

export default SaleLineChart;
