'use client';
import Link from "next/link";
import { FileText, ScanLine, Info, ArrowRight } from "lucide-react";
import { useLanguage } from '../../components/LanguageContext';

export default function HomePage() {
  const { language } = useLanguage();
  return (
    // Wrapper utama dengan latar belakang abu-abu lembut dan padding
    <div className="bg-slate-50 min-h-full p-4 sm:p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Utama */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800">
            {language === 'id' ? 'Selamat Datang di DryApple-Scan' : 'Welcome to DryApple-Scan'}
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
            {language === 'id'
              ? 'Solusi cerdas untuk mengidentifikasi tingkat kekeringan pada buah apel Anda secara akurat.'
              : 'A smart solution to accurately identify the dryness level of your apples.'}
          </p>
        </div>

        {/* Grid untuk Kartu Menu Utama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          {/* Kartu: Pengertian */}
          <Link
            href="/dashboard/pengertian"
            className="group block bg-white p-5 sm:p-8 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-3 sm:mb-4">
              <FileText
                size={24}
                className="text-blue-600 group-hover:scale-110 transition-transform"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 ml-3 sm:ml-4">
                {language === 'id' ? 'Pengertian' : 'Explanation'}
              </h2>
            </div>
            <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
              {language === 'id'
                ? 'Pelajari definisi, tujuan, dan cara kerja aplikasi DryApple-Scan.'
                : 'Learn the definition, purpose, and how the DryApple-Scan app works.'}
            </p>
            <span className="font-semibold text-blue-600 flex items-center text-sm sm:text-base">
              {language === 'id' ? 'Lihat Detail' : 'See Details'}
              <ArrowRight
                size={16}
                className="ml-2 transform group-hover:translate-x-1 transition-transform"
              />
            </span>
          </Link>

          {/* Kartu: Scan */}
          <Link
            href="/dashboard/scan"
            className="group block bg-white p-5 sm:p-8 rounded-xl border border-slate-200 hover:border-green-500 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-3 sm:mb-4">
              <ScanLine
                size={24}
                className="text-green-600 group-hover:scale-110 transition-transform"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 ml-3 sm:ml-4">{language === 'id' ? 'Scan Apel' : 'Scan Apple'}</h2>
            </div>
            <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
              {language === 'id'
                ? 'Gunakan fitur utama kami untuk memindai gambar dan dapatkan hasil analisis.'
                : 'Use our main feature to scan images and get analysis results.'}
            </p>
            <span className="font-semibold text-green-600 flex items-center text-sm sm:text-base">
              {language === 'id' ? 'Mulai Memindai' : 'Start Scanning'}
              <ArrowRight
                size={16}
                className="ml-2 transform group-hover:translate-x-1 transition-transform"
              />
            </span>
          </Link>
        </div>

        {/* Bagian "Tentang Kami" */}
        <div className="mt-8 md:mt-12 bg-white p-5 sm:p-8 rounded-xl border border-slate-200 text-center">
          <Info size={28} className="mx-auto text-slate-500 mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">{language === 'id' ? 'Tentang Aplikasi' : 'About the App'}</h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            {language === 'id'
              ? 'Aplikasi ini dikembangkan untuk membantu petani dan distributor dalam menjaga kualitas buah apel dengan deteksi dini kekeringan.'
              : 'This app is developed to help farmers and distributors maintain apple quality with early dryness detection.'}
          </p>
        </div>
      </div>
    </div>
  );
}