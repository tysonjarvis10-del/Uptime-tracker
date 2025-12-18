import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import AppLayout from "./componenten/layout/AppLayout";
import { DashboardOverviewPage } from "./componenten/pages/DashboardOverviewPage";
import { DashboardPage } from "./componenten/pages/DashboardPage";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardOverviewPage /> },
      { path: "dashboard/:serverId", element: <DashboardPage /> },
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
