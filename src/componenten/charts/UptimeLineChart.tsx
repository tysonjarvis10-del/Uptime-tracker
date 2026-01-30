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
import { ServerResponse } from "../Types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

type Props = {
  servers: ServerResponse[];
};

export function UptimeLineChart({ servers }: Props) {
  if (servers.length === 0) return null;

  const maxChecks = Math.max(...servers.map((s) => s.checks.length), 1);

  const labels = Array.from({ length: maxChecks }, (_, i) => {
    if (servers[0].checks[i]) {
      return new Date(servers[0].checks[i].checkedAt).toLocaleTimeString();
    }
    return `Check ${i + 1}`;
  });

  const colors = ["#22c55e", "#3b82f6", "#f97316", "#a855f7", "#ef4444"];

  const datasets = servers.map((server, index) => ({
    label: server.name,
    data: server.checks.map((c) => c.responseTimeMs),
    borderColor: colors[index % colors.length],
    backgroundColor: colors[index % colors.length],
    tension: 0.4,
    spanGaps: true,
    pointRadius: 3,
  }));

  return (
    <div style={{ height: 300, marginBottom: 40 }}>
      <Line
        data={{ labels, datasets }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Response time (ms)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Time",
              },
            },
          },
          plugins: {
            legend: {
              position: "top" as const,
            },
          },
        }}
      />
    </div>
  );
}
