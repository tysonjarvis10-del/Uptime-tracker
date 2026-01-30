import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardOverviewPage } from "./componenten/pages/DashboardOverviewPage";
import { DashboardPage } from "./componenten/pages/DashboardPage";
import ContactPage from "./componenten/pages/ContactPage";
import { SERVER_CONFIG } from "./componenten/ServerConfig";
import type { ServerResponse } from "./componenten/Types";
import AppLayout from "./componenten/layout/AppLayout";

const STORAGE_KEY = "uptime_servers";

export default function App() {
  const [servers, setServers] = useState<ServerResponse[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ServerResponse[];

        const validServers = parsed.filter((server) =>
          SERVER_CONFIG.some((s) => s.id === server.id),
        );

        const newServers = SERVER_CONFIG.filter(
          (config) => !validServers.some((s) => s.id === config.id),
        ).map((config) => ({
          ...config,
          checks: [
            {
              checkedAt: new Date().toISOString(),
              responseTimeMs: null,
            },
          ],
        }));

        return [...validServers, ...newServers];
      } catch {}
    }

    const initialTimestamp = new Date().toISOString();
    return SERVER_CONFIG.map((s) => ({
      ...s,
      checks: [
        {
          checkedAt: initialTimestamp,
          responseTimeMs: null,
        },
      ],
    }));
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(servers));
  }, [servers]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <DashboardOverviewPage
                servers={servers}
                setServers={setServers}
              />
            }
          />
          <Route
            path="/servers/:serverId"
            element={<DashboardPage servers={servers} />}
          />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
