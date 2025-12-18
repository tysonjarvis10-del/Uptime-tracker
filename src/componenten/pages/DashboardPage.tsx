import { useParams } from "react-router";

export function DashboardPage() {
  let params = useParams();
  const serverId = params.serverId;

  return <h1>{serverId}</h1>;
}
