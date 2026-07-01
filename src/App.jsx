import { useState, useRef } from 'react';

export default function App() {
  // State Navigasi Scrollytelling
  const [activeSection, setActiveSection] = useState(0);

  // State Masing-masing Proses
  const [lambungDone, setLambungDone] = useState(false);
  const [enzymesAdded, setEnzymesAdded] = useState({ amilase: false, protease: false, lipase: false });
  const [nutrisiTerserap, setNutrisiTerserap] = useState(false);
  const [airTerserap, setAirTerserap] = useState(false);
  const [isFlushed, setIsFlushed] = useState(false);

  // Refs untuk Auto-Scroll
  const lambungRef = useRef(null);
  const enzimRef = useRef(null);
  const ususHalusRef = useRef(null);
  const ususBesarRef = useRef(null);
  const anusRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Pengecekan 3 Enzim
  const isAllEnzymesAdded = enzymesAdded.amilase && enzymesAdded.protease && enzymesAdded.lipase;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-rose-200">
      
      {/* HEADER PROGRESS BAR */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 p-4 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-center text-slate-700">
          🔬 Virtual Lab: Lambung hingga Anus
        </h1>
        <div className="w-full max-w-2xl mx-auto h-2 bg-slate-200 rounded-full mt-4 flex overflow-hidden">
          <div className={`h-full bg-rose-500 transition-all duration-700 ${activeSection >= 0 ? 'w-1/5' : 'w-0'}`}></div>
          <div className={`h-full bg-yellow-400 transition-all duration-700 ${activeSection >= 1 ? 'w-1/5' : 'w-0'}`}></div>
          <div className={`h-full bg-green-500 transition-all duration-700 ${activeSection >= 2 ? 'w-1/5' : 'w-0'}`}></div>
          <div className={`h-full bg-amber-700 transition-all duration-700 ${activeSection >= 3 ? 'w-1/5' : 'w-0'}`}></div>
          <div className={`h-full bg-slate-600 transition-all duration-700 ${activeSection >= 4 ? 'w-1/5' : 'w-0'}`}></div>
        </div>
      </header>

      <main className="pt-24 pb-32 flex flex-col items-center overflow-x-hidden">
        
        {/* ================= 1. LAMBUNG ================= */}
        <section ref={lambungRef} className="w-full max-w-2xl min-h-[80vh] flex flex-col items-center justify-center p-6 relative">
          <div className="bg-white w-full rounded-3xl shadow-xl p-8 border-t-8 border-rose-400 z-10">
            <h2 className="text-3xl font-bold text-rose-900 mb-2">1. Lambung</h2>
            <p className="text-slate-500 mb-8">Bolus makanan masuk! Berikan Asam Lambung (HCl) untuk melarutkannya menjadi bubur (Chyme).</p>

            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-56 border-x-[6px] border-b-[8px] border-white/80 bg-slate-100 rounded-b-[40px] rounded-t-xl overflow-hidden shadow-inner flex flex-col justify-end items-center">
                {/* Cairan Asam */}
                <div className={`absolute bottom-0 w-full transition-all duration-1000 ease-in-out bg-rose-200/80 ${lambungDone ? 'h-2/3' : 'h-0'}`}></div>
                
                {/* Makanan (Gambar Bolus Custom) */}
                <div className={`absolute bottom-6 transition-all duration-1000 z-10 w-24 h-24 flex items-center justify-center
                  ${lambungDone ? 'opacity-50 blur-[3px] scale-110 translate-y-6 brightness-75' : 'opacity-100 blur-0'}
                `}>
                  <img 
                    src="/images/roti-halus.png" 
                    alt="Bolus Makanan" 
                    className="w-full h-full object-contain drop-shadow-md"
                    // Fallback visual jika gambar tidak muat/ditemukan
                    onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} 
                  />
                  <span style={{ display: 'none' }} className="text-7xl">🧆</span>
                </div>
                
                {/* Gelembung */}
                {lambungDone && <div className="absolute inset-0 flex items-center justify-center text-4xl animate-ping text-rose-500 opacity-60">🫧</div>}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              {!lambungDone ? (
                <button onClick={() => setLambungDone(true)} className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all text-lg">
                  🧪 Tuang Asam Lambung
                </button>
              ) : (
                <button onClick={() => { setActiveSection(1); setTimeout(() => scrollTo(enzimRef), 100); }} className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all animate-bounce">
                  ⬇️ Lanjut ke Usus 12 Jari
                </button>
              )}
            </div>
          </div>
          {/* Pipa Penghubung */}
          <div className={`w-10 bg-yellow-200 absolute -bottom-16 transition-all duration-1000 ${activeSection >= 1 ? 'h-24 opacity-100' : 'h-0 opacity-0'}`}></div>
        </section>


        {/* ================= 2. USUS 12 JARI (3 ENZIM) ================= */}
        <section ref={enzimRef} className={`w-full max-w-2xl min-h-[80vh] flex flex-col items-center justify-center p-6 relative transition-opacity duration-1000 ${activeSection >= 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-white w-full rounded-3xl shadow-xl p-8 border-t-8 border-yellow-400 z-10">
            <h2 className="text-3xl font-bold text-yellow-800 mb-2">2. Kontribusi 3 Enzim (Pankreas)</h2>
            <p className="text-slate-500 mb-6">Chyme telah tiba. Tambahkan 3 enzim utama dengan botol penetes untuk memecah makanan!</p>

            <div className="relative w-full h-48 bg-yellow-50 rounded-2xl border-4 border-yellow-100 flex items-center justify-center overflow-hidden mb-8">
              {/* Partikel Nutrisi */}
              <div className={`transition-all duration-1000 ${isAllEnzymesAdded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} absolute inset-0 flex flex-wrap items-center justify-center gap-4 text-3xl z-10`}>
                <span className="animate-bounce text-blue-500">⚛️</span>
                <span className="animate-bounce delay-100 text-green-500">🧬</span>
                <span className="animate-bounce delay-200 text-yellow-500">✨</span>
                <span className="animate-bounce delay-300 text-blue-500">⚛️</span>
              </div>
              
              {/* Chyme awal (Bolus terurai) */}
              <div className={`w-28 h-28 transition-all duration-1000 ${isAllEnzymesAdded ? 'opacity-0 scale-150 blur-xl' : 'opacity-80 scale-100 blur-[2px] brightness-75'}`}>
                 <img src="/images/roti-halus.png" alt="Chyme" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* TOMBOL BOTOL ENZIM */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              
              {/* Botol Cuka (Amilase) */}
              <button onClick={() => setEnzymesAdded({...enzymesAdded, amilase: true})} disabled={enzymesAdded.amilase} className={`p-4 flex flex-col items-center justify-center border-2 font-bold rounded-2xl transition-all ${enzymesAdded.amilase ? 'bg-green-100 border-green-500 text-green-800' : 'bg-white border-slate-200 hover:border-yellow-400 active:scale-95'}`}>
                <div className="relative w-12 h-16 mb-2">
                  <img src="/images/botol.png" alt="Botol Cuka" className="w-full h-full object-contain absolute inset-0 z-10" />
                  {/* Overlay Warna Cuka (Kuning bening) */}
                  <div className="absolute inset-0 bg-yellow-200/80 mix-blend-multiply z-20 rounded-lg"></div>
                </div>
                <span>Amilase (Cuka)</span>
                <span className="text-xs font-normal text-slate-400">Pecah Karbohidrat</span>
              </button>

              {/* Botol Putih Telur (Protease) */}
              <button onClick={() => setEnzymesAdded({...enzymesAdded, protease: true})} disabled={enzymesAdded.protease} className={`p-4 flex flex-col items-center justify-center border-2 font-bold rounded-2xl transition-all ${enzymesAdded.protease ? 'bg-green-100 border-green-500 text-green-800' : 'bg-white border-slate-200 hover:border-slate-400 active:scale-95'}`}>
                <div className="relative w-12 h-16 mb-2">
                  <img src="/images/botol.png" alt="Botol Putih Telur" className="w-full h-full object-contain absolute inset-0 z-10 filter grayscale brightness-110" />
                  {/* Overlay Warna Putih Telur (Putih keruh) */}
                  <div className="absolute inset-0 bg-slate-100/90 mix-blend-color z-20 rounded-lg"></div>
                </div>
                <span>Protease (Putih Telur)</span>
                <span className="text-xs font-normal text-slate-400">Pecah Protein</span>
              </button>

              {/* Botol Minyak (Lipase) */}
              <button onClick={() => setEnzymesAdded({...enzymesAdded, lipase: true})} disabled={enzymesAdded.lipase} className={`p-4 flex flex-col items-center justify-center border-2 font-bold rounded-2xl transition-all ${enzymesAdded.lipase ? 'bg-green-100 border-green-500 text-green-800' : 'bg-white border-slate-200 hover:border-amber-400 active:scale-95'}`}>
                <div className="relative w-12 h-16 mb-2">
                  <img src="/images/botol.png" alt="Botol Minyak" className="w-full h-full object-contain absolute inset-0 z-10" />
                  {/* Overlay Warna Minyak (Kuning emas pekat) */}
                  <div className="absolute inset-0 bg-amber-400/90 mix-blend-color z-20 rounded-lg"></div>
                </div>
                <span>Lipase (Minyak)</span>
                <span className="text-xs font-normal text-slate-400">Pecah Lemak</span>
              </button>
            </div>

            {isAllEnzymesAdded && (
              <div className="flex justify-center mt-6 animate-fade-in-up">
                <button onClick={() => { setActiveSection(2); setTimeout(() => scrollTo(ususHalusRef), 100); }} className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all animate-bounce">
                  ⬇️ Makanan Siap Diserap
                </button>
              </div>
            )}
          </div>
          <div className={`w-10 bg-green-200 absolute -bottom-16 transition-all duration-1000 ${activeSection >= 2 ? 'h-24 opacity-100' : 'h-0 opacity-0'}`}></div>
        </section>


        {/* ================= 3. USUS HALUS ================= */}
        <section ref={ususHalusRef} className={`w-full max-w-2xl min-h-[80vh] flex flex-col items-center justify-center p-6 relative transition-opacity duration-1000 ${activeSection >= 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-white w-full rounded-3xl shadow-xl p-8 border-t-8 border-green-400 z-10">
            <h2 className="text-3xl font-bold text-green-900 mb-2">3. Usus Halus</h2>
            <p className="text-slate-500 mb-8">Gunakan dinding usus (Vili) layaknya spons untuk menyerap semua partikel nutrisi ke dalam darah!</p>

            <div className="relative w-full h-56 bg-green-50 rounded-2xl border-4 border-green-200 overflow-hidden mb-8 shadow-inner flex flex-col justify-between">
              
              {/* Partikel Nutrisi */}
              <div className={`flex justify-center items-start gap-6 text-4xl p-6 transition-all duration-[1500ms] z-10
                ${nutrisiTerserap ? 'opacity-0 translate-y-24 scale-50' : 'opacity-100 translate-y-0 scale-100'}
              `}>
                <span>⚛️</span><span>🧬</span><span>✨</span><span>⚛️</span>
              </div>
              
              {/* KOMPONEN SPONS (Visualisasi Vili Usus) */}
              <div className={`w-full bg-yellow-400 border-t-4 border-yellow-500 shadow-[0_-4px_15px_rgba(0,0,0,0.1)] transition-all duration-1000 flex flex-wrap gap-2 p-3 justify-center items-center overflow-hidden z-20 ${nutrisiTerserap ? 'h-32 bg-yellow-500' : 'h-16'}`}>
                {/* Pori-pori spons yang digenerate */}
                {[...Array(24)].map((_, i) => (
                  <div key={i} className={`rounded-full bg-yellow-600/40 shadow-inner transition-all duration-500 ${nutrisiTerserap ? 'w-4 h-4 bg-yellow-700/50' : 'w-3 h-3'}`}></div>
                ))}
              </div>

              {/* Sisa cairan keruh ampas (di belakang spons) */}
              <div className={`absolute bottom-0 w-full bg-amber-900/30 transition-all duration-1000 ${nutrisiTerserap ? 'h-32 blur-md' : 'h-10 blur-none'}`}></div>
            </div>

            <div className="flex flex-col items-center gap-4">
              {!nutrisiTerserap ? (
                <button onClick={() => setNutrisiTerserap(true)} className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all text-lg flex gap-2">
                  🧽 Serap Nutrisi ke Dalam Spons
                </button>
              ) : (
                <button onClick={() => { setActiveSection(3); setTimeout(() => scrollTo(ususBesarRef), 100); }} className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all animate-bounce">
                  ⬇️ Kirim Ampas ke Usus Besar
                </button>
              )}
            </div>
          </div>
          <div className={`w-10 bg-amber-800 absolute -bottom-16 transition-all duration-1000 ${activeSection >= 3 ? 'h-24 opacity-100' : 'h-0 opacity-0'}`}></div>
        </section>


        {/* ================= 4. USUS BESAR ================= */}
        <section ref={ususBesarRef} className={`w-full max-w-2xl min-h-[80vh] flex flex-col items-center justify-center p-6 relative transition-opacity duration-1000 ${activeSection >= 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-white w-full rounded-3xl shadow-xl p-8 border-t-8 border-amber-700 z-10">
            <h2 className="text-3xl font-bold text-amber-900 mb-2">4. Usus Besar (Kolon)</h2>
            <p className="text-slate-500 mb-8">Yang tersisa hanya ampas makanan cair. Usap dengan tisu (dinding usus besar) untuk menyerap sisa air dan memadatkan feses!</p>

            <div className="relative w-full h-56 bg-amber-50 rounded-2xl border-4 border-amber-200 flex items-end justify-center overflow-hidden mb-8">
              
              {/* KOMPONEN TISU */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 bg-white/95 rounded-b-md shadow-lg border border-slate-200 border-t-0 flex flex-col items-center z-30 transition-all duration-[2000ms] ease-in-out
                ${airTerserap ? 'h-full w-full opacity-0' : 'h-12 w-32 opacity-100'}
              `}>
                {/* Tekstur Tisu dan garis sobek */}
                <div className="w-full h-full relative overflow-hidden flex flex-col justify-end p-2">
                   <div className="w-full border-b-[3px] border-dotted border-slate-300/60 mb-1"></div>
                   <div className="w-full border-b-[3px] border-dotted border-slate-300/60"></div>
                </div>
              </div>

              {/* Cairan Air */}
              <div className={`absolute bottom-0 w-full bg-blue-300/70 transition-all duration-[2000ms] ease-in-out z-20 flex items-end justify-center pb-4
                ${airTerserap ? 'h-0 opacity-0' : 'h-3/4 opacity-100'}
              `}>
                 <div className="animate-pulse text-blue-100 text-5xl">💧💧</div>
              </div>

              {/* Feses Padat */}
              <div className={`text-7xl transition-all duration-[2000ms] drop-shadow-xl z-10 mb-8
                ${airTerserap ? 'scale-125 opacity-100' : 'scale-50 opacity-20 blur-sm'}
              `}>
                💩
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              {!airTerserap ? (
                <button onClick={() => setAirTerserap(true)} className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all text-lg flex gap-2">
                  🧻 Turunkan Tisu & Serap Air
                </button>
              ) : (
                <button onClick={() => { setActiveSection(4); setTimeout(() => scrollTo(anusRef), 100); }} className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all animate-bounce">
                  ⬇️ Menuju Garis Akhir (Rektum/Anus)
                </button>
              )}
            </div>
          </div>
          <div className={`w-10 bg-slate-300 absolute -bottom-16 transition-all duration-1000 ${activeSection >= 4 ? 'h-24 opacity-100' : 'h-0 opacity-0'}`}></div>
        </section>


        {/* ================= 5. ANUS (Defekasi) ================= */}
        <section ref={anusRef} className={`w-full max-w-2xl min-h-[80vh] flex flex-col items-center justify-center p-6 transition-opacity duration-1000 ${activeSection >= 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-white w-full rounded-3xl shadow-xl p-8 border-t-8 border-slate-700">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">5. Anus</h2>
            <p className="text-slate-500 mb-8">Feses telah menumpuk. Saraf mengirimkan sinyal ke otak untuk segera dikeluarkan dari tubuh!</p>

            <div className="relative w-full h-56 bg-slate-100 rounded-b-[60px] border-4 border-slate-300 flex flex-col justify-start items-center overflow-hidden mb-8 shadow-[inset_0_-20px_20px_rgba(0,0,0,0.1)]">
              {/* Feses jatuh */}
              <div className={`text-8xl transition-all duration-[1500ms] ease-in z-10
                ${isFlushed ? 'translate-y-64 scale-50 opacity-0' : 'translate-y-8 scale-110 opacity-100'}
              `}>
                💩
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              {!isFlushed ? (
                <button onClick={() => setIsFlushed(true)} className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg active:scale-95 transition-all text-xl flex gap-2">
                  🚽 Keluarkan (Defekasi)
                </button>
              ) : (
                <div className="bg-green-100 border border-green-400 text-green-700 px-8 py-6 rounded-2xl text-center animate-fade-in-up w-full">
                  <span className="text-5xl block mb-4">🎉</span>
                  <h3 className="font-bold text-2xl mb-2">Perjalanan Selesai!</h3>
                  <p>Nutrisi makanan berhasil diserap tubuh untuk energi, dan sisa racun/ampas telah dibuang.</p>
                  <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors">
                    🔄 Mulai dari Awal
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

      </main>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}