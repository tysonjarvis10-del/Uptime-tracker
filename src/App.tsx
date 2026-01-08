import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import AppLayout from "./componenten/layout/AppLayout";
import { DashboardOverviewPage } from "./componenten/pages/DashboardOverviewPage";
import { DashboardPage } from "./componenten/pages/DashboardPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "./componenten/pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardOverviewPage /> },
      { path: "dashboard/:serverId", element: <DashboardPage /> },
      { path: "dashboardoverviewpage", element: <DashboardOverviewPage /> },
      { path: "homepage", element: <HomePage /> },
    ],
  },
]);

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
