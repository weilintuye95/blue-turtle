import Link from "next/link";
import React from "react";
import { FilePenIcon, MenuIcon } from "~/app/_icons/icons";
import { Button } from "~/components/ui/button";

type SidebarProps = {
  titleArray: string[];
};

const Sidebar: React.FC<SidebarProps> = ({ titleArray }) => {
  return (
    <aside className="flex w-64 flex-col justify-between bg-gray-100 p-4">
      <div>
        <div className="mb-4 flex items-center justify-between"></div>
        <nav className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Recent Chats</h2>
            <ul className="space-y-1">
              {titleArray.map((title) => (
                <li key={title}>
                  <Link
                    href="#"
                    className="text-muted-foreground"
                    prefetch={false}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="#" className="text-blue-600" prefetch={false}>
              See more
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
