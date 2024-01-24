import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="footer text-neutral-content  flex items-center justify-center bg-slate-800 bg-none px-1 py-2 ">
      <p className="text-xs text-gray-300">
        Copyright © 2024 - All right reserved by{" "}
        <Link className="hover:text-green-600" href="https://adriel.in/">
          @adriel.45
        </Link>
      </p>
    </footer>
  );
}
