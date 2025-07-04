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
    <div className="bg-slate-50 min-h-full p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Halaman */}
        <div className="flex items-center border-b border-slate-200 pb-6 mb-8">
          <div className="bg-purple-100 p-3 rounded-full">
            <Settings size={32} className="text-purple-600" />
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-slate-800">
              Pengaturan & Bantuan
            </h1>
            <p className="text-md text-slate-500 mt-1">
              Kelola preferensi aplikasi dan lihat panduan penggunaan.
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Kolom Kiri: Pengaturan */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Preferensi</h2>
              
              {/* Pengaturan Bahasa */}
              <div className="mb-6">
                <label htmlFor="language-select" className="flex items-center text-md font-semibold text-slate-700 mb-2">
                  <Languages size={18} className="mr-2" /> Bahasa
                </label>
                <select
                  id="language-select"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as 'id' | 'en')}
                  className="block w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleSaveSettings}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              <Save size={20} />
              {language === 'id' ? 'Simpan Pengaturan' : 'Save Settings'}
            </button>
          </div>

          {/* Kolom Kanan: Cara Menggunakan */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center mb-6">
              <HelpCircle className="text-green-600" size={28} />
              <h2 className="text-2xl font-bold text-slate-800 ml-3">
                {language === 'id' ? 'Cara Menggunakan Aplikasi' : 'How to Use the App'}
              </h2>
            </div>
            
            {/* Timeline/Stepper */}
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200"></div>
              <ul className="space-y-8">
                {usageSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full font-bold z-10">
                      {index + 1}
                    </div>
                    <div className="ml-6">
                      <h3 className="flex items-center text-lg font-bold text-slate-800">
                        <step.icon size={20} className="mr-2 text-green-600" /> {language === 'id' ? step.title : (index === 0 ? 'Open Scan Page' : index === 1 ? 'Choose Image Source' : index === 2 ? 'Start Analysis' : 'View Results')}
                      </h3>
                      <p className="mt-1 text-slate-600">{language === 'id' ? step.description : (index === 0 ? "Select 'Scan' from the sidebar to start identification." : index === 1 ? "Upload an image from your gallery or use the camera to take a photo of the apple. Make sure the image is clear and focused." : index === 2 ? "Click 'Identify Now' and our system will analyze the image using AI." : "The classification result (Dry, Medium, Wet) will be displayed along with the confidence percentage.")}</p>
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