import Image from "next/image";
import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <main className="gap-2 flex min-h-screen items-center justify-start">
    <Sidebar />
    <div className="bg-white/2 flex w-fit text-3xl min-h-screen w-full">a
    </div>
    </main>
  );
}
