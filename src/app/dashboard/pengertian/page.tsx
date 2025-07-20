'use client';
import { BookOpen, ThermometerSun, CheckCircle2, Droplets } from "lucide-react";
import { useLanguage } from '../../components/LanguageContext';

export default function PengertianPage() {
  const { language } = useLanguage();
  return (
    // Wrapper utama dengan background lembut dan padding
    <div className="bg-slate-50 min-h-full p-4 sm:p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Halaman */}
        <div className="flex flex-col sm:flex-row items-center border-b border-slate-200 pb-4 sm:pb-6 mb-6 sm:mb-8">
          <div className="bg-blue-100 p-3 rounded-full mb-3 sm:mb-0">
            <BookOpen size={28} className="text-blue-600" />
          </div>
          <div className="sm:ml-4 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
              {language === 'id' ? 'Tentang Identifikasi Apel' : 'About Apple Identification'}
            </h1>
            <p className="text-sm sm:text-md text-slate-500 mt-1">
              {language === 'id' ? 'Pahami tujuan dan kategori yang digunakan dalam aplikasi ini.' : 'Understand the purpose and categories used in this app.'}
            </p>
          </div>
        </div>

        {/* Bagian Tujuan Identifikasi */}
        <div className="bg-white p-5 sm:p-8 rounded-xl border border-slate-200 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">
            {language === 'id' ? '🎯 Tujuan Identifikasi' : '🎯 Identification Purpose'}
          </h2>
          <p className="text-slate-600 leading-relaxed text-justify text-sm sm:text-base">
            {language === 'id'
              ? 'Tujuan utama dari sistem "DryApple-Scan" adalah untuk mengidentifikasikan kondisi permukaan buah apel berdasarkan tingkat kelembapan atau kekeringannya. Identifikasi ini sangat penting dalam manajemen pasca-panen untuk menentukan penanganan yang tepat, apakah apel layak untuk disimpan dalam waktu lama, dijual langsung sebagai buah segar, atau harus segera diolah. Dengan deteksi otomatis, proses penyortiran menjadi lebih efisien, konsisten, dan dapat mengurangi potensi kerugian akibat kerusakan buah.'
              : 'The main goal of the "DryApple-Scan" system is to identify the surface condition of apples based on their moisture or dryness level. This identification is crucial in post-harvest management to determine the right handling, whether the apple is suitable for long-term storage, direct sale as fresh fruit, or needs immediate processing. With automatic detection, the sorting process becomes more efficient, consistent, and can reduce potential losses due to fruit spoilage.'}
          </p>
        </div>

        {/* Bagian Kategori dalam Grid */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">
            {language === 'id' ? 'Kategori Tingkat Kekeringan Apel' : 'Apple Dryness Level Categories'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Kartu: Kering */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border-t-4 border-orange-500 shadow-md flex flex-col">
              <div className="flex items-center mb-3 sm:mb-4">
                <ThermometerSun size={20} className="text-orange-600" />
                <h3 className="text-lg sm:text-xl font-bold text-orange-800 ml-2 sm:ml-3">
                  {language === 'id' ? 'KERING' : 'DRY'}
                </h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed flex-grow">
                {language === 'id'
                  ? 'Menandakan apel telah kehilangan banyak kelembapan. Ciri-cirinya meliputi kulit kusam, sedikit mengerut, dan tidak kencang. Umumnya sudah menurun tingkat kesegarannya, cocok untuk diolah menjadi produk kering.'
                  : 'Indicates the apple has lost a lot of moisture. Characteristics include dull skin, slight wrinkling, and lack of firmness. Usually, freshness has decreased, suitable for processing into dried products.'}
              </p>
            </div>
            {/* Kartu: Sedang (Normal) */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border-t-4 border-green-500 shadow-md flex flex-col">
              <div className="flex items-center mb-3 sm:mb-4">
                <CheckCircle2 size={20} className="text-green-600" />
                <h3 className="text-lg sm:text-xl font-bold text-green-800 ml-2 sm:ml-3">
                  {language === 'id' ? 'SEDANG (Normal)' : 'MEDIUM (Normal)'}
                </h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed flex-grow">
                {language === 'id'
                  ? 'Ini adalah kondisi ideal. Permukaan apel terasa halus, kencang, dan berkilau alami. Memiliki hidrasi optimal, tekstur renyah, dan rasa maksimal. Standar kualitas tertinggi untuk konsumsi langsung.'
                  : 'This is the ideal condition. The apple surface feels smooth, firm, and naturally shiny. It has optimal hydration, crisp texture, and maximum flavor. The highest quality standard for direct consumption.'}
              </p>
            </div>
            {/* Kartu: Basah */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border-t-4 border-blue-500 shadow-md flex flex-col">
              <div className="flex items-center mb-3 sm:mb-4">
                <Droplets size={20} className="text-blue-600" />
                <h3 className="text-lg sm:text-xl font-bold text-blue-800 ml-2 sm:ml-3">
                  {language === 'id' ? 'BASAH' : 'WET'}
                </h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed flex-grow">
                {language === 'id'
                  ? 'Terdapat butiran air jelas di permukaan karena pencucian, pengembunan, atau awal pembusukan. Kondisi ini dapat memicu jamur dan bakteri, sehingga memerlukan penanganan segera.'
                  : 'There are visible water droplets on the surface due to washing, condensation, or early spoilage. This condition can trigger mold and bacteria, requiring immediate handling.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}