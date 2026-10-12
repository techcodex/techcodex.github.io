import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { contentService } from "../../services/contentService";
import { useContent } from "../../hooks/useContent";
import { ChatWidget } from "../ui/ChatWidget";

export function Layout() {
  const { data: profile } = useContent(() => contentService.getProfile());

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer profile={profile} />
      <ChatWidget />
    </div>
  );
}
