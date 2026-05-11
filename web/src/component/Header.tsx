import { NavLink } from "react-router";

export default function Header() {
  return (
    <nav className="p-4 text-white bg-black border-b-2 py-4 border-violet-500 flex items-center justify-between h-28">
      <NavLink to="/" end className="text-xl font-bold">
        Image Converter
      </NavLink>

      <div className="flex items-center gap-4">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about" end>
          About
        </NavLink>
      </div>
    </nav>
  );
}
