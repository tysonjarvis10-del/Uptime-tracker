import { useEffect, useRef } from "react";
import { UptimeLineChart } from "../charts/UptimeLineChart";
import { ServerCards } from "../ServerCards";
import type { ServerResponse, ResponseCheck } from "../Types";

type Props = {
  servers: ServerResponse[];
  setServers: React.Dispatch<React.SetStateAction<ServerResponse[]>>;
};

export function DashboardOverviewPage({ servers, setServers }: Props) {
  const serversRef = useRef(servers);

  useEffect(() => {
    serversRef.current = servers;
  }, [servers]);

  async function getResponseCheck(url: string): Promise<ResponseCheck> {
    const start = performance.now();

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Bad response");

      return {
        checkedAt: new Date().toISOString(),
        responseTimeMs: Math.round(performance.now() - start),
      };
    } catch {
      return {
        checkedAt: new Date().toISOString(),
        responseTimeMs: null,
      };
    }
  }

  useEffect(() => {
    const runCheck = async () => {
      const updated = await Promise.all(
        serversRef.current.map(async (server) => {
          const check = await getResponseCheck(server.url);
          return {
            ...server,
            checks: [...server.checks, check].slice(-20),
          };
        }),
      );

      setServers(updated);
    };

    runCheck();
    const interval = setInterval(runCheck, 300000);

    return () => clearInterval(interval);
  }, [setServers]);

  return (
    <div style={{ padding: 20 }}>
      <UptimeLineChart servers={servers} />
      <ServerCards servers={servers} />
    </div>
  );
}
