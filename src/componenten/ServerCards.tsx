import { Link } from "react-router-dom";
import type { ServerResponse } from "./Types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type Props = {
  servers: ServerResponse[];
};

export function ServerCards({ servers }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "flex-start",
      }}
    >
      {servers.map((server) => {
        const lastCheck = server.checks.at(-1);

        return (
          <Link
            key={server.id}
            to={`/servers/${server.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                width: 220,
                backgroundColor: "#111a2e",
                color: "white",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#16213e",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6">{server.name}</Typography>
                <Typography variant="body1">
                  {lastCheck?.responseTimeMs ?? "DOWN"} ms
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
