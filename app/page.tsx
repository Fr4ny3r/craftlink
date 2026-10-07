import ProfileSection from "./components/profileSection";
import SidebarList from "./components/SidebarList";

export default function Home() {
  return (
    <main className="gap-2 flex md:flex-row flex-col min-h-screen w-full items-center justify-start">
      <SidebarList />
      <div className="flex text-3xl min-h-screen w-full">
        <ProfileSection />
    </div>
    </main>
  );
}
