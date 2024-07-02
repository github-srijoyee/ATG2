"use client";

import Users from "./users/page";  // Assuming Users component is in the 'users' folder

export default function Home() {
  return (
    <main className="flex  flex-col items-start justify-between p-5 ">
      <nav className="bg-blue-400 w-full rounded-md">
        <ul>
          <li className="font-serif p-5 w-full">
            <h1 className="text-black">Users and Details <span className="text-red-600">(Click User to view details)</span></h1>
          </li>
        </ul>
      </nav>
      <div className="users w-full mt-10">
        <Users />
      </div>
    </main>
  );
}
