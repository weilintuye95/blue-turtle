import Sidebar from "~/app/_components/chat/Sidebar";
import MainPanel from "../_components/chat/MainPanel";

const exampleTitles = ["Chat 1", "Chat 2", "Chat 3", "Chat 4"];

export default async function Chat() {
  return (
    <div className="flex h-screen">
      <Sidebar titleArray={exampleTitles} />
      <MainPanel />
    </div>
  );
}
