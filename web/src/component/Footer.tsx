import { Link } from "@heroui/react";

export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t-2 border-t-violet-500 h-28">
      <h3 className="text-center text-white">
        Created by{" "}
        <Link className="text-white" href="https://github.com/handleryouth">
          Handleryouth
          <Link.Icon />
        </Link>
      </h3>
    </footer>
  );
}
