import { useParams, useNavigate } from "react-router-dom";
import type { ServerResponse } from "../Types";
import { RecentResponseCard } from "../RecentResponseCard";
import { AverageResponseCard } from "../AverageResponseCard";
import { TodayAverageResponseCard } from "../TodayAverageResponseCard";
import { UptimeLineChart } from "../charts/UptimeLineChart";

type Props = {
  servers: ServerResponse[];
};

export function DashboardPage({ servers }: Props) {
  const { serverId } = useParams<{ serverId: string }>();
  const navigate = useNavigate();

  const server = servers.find((s) => s.id === serverId);

  if (!server) {
    return (
      <div style={{ padding: 20, color: "#fff" }}>
        <p>Server not found</p>
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    );
  }

  const serverArray = [server];

  return (
    <div style={{ padding: 20, color: "#fff" }}>
      <h2 style={{ marginBottom: 20 }}>{server.name}</h2>

      <UptimeLineChart servers={serverArray} />

      <div
        style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 20 }}
      >
        <RecentResponseCard server={server} />
        <AverageResponseCard server={server} />
        <TodayAverageResponseCard server={server} />
      </div>
    </div>
  );
}
