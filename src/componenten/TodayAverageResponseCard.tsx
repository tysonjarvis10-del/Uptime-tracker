import type { ServerResponse } from "./Types";

type Props = {
  server: ServerResponse;
};

export function TodayAverageResponseCard({ server }: Props) {
  const checks = server.checks;
  const today = new Date().toDateString();

  const todayChecks = checks.filter((check) => {
    const checkDate = new Date(check.checkedAt).toDateString();
    return checkDate === today;
  });

  const validResponses = todayChecks
    .map((c) => c.responseTimeMs)
    .filter((time): time is number => time !== null);

  const average =
    validResponses.length > 0
      ? Math.round(
          validResponses.reduce((a, b) => a + b, 0) / validResponses.length,
        )
      : null;

  const isDown = average === null;

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
        Today's average
      </div>

      <div style={{ fontSize: 24, fontWeight: 600 }}>
        {isDown ? "DOWN" : `${average} Ping`}
      </div>

      <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
        {server.name}
      </div>
    </div>
  );
}
