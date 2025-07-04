"use client"; // Diperlukan untuk menggunakan hook seperti usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ScanLine, FileText, Settings } from "lucide-react"; // Import ikon dari lucide-react
import { useLanguage } from './LanguageContext';

// Daftar menu sidebar dengan ikon
const menuItems = [
  { name: { id: "Home", en: "Home" }, href: "/dashboard/home", icon: Home },
  { name: { id: "Pengertian", en: "Explanation" }, href: "/dashboard/pengertian", icon: FileText },
  { name: { id: "Scan", en: "Scan" }, href: "/dashboard/scan", icon: ScanLine },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { language } = useLanguage();

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col h-screen">
      {/* Bagian Logo/Branding */}
      <div className="flex items-center justify-center h-20 border-b border-slate-700">
        <ScanLine size={28} className="text-blue-400" />
        <h1 className="text-xl font-bold ml-3 text-slate-50">DryApple-Scan</h1>
      </div>

      {/* Wrapper untuk menu utama dan menu bawah */}
      <div className="flex flex-col justify-between flex-grow p-4">
        {/* Menu Navigasi Utama */}
        <nav>
          <ul>
            <li className="mb-4 text-sm font-semibold text-slate-500 uppercase tracking-wider">
              {language === 'id' ? 'Menu' : 'Menu'}
            </li>
            {menuItems.map((item) => (
              <li key={item.name.id} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out group ${
                    pathname === item.href
                      ? "bg-blue-500 text-white shadow-lg" // Gaya untuk link aktif
                      : "text-slate-400 hover:bg-slate-800 hover:text-white" // Gaya untuk link non-aktif
                  }`}
                >
                  <item.icon size={20} className="mr-4 flex-shrink-0" />
                  <span className="font-medium">{item.name[language]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Menu Bawah (Profil/Logout) */}
        <div>
          <ul>
            {/* Contoh link Pengaturan */}
            <li className="mb-2">
              <Link
                href="/dashboard/settings"
                className="flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <Settings size={20} className="mr-4" />
                <span className="font-medium">{language === 'id' ? 'Pengaturan' : 'Settings'}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}