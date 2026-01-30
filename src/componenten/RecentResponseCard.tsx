import type { ServerResponse } from "./Types";

type Props = {
  server: ServerResponse;
};

export function RecentResponseCard({ server }: Props) {
  const lastCheck = server.checks.at(-1);
  const isDown = lastCheck?.responseTimeMs === null;

  return (
    <div
      style={{
        padding: "16px 20px",
        borderRadius: 10,
        border: "1px solid #ccc",
        backgroundColor: isDown ? "#740000" : "#004712",
        maxWidth: 260,
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "#555",
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Recent response time
      </div>

      <div style={{ fontSize: 24, fontWeight: 600 }}>
        {isDown ? "DOWN" : `${lastCheck?.responseTimeMs} Ping`}
      </div>

      <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
        {server.name}
      </div>
    </div>
  );
}
