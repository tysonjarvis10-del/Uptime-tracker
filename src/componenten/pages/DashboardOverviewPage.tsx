import { Paper } from "@mantine/core";
import { UptimeLineChart } from "../charts/UptimeLineChart";
import type { ServerUptime } from "../charts/UptimeLineChart";

const dummyServers: ServerUptime[] = [
  {
    id: "server-1",
    name: "Server 1",
    checks: [
      { checkedAt: "2025-01-06T08:00:00Z", status: "UP" },
      { checkedAt: "2025-01-06T08:05:00Z", status: "UP" },
      { checkedAt: "2025-01-06T08:10:00Z", status: "DOWN" },
      { checkedAt: "2025-01-06T08:15:00Z", status: "UP" },
      { checkedAt: "2025-01-06T08:20:00Z", status: "UP" },
    ],
  },
  {
    id: "server-2",
    name: "Server 2",
    checks: [
      { checkedAt: "2025-01-06T08:00:00Z", status: "UP" },
      { checkedAt: "2025-01-06T08:05:00Z", status: "DOWN" },
      { checkedAt: "2025-01-06T08:10:00Z", status: "DOWN" },
      { checkedAt: "2025-01-06T08:15:00Z", status: "UP" },
      { checkedAt: "2025-01-06T08:20:00Z", status: "UP" },
    ],
  },
];

export function DashboardOverviewPage() {
  return (
    <Paper w={700} h={300} p="md" shadow="sm">
      <UptimeLineChart data={dummyServers} />
    </Paper>
  );
}
