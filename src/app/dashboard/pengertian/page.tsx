export default function PengertianPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-gray-800">
      
      <h1 className="text-2xl font-bold mb-6 text-center">
        Klasifikasi Tingkat Kekeringan pada Buah Apel
      </h1>

      {/* Bagian Tujuan Klasifikasi */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 border-b pb-2">
          Tujuan Klasifikasi
        </h2>
        <p className="text-justify leading-relaxed">
          Tujuan utama dari sistem "DryApple-Scan" adalah untuk mengklasifikasikan kondisi permukaan buah apel berdasarkan tingkat kelembapan atau kekeringannya. Klasifikasi ini sangat penting dalam manajemen pasca-panen untuk menentukan penanganan yang tepat, apakah apel layak untuk disimpan dalam waktu lama, dijual langsung sebagai buah segar, atau harus segera diolah. Dengan deteksi otomatis, proses penyortiran menjadi lebih efisien, konsisten, dan dapat mengurangi potensi kerugian akibat kerusakan buah.
        </p>
      </div>

      {/* Bagian Kategori Kekeringan */}
      <div>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Kategori Tingkat Kekeringan Apel
        </h2>
        
        {/* Kategori 1: Kering */}
        <div className="mt-4 mb-6 p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
          <h3 className="text-lg font-bold text-orange-700">
            Kategori: KERING
          </h3>
          <p className="mt-2 text-justify">
            <strong>Deskripsi:</strong> Kategori 'Kering' menandakan apel yang telah kehilangan banyak kelembapan alaminya. Ciri-cirinya meliputi kulit yang mulai terlihat kusam, sedikit mengerut, dan tidak lagi kencang saat ditekan. Kondisi ini sering terjadi akibat penyimpanan yang terlalu lama atau paparan suhu yang tidak ideal. Apel seperti ini umumnya sudah menurun tingkat kesegarannya untuk dikonsumsi langsung, namun bisa menjadi kandidat utama untuk diolah menjadi produk kering seperti keripik apel atau cuka apel.
          </p>
        </div>

        {/* Kategori 2: Sedang / Normal */}
        <div className="mt-4 mb-6 p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
          <h3 className="text-lg font-bold text-green-700">
            Kategori: SEDANG (Normal)
          </h3>
          <p className="mt-2 text-justify">
            <strong>Deskripsi:</strong> Ini adalah kondisi ideal untuk sebuah apel segar. Permukaan apel pada kategori 'Sedang' terasa halus, kencang, dan memiliki kilau alami yang menandakan kesegaran. Apel dalam kondisi ini memiliki tingkat hidrasi yang optimal, tekstur yang renyah, dan rasa yang maksimal. Kategori ini merupakan standar kualitas tertinggi untuk apel yang akan dijual untuk konsumsi langsung.
          </p>
        </div>

        {/* Kategori 3: Basah */}
        <div className="mt-4 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
          <h3 className="text-lg font-bold text-blue-700">
            Kategori: BASAH
          </h3>
          <p className="mt-2 text-justify">
            <strong>Deskripsi:</strong> Apel dikategorikan 'Basah' ketika permukaannya terdapat butiran air yang jelas. Kondisi ini bisa disebabkan karena proses pencucian, pengembunan (akibat perubahan suhu dari dingin ke hangat), atau mulai menunjukkan tanda awal pembusukan (mengeluarkan cairan). Kondisi basah yang dibiarkan terlalu lama dapat memicu pertumbuhan jamur dan bakteri. Apel dalam kondisi ini memerlukan penanganan segera, seperti pengeringan permukaan jika ingin disimpan, atau harus segera dikonsumsi/diolah.
          </p>
        </div>
      </div>

    </div>
  );
}