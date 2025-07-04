import { BookOpen, ThermometerSun, CheckCircle2, Droplets } from "lucide-react";

export default function PengertianPage() {
  return (
    // Wrapper utama dengan background lembut dan padding
    <div className="bg-slate-50 min-h-full p-8 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Halaman */}
        <div className="flex items-center border-b border-slate-200 pb-6 mb-8">
          <div className="bg-blue-100 p-3 rounded-full">
            <BookOpen size={32} className="text-blue-600" />
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-slate-800">
              Tentang Identifikasi Apel
            </h1>
            <p className="text-md text-slate-500 mt-1">
              Pahami tujuan dan kategori yang digunakan dalam aplikasi ini.
            </p>
          </div>
        </div>

        {/* Bagian Tujuan Identifikasi */}
        <div className="bg-white p-8 rounded-xl border border-slate-200 mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            🎯 Tujuan Identifikasi
          </h2>
          <p className="text-slate-600 leading-relaxed text-justify">
            Tujuan utama dari sistem "DryApple-Scan" adalah untuk mengidentifikasikan kondisi permukaan buah apel berdasarkan tingkat kelembapan atau kekeringannya. Identifikasi ini sangat penting dalam manajemen pasca-panen untuk menentukan penanganan yang tepat, apakah apel layak untuk disimpan dalam waktu lama, dijual langsung sebagai buah segar, atau harus segera diolah. Dengan deteksi otomatis, proses penyortiran menjadi lebih efisien, konsisten, dan dapat mengurangi potensi kerugian akibat kerusakan buah.
          </p>
        </div>

        {/* Bagian Kategori dalam Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Kategori Tingkat Kekeringan Apel
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Kartu: Kering */}
            <div className="bg-white p-6 rounded-xl border-t-4 border-orange-500 shadow-md flex flex-col">
              <div className="flex items-center mb-4">
                <ThermometerSun size={24} className="text-orange-600" />
                <h3 className="text-xl font-bold text-orange-800 ml-3">
                  KERING
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                Menandakan apel telah kehilangan banyak kelembapan. Ciri-cirinya meliputi kulit kusam, sedikit mengerut, dan tidak kencang. Umumnya sudah menurun tingkat kesegarannya, cocok untuk diolah menjadi produk kering.
              </p>
            </div>

            {/* Kartu: Sedang (Normal) */}
            <div className="bg-white p-6 rounded-xl border-t-4 border-green-500 shadow-md flex flex-col">
              <div className="flex items-center mb-4">
                <CheckCircle2 size={24} className="text-green-600" />
                <h3 className="text-xl font-bold text-green-800 ml-3">
                  SEDANG (Normal)
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                Ini adalah kondisi ideal. Permukaan apel terasa halus, kencang, dan berkilau alami. Memiliki hidrasi optimal, tekstur renyah, dan rasa maksimal. Standar kualitas tertinggi untuk konsumsi langsung.
              </p>
            </div>

            {/* Kartu: Basah */}
            <div className="bg-white p-6 rounded-xl border-t-4 border-blue-500 shadow-md flex flex-col">
              <div className="flex items-center mb-4">
                <Droplets size={24} className="text-blue-600" />
                <h3 className="text-xl font-bold text-blue-800 ml-3">
                  BASAH
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                Terdapat butiran air jelas di permukaan karena pencucian, pengembunan, atau awal pembusukan. Kondisi ini dapat memicu jamur dan bakteri, sehingga memerlukan penanganan segera.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}