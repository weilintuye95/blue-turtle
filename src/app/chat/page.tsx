import Sidebar from "~/app/_components/chat/Sidebar";
import MainPanel from "../_components/chat/MainPanel";

export default async function Chat() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <MainPanel />
    </div>
  );
}
