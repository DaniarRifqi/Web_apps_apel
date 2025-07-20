"use client";

import { useState } from 'react';
import { Settings, Languages, Sun, Moon, HelpCircle, ScanLine, Upload, Camera, Cpu, ClipboardList, Save } from 'lucide-react';
import toast from 'react-hot-toast';

import { useLanguage } from '../../components/LanguageContext';

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage();

  // Tambahkan state lokal untuk bahasa yang dipilih
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleSaveSettings = () => {
    setLanguage(selectedLanguage);
    toast.success(selectedLanguage === 'id' ? 'Bahasa berhasil diubah!' : 'Language changed successfully!');
  };

  // Data untuk langkah-langkah penggunaan
  const usageSteps = [
    {
      icon: ScanLine,
      title: "Buka Halaman Scan",
      description: "Pilih menu 'Scan' pada sidebar untuk memulai proses identifikasi."
    },
    {
      icon: Upload,
      title: "Pilih Sumber Gambar",
      description: "Unggah gambar dari galeri Anda atau gunakan kamera untuk mengambil foto apel secara langsung. Pastikan gambar jelas dan fokus."
    },
    {
      icon: Cpu,
      title: "Mulai Proses Analisis",
      description: "Klik tombol 'Identifikasi Sekarang' dan sistem kami akan menganalisis gambar menggunakan model AI."
    },
    {
      icon: ClipboardList,
      title: "Lihat Hasil Identifikasi",
      description: "Hasil klasifikasi (Kering, Sedang, Basah) akan ditampilkan beserta persentase keyakinan."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-full p-4 sm:p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Halaman */}
        <div className="flex flex-col sm:flex-row items-center border-b border-slate-200 pb-4 sm:pb-6 mb-6 sm:mb-8">
          <div className="bg-purple-100 p-3 rounded-full mb-3 sm:mb-0">
            <Settings size={28} className="text-purple-600" />
          </div>
          <div className="sm:ml-4 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
              { language === 'id' ? 'Pengaturan & Bantuan' : 'Setting & Help'}
            </h1>
            <p className="text-sm sm:text-md text-slate-500 mt-1">
              {language === 'id' ? 'Kelola preferensi aplikasi dan lihat panduan penggunaan.' : 'Manage app preferences and view the usage guide.'}
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 items-start">
          
          {/* Kolom Kiri: Pengaturan */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4">
                {language === 'id' ? 'Preferensi' : 'Preference'}
              </h2>
              {/* Pengaturan Bahasa */}
              <div className="mb-4 sm:mb-6">
                <label htmlFor="language-select" className="flex items-center text-sm sm:text-md font-semibold text-slate-700 mb-2">
                  <Languages size={16} className="mr-2" /> {language === 'id' ? 'Bahasa' : 'Language'}
                </label>
                <select
                  id="language-select"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as 'id' | 'en')}
                  className="block w-full p-2 border border-slate-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleSaveSettings}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 transition shadow-sm text-sm sm:text-base"
            >
              <Save size={18} />
              {language === 'id' ? 'Simpan Pengaturan' : 'Save Settings'}
            </button>
          </div>

          {/* Kolom Kanan: Cara Menggunakan */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center mb-4 sm:mb-6">
              <HelpCircle className="text-green-600" size={24} />
              <h2 className="text-lg sm:text-2xl font-bold text-slate-800 ml-2 sm:ml-3">
                {language === 'id' ? 'Cara Menggunakan Aplikasi' : 'How to Use the App'}
              </h2>
            </div>
            
            {/* Timeline/Stepper */}
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200"></div>
              <ul className="space-y-6 sm:space-y-8">
                {usageSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-green-600 text-white rounded-full font-bold z-10 text-sm sm:text-base">
                      {index + 1}
                    </div>
                    <div className="ml-4 sm:ml-6">
                      <h3 className="flex items-center text-base sm:text-lg font-bold text-slate-800">
                        <step.icon size={16} className="mr-2 text-green-600" /> {language === 'id' ? step.title : (index === 0 ? 'Open Scan Page' : index === 1 ? 'Choose Image Source' : index === 2 ? 'Start Analysis' : 'View Results')}
                      </h3>
                      <p className="mt-1 text-slate-600 text-xs sm:text-base">{language === 'id' ? step.description : (index === 0 ? "Select 'Scan' from the sidebar to start identification." : index === 1 ? "Upload an image from your gallery or use the camera to take a photo of the apple. Make sure the image is clear and focused." : index === 2 ? "Click 'Identify Now' and our system will analyze the image using AI." : "The classification result (Dry, Medium, Wet) will be displayed along with the confidence percentage.")}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}