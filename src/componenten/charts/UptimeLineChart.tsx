import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export type UptimeCheck = {
  checkedAt: string;
  status: "UP" | "DOWN";
};

export type ServerUptime = {
  id: string;
  name: string;
  checks: UptimeCheck[];
};

type Props = {
  data: ServerUptime[];
};

export function UptimeLineChart({ data }: Props) {
  if (data.length === 0) return null;

  const labels = data[0].checks.map((check) =>
    new Date(check.checkedAt).toLocaleTimeString()
  );

  const datasets = data.map((server, index) => ({
    label: server.name,
    data: server.checks.map((c) => (c.status === "UP" ? 1 : 0)),
    borderColor: index === 0 ? "green" : "blue",
    backgroundColor:
      index === 0 ? "rgba(0, 200, 0, 0.15)" : "rgba(0, 204, 240, 0.15)",
    stepped: true,
    tension: 0,
  }));

  return (
    <Line
      data={{
        labels,
        datasets,
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 1,
            ticks: {
              stepSize: 0.5,
              callback: (value) => {
                if (value === 1) return "UP";
                if (value === 0) return "DOWN";
                return "";
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
        },
      }}
    />
  );
}
