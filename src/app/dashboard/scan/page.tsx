"use client";

import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { ScanLine, Upload, Camera, FileImage, Loader2, X, RefreshCcw, Info } from 'lucide-react';

export default function ScanPage() {
  // --- State Management (Sama seperti sebelumnya) ---
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [predictionResults, setPredictionResults] = useState<Record<string, number> | null>(null);
  const [conclusion, setConclusion] = useState<{ text: string, type: 'Kering' | 'Sedang' | 'Basah' | '' }>({ text: '', type: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);

  // --- Refs (Sama seperti sebelumnya) ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  // --- Handlers (dengan sedikit penyesuaian pada kesimpulan) ---
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
      setPredictionResults(null);
      setConclusion({ text: '', type: '' });
    }
  };

const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedImage) {
      alert('Silakan pilih berkas gambar terlebih dahulu.');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulasi proses API
    
    const kering = Math.random() * 100;
    const sedang = Math.random() * (100 - kering);
    const basah = 100 - kering - sedang;

    // Definisikan tipe untuk kategori agar lebih aman
    type Category = 'Kering' | 'Sedang' | 'Basah';
    
    const results: Record<Category, number> = { 
      Kering: parseFloat(kering.toFixed(2)), 
      Sedang: parseFloat(sedang.toFixed(2)), 
      Basah: parseFloat(basah.toFixed(2)) 
    };
    
    setPredictionResults(results);
    setLoading(false);

    // FIX: Beritahu TypeScript bahwa `Object.keys` menghasilkan array of Category
    const maxCategory = (Object.keys(results) as Category[]).reduce((a, b) => 
      results[a] > results[b] ? a : b
    );
    
    const maxConfidence = results[maxCategory];
    
    setConclusion({
      text: `Gambar teridentifikasi sebagai <strong>${maxCategory}</strong> dengan keyakinan ${maxConfidence}%.`,
      type: maxCategory
    });
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImageUrl('');
    setPredictionResults(null);
    setConclusion({ text: '', type: '' });
    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // --- Fungsi Kamera (Sama seperti sebelumnya) ---
  function dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(','), mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error('Invalid data URL');
    const mime = mimeMatch[1], bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) { u8arr[n] = bstr.charCodeAt(n); }
    return new File([u8arr], filename, { type: mime });
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const file = dataURLtoFile(imageSrc, 'webcam-capture.jpeg');
      setSelectedImage(file);
      setImageUrl(imageSrc);
      setPredictionResults(null);
      setConclusion({ text: '', type: '' });
      setShowCamera(false);
    }
  }, [webcamRef]);

  // Styling dinamis untuk kotak kesimpulan
  const conclusionStyles = {
    Kering: 'bg-orange-50 border-orange-500 text-orange-800',
    Sedang: 'bg-green-50 border-green-500 text-green-800',
    Basah: 'bg-blue-50 border-blue-500 text-blue-800',
    '': 'bg-gray-50 border-gray-500 text-gray-800'
  };

  // --- Render Komponen ---
  return (
    <>
      <div className="bg-slate-50 min-h-full p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Halaman */}
          <div className="flex items-center border-b border-slate-200 pb-6 mb-8">
            <div className="bg-green-100 p-3 rounded-full">
              <ScanLine size={32} className="text-green-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-slate-800">
                Identifikasi Gambar Apel
              </h1>
              <p className="text-md text-slate-500 mt-1">
                Unggah gambar atau gunakan kamera untuk memulai analisis.
              </p>
            </div>
          </div>

          {/* Konten Utama */}
          <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
            {!imageUrl ? (
              // --- Tampilan Awal (Input) ---
              <div className="text-center flex flex-col items-center">
                <FileImage size={64} className="text-slate-300 mb-4" />
                <h3 className="text-xl font-semibold text-slate-700">Pilih Sumber Gambar</h3>
                <p className="text-slate-500 mt-1 mb-6">Pilih dari galeri Anda atau ambil foto baru.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                  >
                    <Upload size={20} />
                    Unggah File
                  </button>
                  <button
                    onClick={() => setShowCamera(true)}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-800 transition-all shadow-sm"
                  >
                    <Camera size={20} />
                    Gunakan Kamera
                  </button>
                </div>
              </div>
            ) : (
              // --- Tampilan Pratinjau & Hasil ---
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Kolom Kiri: Pratinjau Gambar */}
                <div className="w-full">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Pratinjau Gambar</h3>
                  <div className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden border">
                    <img src={imageUrl} alt="Pratinjau Apel" className="w-full h-full object-cover" />
                    {loading && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white">
                        <Loader2 size={48} className="animate-spin" />
                        <p className="mt-4 font-semibold">Menganalisis...</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex gap-4">
                     <form onSubmit={handleUpload} className="w-full">
                       <button
                         type="submit"
                         disabled={loading || !!predictionResults}
                         className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed shadow-sm"
                       >
                         {loading ? 'Memproses...' : '🚀 Identifikasi Sekarang'}
                       </button>
                     </form>
                     <button
                        onClick={handleReset}
                        title="Reset"
                        className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      >
                        <RefreshCcw size={20} />
                      </button>
                  </div>
                </div>

                {/* Kolom Kanan: Hasil Identifikasi */}
                <div className="w-full">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Hasil Analisis</h3>
                  <div className="bg-slate-50 p-6 rounded-lg border min-h-[200px]">
                    {!predictionResults && !loading && (
                       <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full">
                         <Info size={32} className="mb-2"/>
                         <p>Hasil analisis akan ditampilkan di sini setelah gambar diidentifikasi.</p>
                       </div>
                    )}
                    {predictionResults && (
                      <div className="space-y-4">
                        <div>
                          {Object.entries(predictionResults).map(([key, value]) => (
                            <div key={key} className="mb-3">
                              <div className="flex justify-between items-center mb-1 text-sm">
                                <span className="font-semibold text-slate-700">{key}</span>
                                <span className="text-slate-500">{value}%</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div className={`${conclusionStyles[key as 'Kering' | 'Sedang' | 'Basah'].split(' ')[0]} h-2.5 rounded-full`} style={{ width: `${value}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className={`p-4 rounded-lg border-l-4 text-sm font-semibold ${conclusionStyles[conclusion.type]}`}
                             dangerouslySetInnerHTML={{ __html: conclusion.text }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* --- Modal Kamera --- */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-4 rounded-xl shadow-2xl flex flex-col items-center w-full max-w-lg">
            <div className="w-full flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-slate-800">Ambil Foto</h3>
              <button onClick={() => setShowCamera(false)} className="p-2 rounded-full hover:bg-slate-100">
                <X size={24} className="text-slate-600"/>
              </button>
            </div>
            <div className="w-full aspect-video rounded-md overflow-hidden bg-black">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                height={720}
                videoConstraints={{ facingMode: "environment", aspectRatio: 16/9 }}
                className="w-full h-full"
              />
            </div>
            <button
              onClick={capture}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition shadow-sm"
            >
              <Camera size={20} />
              Ambil Gambar
            </button>
          </div>
        </div>
      )}
    </>
  );
}