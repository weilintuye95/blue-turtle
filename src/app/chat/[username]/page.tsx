import Link from "next/link";
import Sidebar from "~/app/_components/chat/Sidebar";
import MainPanel from "../../_components/chat/MainPanel";
import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";

const exampleTitles = [
  "Chat 1",
  "Chat 2",
  "Chat 3",
  "Chat 4",
  //   "Chat 5",
  //   "Chat 6",
  //   "Chat 7",
  //   "Chat 8",
  //   "Chat 9",
  //   "Chat 10",
  //   "Chat 11",
  //   "Chat 12",
  //   "Chat 13",
  //   "Chat 14",
  //   "Chat 15",
  //   "Chat 16",
  //   "Chat 17",
  //   "Chat 18",
  //   "Chat 19",
  //   "Chat 20",
  //   "Chat 21",
  //   "Chat 22",
  //   "Chat 23",
  //   "Chat 24",
  //   "Chat 25",
  //   "Chat 26",
  //   "Chat 27",
  //   "Chat 28",
  //   "Chat 29",
  //   "Chat 30",
  //   "Chat 31",
  //   "Chat 32",
  //   "Chat 33",
];

export default async function Chat({
  params,
}: {
  params: { username: string };
}) {
  //   const hello = await api.post.hello({ text: "from tRPC" });

  //   void api.post.getLatest.prefetch();

  return (
    <div className="flex h-screen">
      <Sidebar titleArray={exampleTitles} />
      <MainPanel username={params.username} />
    </div>
  );
}
