import { redirect } from 'next/navigation';

export default function Home() {
  // Arahkan langsung ke halaman home di dalam dasbor
  redirect('/dashboard/home');
  
  // Return null atau loading component karena redirect akan terjadi di server
  return null;
}