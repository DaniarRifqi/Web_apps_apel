export default function HomePage() {
  return (
    <div className="bg-transparent">
      <h1 className="text-4xl font-bold mb-4 text-center">Selamat Datang di Identifikasi Buah Apel!</h1>
      <p className="text-center font-semibold">Membantu mengidentifikasi kekeringan pada buah apel</p>
      <p className="text-center font-medium">Pilih menu di bawah ini untuk memulai</p>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Pengertian</h1>
          <p className="text-center">Pengertian atau definisi tentang aplikasi DryApple-Scan</p>
          <button type="button" className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 cursor-pointer">Pelajari Selengkapnya</button>
        </div>
        <div className="bg-white flex flex-col p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Scan</h1>
          <p className="text-center">Fitur utama untuk memindai gambar apel</p>
          <button className="bg-blue-500 self-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 cursor-pointer" type="button">Pelajari Selengkapnya</button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Tentang Kami</h1>
        <p className="text-center">Informasi tentang aplikasi DryApple-Scan dan tim pengembang</p>
      </div>
    </div>

  );
}