"use client";

import { useState, useRef, useCallback } from 'react';
import { ScanLine, Upload, FileImage, Loader2, RefreshCcw, Info } from 'lucide-react';
import { useLanguage } from '../../components/LanguageContext';

export default function ScanPage() {
  const { language } = useLanguage();
  
  // --- State Management ---
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [predictionResults, setPredictionResults] = useState<Record<string, number> | null>(null);
  const [conclusion, setConclusion] = useState<{ text: string, type: 'Kering' | 'Sedang' | 'Basah' | '' }>({ text: '', type: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false); // State baru untuk drag & drop

  // --- Refs ---
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  // Fungsi terpusat untuk memproses file yang dipilih
  const processImageFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
      setPredictionResults(null);
      setConclusion({ text: '', type: '' });
    } else {
      alert(language === 'id' ? 'Tipe file tidak valid. Silakan pilih file gambar.' : 'Invalid file type. Please select an image file.');
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedImage) {
      alert(language === 'id' ? 'Silakan pilih berkas gambar terlebih dahulu.' : 'Please select an image file first.');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    let kering = Math.random() * 100;
    let sedang = Math.random() * (100 - kering);
    let basah = 100 - kering - sedang;

    type Category = 'Kering' | 'Sedang' | 'Basah';
    const results: Record<Category, number> = {
      Kering: parseFloat(kering.toFixed(2)),
      Sedang: parseFloat(sedang.toFixed(2)),
      Basah: parseFloat(basah.toFixed(2))
    };

    setPredictionResults(results);
    setLoading(false);
    
    const maxCategory = (Object.keys(results) as Category[]).reduce((a, b) =>
      results[a] > results[b] ? a : b
    );
    const maxConfidence = results[maxCategory];
    setConclusion({
      text: language === 'id'
        ? `Gambar teridentifikasi sebagai <strong>${maxCategory}</strong> dengan keyakinan ${maxConfidence}%.`
        : `Image identified as <strong>${maxCategory === 'Kering' ? 'Dry' : maxCategory === 'Sedang' ? 'Medium' : 'Wet'}</strong> with confidence ${maxConfidence}%.`,
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

  // --- Drag and Drop Handlers ---
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  }, []); // dependensi kosong karena processImageFile sudah stabil

  // Styling dinamis untuk kotak kesimpulan
  const conclusionStyles = {
    Kering: 'bg-orange-50 border-orange-500 text-orange-800',
    Sedang: 'bg-green-50 border-green-500 text-green-800',
    Basah: 'bg-blue-50 border-blue-500 text-blue-800',
    '': 'bg-gray-50 border-gray-500 text-gray-800'
  };

  // --- Render Komponen ---
  return (
    <div className="bg-slate-50 min-h-full p-4 sm:p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Halaman */}
        <div className="flex flex-col sm:flex-row items-center border-b border-slate-200 pb-4 sm:pb-6 mb-6 sm:mb-8">
          <div className="bg-green-100 p-3 rounded-full mb-3 sm:mb-0">
            <ScanLine size={28} className="text-green-600" />
          </div>
          <div className="sm:ml-4 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
              {language === 'id' ? 'Identifikasi Gambar Apel' : 'Apple Image Identification'}
            </h1>
            <p className="text-sm sm:text-md text-slate-500 mt-1">
              {language === 'id' ? 'Unggah atau seret gambar untuk memulai analisis.' : 'Upload or drag an image to start analysis.'}
            </p>
          </div>
        </div>

        {/* Konten Utama */}
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
          {!imageUrl ? (
            // --- Tampilan Awal (Input & Drop Zone) ---
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`text-center flex flex-col items-center p-6 sm:p-10 rounded-lg border-2 border-dashed transition-colors duration-200 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50'}`}
            >
              <FileImage size={48} className={`transition-transform duration-200 ${isDragging ? 'scale-110' : ''} ${isDragging ? 'text-blue-500' : 'text-slate-300'}`} />
              <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mt-3 sm:mt-4">{language === 'id' ? 'Seret & Lepas Gambar di Sini' : 'Drag & Drop Image Here'}</h3>
              <p className="text-slate-500 mt-1 mb-4 sm:mb-6 text-sm sm:text-base">{language === 'id' ? 'atau klik untuk memilih file' : 'or click to select a file'}</p>
              <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-all shadow-sm text-sm sm:text-base"
              >
                <Upload size={18} />
                {language === 'id' ? 'Pilih File' : 'Choose File'}
              </button>
            </div>
          ) : (
            // --- Tampilan Pratinjau & Hasil ---
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
              {/* Kolom Kiri: Pratinjau Gambar */}
              <div className="w-full">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4">{language === 'id' ? 'Pratinjau Gambar' : 'Image Preview'}</h3>
                <div className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden border">
                  <img src={imageUrl} alt="Pratinjau Apel" className="w-full h-full object-cover" />
                  {loading && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white">
                      <Loader2 size={36} className="animate-spin" />
                      <p className="mt-3 font-semibold text-sm">{language === 'id' ? 'Menganalisis...' : 'Analyzing...'}</p>
                    </div>
                  )}
                </div>
                <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-4 flex-col sm:flex-row">
                    <form onSubmit={handleUpload} className="w-full">
                      <button
                        type="submit"
                        disabled={loading || !!predictionResults}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-4 rounded-lg hover:bg-green-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed shadow-sm text-sm sm:text-base"
                      >
                        {loading ? (language === 'id' ? 'Memproses...' : 'Processing...') : (language === 'id' ? '🚀 Identifikasi Sekarang' : '🚀 Identify Now')}
                      </button>
                    </form>
                    <button
                      onClick={handleReset}
                      title={language === 'id' ? 'Reset' : 'Reset'}
                      className="p-2 sm:p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm sm:text-base"
                    >
                      <RefreshCcw size={18} />
                    </button>
                </div>
              </div>

              {/* Kolom Kanan: Hasil Identifikasi */}
              <div className="w-full">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4">{language === 'id' ? 'Hasil Analisis' : 'Analysis Result'}</h3>
                <div className="bg-slate-50 p-4 sm:p-6 rounded-lg border min-h-[120px] sm:min-h-[200px]">
                  {!predictionResults && !loading && (
                      <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full">
                        <Info size={24} className="mb-2"/>
                        <p className="text-xs sm:text-base">{language === 'id' ? 'Hasil analisis akan ditampilkan di sini setelah gambar diidentifikasi.' : 'The analysis result will be displayed here after the image is identified.'}</p>
                      </div>
                  )}
                  {predictionResults && (
                    <div>
                      <ul className="mb-3 sm:mb-4">
                        {Object.entries(predictionResults).map(([key, value]) => (
                          <li key={key} className="flex justify-between py-1 text-sm sm:text-base">
                            <span className="font-semibold">{language === 'id' ? key : (key === 'Kering' ? 'Dry' : key === 'Sedang' ? 'Medium' : 'Wet')}</span>
                            <span>{value}%</span>
                          </li>
                        ))}
                      </ul>
                      <div className={`p-3 sm:p-4 rounded-lg border-2 font-semibold text-center text-xs sm:text-base ${conclusionStyles[conclusion.type]}`}
                        dangerouslySetInnerHTML={{ __html: language === 'id' ? conclusion.text : conclusion.type ? `Image identified as <strong>${conclusion.type === 'Kering' ? 'Dry' : conclusion.type === 'Sedang' ? 'Medium' : 'Wet'}</strong> with confidence ${predictionResults && predictionResults[conclusion.type] ? predictionResults[conclusion.type] : ''}%.` : '' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}