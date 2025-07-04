"use client";

import { Bell, Search, UserCircle } from "lucide-react"; // Import ikon yang relevan
import { useLanguage } from './LanguageContext';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { language } = useLanguage();
  const router = useRouter();
  // Daftar halaman utama
  const pages = [
    { name: language === 'id' ? 'Beranda' : 'Dashboard', path: '/dashboard/home' },
    { name: language === 'id' ? 'Pengertian' : 'Explanation', path: '/dashboard/pengertian' },
    { name: language === 'id' ? 'Scan' : 'Scan', path: '/dashboard/scan' },
    { name: language === 'id' ? 'Pengaturan' : 'Settings', path: '/dashboard/settings' },
  ];
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const filteredPages = search
    ? pages.filter((page) =>
        page.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <header className="bg-white border-b border-gray-200 w-full sticky top-0 z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Bagian Kiri: Search Bar (Contoh elemen interaktif) */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={search || ""}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              placeholder={language === 'id' ? 'Cari sesuatu...' : 'Search something...'}
              className="w-full max-w-xs pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {/* Dropdown suggestion */}
            {showDropdown && filteredPages.length > 0 && (
              <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                {filteredPages.map((page) => (
                  <li
                    key={page.path}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                    onMouseDown={() => {
                      setSearch("");
                      setShowDropdown(false);
                      router.push(page.path);
                    }}
                  >
                    {page.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Bagian Kanan: Notifikasi & Profil Pengguna */}
          <div className="flex items-center space-x-5">
            {/* Garis Pemisah Vertikal */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Menu Profil Pengguna */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Menu Pengguna"
              >
                <UserCircle size={36} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}