import Footer from "./Footer";
import { Outlet } from "react-router";
import Header from "./Header";

export default function AuthenticatedLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
