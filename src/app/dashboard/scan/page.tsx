"use client";

import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam'; // Import Webcam

export default function ScanPage() {
  // --- State Management ---
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [predictionResults, setPredictionResults] = useState<{ kering: number; sedang: number; basah: number } | null>(null);
  const [conclusion, setConclusion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false); // State untuk menampilkan/menyembunyikan kamera

  // --- Refs ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null); // Ref untuk komponen Webcam

  // --- Handlers ---
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
      setPredictionResults(null);
      setConclusion('');
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedImage) {
      alert('Silakan pilih berkas gambar terlebih dahulu.');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const kering = Math.random() * 100;
    const sedang = Math.random() * (100 - kering);
    const basah = 100 - kering - sedang;
    const results = { kering: parseFloat(kering.toFixed(2)), sedang: parseFloat(sedang.toFixed(2)), basah: parseFloat(basah.toFixed(2)) };
    setPredictionResults(results);
    setLoading(false);
    let kesimpulan = '';
    if (results.kering > results.sedang && results.kering > results.basah) {
      kesimpulan = `Gambar tersebut teridentifikasi sebagai **Kering** (${results.kering}%).`;
    } else if (results.sedang > results.kering && results.sedang > results.basah) {
      kesimpulan = `Gambar tersebut teridentifikasi sebagai **Sedang** (${results.sedang}%).`;
    } else {
      kesimpulan = `Gambar tersebut teridentifikasi sebagai **Basah** (${results.basah}%).`;
    }
    setConclusion(kesimpulan);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImageUrl('');
    setPredictionResults(null);
    setConclusion('');
    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // --- Fungsi Kamera Baru ---

  /**
   * Mengonversi data URL (base64) dari screenshot kamera menjadi objek File.
   */
  function dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error('Invalid data URL');
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  /**
   * Mengambil gambar dari webcam.
   */
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const file = dataURLtoFile(imageSrc, 'webcam-capture.jpeg');
      setSelectedImage(file);
      setImageUrl(imageSrc);
      setPredictionResults(null);
      setConclusion('');
      setShowCamera(false); // Tutup kamera setelah gambar diambil
    }
  }, [webcamRef]);

  // --- Render Komponen ---
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Masukkan Gambar</h2>
            <form onSubmit={handleUpload}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <label htmlFor="file-upload" className="font-semibold whitespace-nowrap">
                  Unggah Berkas
                </label>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100 cursor-pointer"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
                disabled={loading || !selectedImage}
              >
                {loading ? 'Mengidentifikasi...' : 'Identifikasi Gambar'}
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Hasil Identifikasi</h2>
            <div className="min-h-[200px] flex flex-col justify-center items-center bg-gray-100 rounded-lg p-4">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Pratinjau Apel"
                  className="max-w-full h-auto max-h-60 rounded-lg object-contain"
                />
              ) : (
                <p className="text-gray-500">Pratinjau gambar akan muncul di sini</p>
              )}
            </div>
            <div className="mt-4">
              {loading && <p className="text-gray-500 italic">Sedang memproses...</p>}
              {predictionResults && !loading && (
                <>
                  <div className="space-y-1">
                      <p className="text-sm">Kering: <span className="font-semibold">{predictionResults.kering}%</span></p>
                      <p className="text-sm">Sedang: <span className="font-semibold">{predictionResults.sedang}%</span></p>
                      <p className="text-sm">Basah: <span className="font-semibold">{predictionResults.basah}%</span></p>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                      <p className="font-semibold text-blue-800" dangerouslySetInnerHTML={{ __html: conclusion }} />
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full mt-4 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Reset
                  </button>
                </>
              )}
              {!predictionResults && !loading && (
                <p className="text-gray-500">Hasil identifikasi akan muncul di sini.</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Ambil Gambar dengan Kamera</h2>
            <button
              onClick={() => setShowCamera(true)} // Mengubah state untuk menampilkan kamera
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Buka Kamera
            </button>
          </div>
        </div>
      </div>

      {/* --- Overlay/Modal untuk Kamera --- */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl flex flex-col items-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={500}
              videoConstraints={{ facingMode: "environment" }} // Prioritaskan kamera belakang
              className="rounded-md"
            />
            <div className="flex justify-between w-full mt-4">
              <button
                onClick={capture}
                className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition"
              >
                Ambil Gambar
              </button>
              <button
                onClick={() => setShowCamera(false)}
                className="bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-700 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}