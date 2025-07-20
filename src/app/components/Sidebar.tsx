"use client"; // Diperlukan untuk menggunakan hook seperti usePathname

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, ScanLine, FileText, Settings } from "lucide-react"; // Import ikon dari lucide-react
import { useLanguage } from './LanguageContext';

// Daftar menu sidebar dengan ikon
const menuItems = [
  { name: { id: "Home", en: "Home" }, href: "/dashboard/home", icon: Home },
  { name: { id: "Pengertian", en: "Explanation" }, href: "/dashboard/pengertian", icon: FileText },
  { name: { id: "Scan", en: "Scan" }, href: "/dashboard/scan", icon: ScanLine },
];

export default function Sidebar({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { language } = useLanguage();

  // Sidebar untuk mobile: overlay + slide, untuk desktop: static
  return (
    <>
      {/* Overlay untuk mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-slate-900 text-slate-200 flex flex-col transition-transform duration-300
          md:static md:translate-x-0 md:flex md:h-screen
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ maxWidth: '16rem' }}
      >
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
                  {/* Mobile: gunakan button agar bisa close drawer, Desktop: tetap Link */}
                  <div className="block md:hidden">
                    <button
                      className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out group text-left ${
                        pathname === item.href
                          ? "bg-blue-500 text-white shadow-lg"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                      onClick={() => {
                        if (onClose) onClose();
                        router.push(item.href);
                      }}
                    >
                      <item.icon size={20} className="mr-4 flex-shrink-0" />
                      <span className="font-medium">{item.name[language]}</span>
                    </button>
                  </div>
                  <div className="hidden md:block">
                    <Link
                      href={item.href}
                      className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out group ${
                        pathname === item.href
                          ? "bg-blue-500 text-white shadow-lg"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <item.icon size={20} className="mr-4 flex-shrink-0" />
                      <span className="font-medium">{item.name[language]}</span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          {/* Menu Bawah (Profil/Logout) */}
          <div>
            <ul>
              <li className="mb-2">
                <div className="block md:hidden">
                  <button
                    className="w-full flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out text-left text-slate-400 hover:bg-slate-800 hover:text-white"
                    onClick={() => {
                      if (onClose) onClose();
                      router.push('/dashboard/settings');
                    }}
                  >
                    <Settings size={20} className="mr-4" />
                    <span className="font-medium">{language === 'id' ? 'Pengaturan' : 'Settings'}</span>
                  </button>
                </div>
                <div className="hidden md:block">
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out text-slate-400 hover:bg-slate-800 hover:text-white"
                  >
                    <Settings size={20} className="mr-4" />
                    <span className="font-medium">{language === 'id' ? 'Pengaturan' : 'Settings'}</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}