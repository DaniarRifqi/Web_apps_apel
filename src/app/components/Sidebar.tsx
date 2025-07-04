"use client"; // Diperlukan untuk menggunakan hook seperti usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";

// Daftar menu sidebar
const menuItems = [
  { name: "Home", href: "/dashboard/home" },
  { name: "Pengertian", href: "/dashboard/pengertian" },
  { name: "Scan", href: "/dashboard/scan" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col p-4">
      <div className="text-2xl font-semibold mb-8">Menu</div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-4">
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-500 text-white" // Gaya untuk link aktif
                    : "text-gray-300 hover:bg-gray-700 hover:text-white" // Gaya untuk link non-aktif
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}