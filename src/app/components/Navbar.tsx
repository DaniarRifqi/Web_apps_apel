"use client";

import { Bell, Search, UserCircle } from "lucide-react"; // Import ikon yang relevan

export default function Navbar() {
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
              placeholder="Cari sesuatu..."
              className="w-full max-w-xs pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Bagian Kanan: Notifikasi & Profil Pengguna */}
          <div className="flex items-center space-x-5">
            {/* Tombol Notifikasi */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              aria-label="Notifikasi"
            >
              <Bell size={22} />
            </button>

            {/* Garis Pemisah Vertikal */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Menu Profil Pengguna */}
            <div className="flex items-center space-x-3">
              {/* <div className="text-right">
                <div className="text-sm font-semibold text-gray-800">
                  Nama Pengguna
                </div>
              </div> */}
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