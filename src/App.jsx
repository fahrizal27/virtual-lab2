import { useState, useRef } from 'react';

export default function App() {
  // State Navigasi Scrollytelling
  const [activeSection, setActiveSection] = useState(0);

  // State Utama Proses
  const [lambungDone, setLambungDone] = useState(false);
  const [enzymesAdded, setEnzymesAdded] = useState({ amilase: false, protease: false, lipase: false });
  const [nutrisiTerserap, setNutrisiTerserap] = useState(false);
  const [airTerserap, setAirTerserap] = useState(false);
  const [isFlushed, setIsFlushed] = useState(false);

  // State Gamifikasi (Interaksi)
  const [acidLevel, setAcidLevel] = useState(0);
  const [absorbProgress, setAbsorbProgress] = useState(0);
  const [tissuePosition, setTissuePosition] = useState(0);
  const [pressure, setPressure] = useState(0);

  // Refs
  const lambungRef = useRef(null);
  const enzimRef = useRef(null);
  const ususHalusRef = useRef(null);
  const ususBesarRef = useRef(null);
  const anusRef = useRef(null);
  const pourIntervalRef = useRef(null);

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
        
        {/* ================= 1. LAMBUNG (Hold to Pour) ================= */}
        <section ref={lambungRef} className="w-full max-w-2xl min-h-[80vh] flex flex-col items-center justify-center p-6 relative">
          <div className="bg-white w-full rounded-3xl shadow-xl p-8 border-t-8 border-rose-400 z-10 text-center">
            <h2 className="text-3xl font-bold text-rose-900 mb-2">1. Lambung</h2>
            <p className="text-slate-500 mb-8">
              {lambungDone ? "Makanan hancur menjadi Chyme!" : "Tahan tombol untuk menuangkan Asam Lambung (HCl)!"}
            </p>

            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-56 border-x-[6px] border-b-[8px] border-white/80 bg-slate-100 rounded-b-[40px] rounded-t-xl overflow-hidden shadow-inner flex flex-col justify-end items-center">
                {/* Cairan Asam */}
                <div 
                  className="absolute bottom-0 w-full transition-all ease-linear bg-rose-200/80" 
                  style={{ height: `${acidLevel}%` }}>
                </div>
                
                {/* Makanan */}
                <div className={`absolute bottom-6 transition-all duration-1000 z-10 w-24 h-24 flex items-center justify-center
                  ${acidLevel > 80 ? 'opacity-50 blur-[3px] scale-110 translate-y-6 brightness-75' : 'opacity-100 blur-0'}
                `}>
                  <img 
                    src="/images/roti-halus.png" 
                    alt="Bolus" 
                    className="w-full h-full object-contain drop-shadow-md"
                    onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} 
                  />
                  <span style={{ display: 'none' }} className="text-7xl">🧆</span>
                </div>
                
                {/* Gelembung */}
                {acidLevel > 0 && <div className="absolute inset-0 flex items-center justify-center text-4xl animate-ping text-rose-500 opacity-60">🫧</div>}
              </div>
            </div>

            {/* ... kode lambung lainnya ... */}

<div className="flex flex-col items-center gap-4">
  {!lambungDone ? (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-xs bg-slate-200 rounded-full h-4 mb-4 overflow-hidden">
         <div className="bg-rose-500 h-4 transition-all duration-75" style={{ width: `${acidLevel}%` }}></div>
      </div>
      <button 
        onMouseDown={() => {
          if (pourIntervalRef.current) return;
          pourIntervalRef.current = setInterval(() => {
            setAcidLevel(prev => {
              if (prev >= 100) {
                clearInterval(pourIntervalRef.current);
                pourIntervalRef.current = null; // Kunci perbaikan: Reset ref
                setLambungDone(true);
                return 100;
              }
              return prev + 2; 
            });
          }, 50);
        }}
        onMouseUp={() => {
          clearInterval(pourIntervalRef.current);
          pourIntervalRef.current = null; // Kunci perbaikan: Reset ref
        }}
        onMouseLeave={() => {
          clearInterval(pourIntervalRef.current);
          pourIntervalRef.current = null; // Kunci perbaikan: Reset ref
        }}
        onTouchStart={() => {
          if (pourIntervalRef.current) return;
          pourIntervalRef.current = setInterval(() => {
            setAcidLevel(prev => {
              if (prev >= 100) {
                clearInterval(pourIntervalRef.current);
                pourIntervalRef.current = null; // Kunci perbaikan: Reset ref
                setLambungDone(true);
                return 100;
              }
              return prev + 2;
            });
          }, 50);
        }}
        onTouchEnd={() => {
          clearInterval(pourIntervalRef.current);
          pourIntervalRef.current = null; // Kunci perbaikan: Reset ref
        }}
        onTouchCancel={() => {
          clearInterval(pourIntervalRef.current);
          pourIntervalRef.current = null;
        }}
        className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all text-lg select-none cursor-pointer"
      >
        🧪 Tahan Untuk Tuang
      </button>
    </div>
  ) : (
    <button onClick={() => { setActiveSection(1); setTimeout(() => scrollTo(enzimRef), 100); }} className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all animate-bounce">
      ⬇️ Lanjut ke Usus 12 Jari
    </button>
  )}
</div>

{/* ... sisa kode lambung ... */}
          </div>
          <div className={`w-10 bg-yellow-200 absolute -bottom-16 transition-all duration-1000 ${activeSection >= 1 ? 'h-24 opacity-100' : 'h-0 opacity-0'}`}></div>
        </section>


        {/* ================= 2. USUS 12 JARI ================= */}
        <section ref={enzimRef} className={`w-full max-w-2xl min-h-[80vh] flex flex-col items-center justify-center p-6 relative transition-opacity duration-1000 ${activeSection >= 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-white w-full rounded-3xl shadow-xl p-8 border-t-8 border-yellow-400 z-10 text-center">
            <h2 className="text-3xl font-bold text-yellow-800 mb-2">2. Kontribusi 3 Enzim</h2>
            <p className="text-slate-500 mb-6">Tambahkan 3 enzim utama dengan mengklik botol penetes untuk memecah makanan!</p>

            <div className="relative w-full h-48 bg-yellow-50 rounded-2xl border-4 border-yellow-100 flex items-center justify-center overflow-hidden mb-8">
              {/* Partikel Nutrisi */}
              <div className={`transition-all duration-1000 ${isAllEnzymesAdded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} absolute inset-0 flex flex-wrap items-center justify-center gap-4 text-3xl z-10`}>
                <span className="animate-bounce text-blue-500">⚛️</span>
                <span className="animate-bounce delay-100 text-green-500">🧬</span>
                <span className="animate-bounce delay-200 text-yellow-500">✨</span>
                <span className="animate-bounce delay-300 text-blue-500">⚛️</span>
              </div>
              
              {/* Chyme awal */}
              <div className={`w-28 h-28 transition-all duration-1000 ${isAllEnzymesAdded ? 'opacity-0 scale-150 blur-xl' : 'opacity-80 scale-100 blur-[2px] brightness-75'}`}>
                 <img src="/images/roti-halus.png" alt="Chyme" className="w-full h-full object-contain" 
                      onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}/>
                 <span style={{ display: 'none' }} className="text-7xl">🧆</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button onClick={() => setEnzymesAdded({...enzymesAdded, amilase: true})} disabled={enzymesAdded.amilase} className={`p-4 flex flex-col items-center justify-center border-2 font-bold rounded-2xl transition-all ${enzymesAdded.amilase ? 'bg-green-100 border-green-500 text-green-800 scale-95' : 'bg-white border-slate-200 hover:border-yellow-400 active:scale-95'}`}>
                <span>Amilase</span>
                <span className="text-xs font-normal text-slate-400">Pecah Karbohidrat</span>
              </button>

              <button onClick={() => setEnzymesAdded({...enzymesAdded, protease: true})} disabled={enzymesAdded.protease} className={`p-4 flex flex-col items-center justify-center border-2 font-bold rounded-2xl transition-all ${enzymesAdded.protease ? 'bg-green-100 border-green-500 text-green-800 scale-95' : 'bg-white border-slate-200 hover:border-slate-400 active:scale-95'}`}>
                <span>Protease</span>
                <span className="text-xs font-normal text-slate-400">Pecah Protein</span>
              </button>

              <button onClick={() => setEnzymesAdded({...enzymesAdded, lipase: true})} disabled={enzymesAdded.lipase} className={`p-4 flex flex-col items-center justify-center border-2 font-bold rounded-2xl transition-all ${enzymesAdded.lipase ? 'bg-green-100 border-green-500 text-green-800 scale-95' : 'bg-white border-slate-200 hover:border-amber-400 active:scale-95'}`}>
                <span>Lipase</span>
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


        {/* ================= 3. USUS HALUS (Scrub to Absorb) ================= */}
        <section ref={ususHalusRef} className={`w-full max-w-2xl min-h-[80vh] flex flex-col items-center justify-center p-6 relative transition-opacity duration-1000 ${activeSection >= 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-white w-full rounded-3xl shadow-xl p-8 border-t-8 border-green-400 z-10 text-center">
            <h2 className="text-3xl font-bold text-green-900 mb-2">3. Usus Halus</h2>
            <p className="text-slate-500 mb-8">Gesek/usap berulang kali pada area spons (vili) untuk menyerap semua partikel nutrisi ke dalam darah!</p>

            <div className="relative w-full h-56 bg-green-50 rounded-2xl border-4 border-green-200 overflow-hidden mb-8 shadow-inner flex flex-col justify-between">
              {/* Partikel Nutrisi */}
              <div className={`flex justify-center items-start gap-6 text-4xl p-6 transition-all duration-[1500ms] z-10
                ${nutrisiTerserap ? 'opacity-0 translate-y-24 scale-50' : 'opacity-100 translate-y-0 scale-100'}
              `}>
                <span>⚛️</span><span>🧬</span><span>✨</span><span>⚛️</span>
              </div>
              
              {/* Visualisasi Vili Usus */}
              <div className={`w-full bg-yellow-400 border-t-4 border-yellow-500 shadow-[0_-4px_15px_rgba(0,0,0,0.1)] transition-all duration-1000 flex flex-wrap gap-2 p-3 justify-center items-center overflow-hidden z-20 ${nutrisiTerserap ? 'h-32 bg-yellow-500' : 'h-16'}`}>
                {[...Array(24)].map((_, i) => (
                  <div key={i} className={`rounded-full bg-yellow-600/40 shadow-inner transition-all duration-500 ${nutrisiTerserap ? 'w-4 h-4 bg-yellow-700/50' : 'w-3 h-3'}`}></div>
                ))}
              </div>

              {/* Sisa cairan ampas */}
              <div className={`absolute bottom-0 w-full bg-amber-900/30 transition-all duration-1000 ${nutrisiTerserap ? 'h-32 blur-md' : 'h-10 blur-none'}`}></div>
            </div>

            <div className="flex flex-col items-center gap-4 w-full">
              {!nutrisiTerserap ? (
                <div className="w-full flex flex-col items-center">
                  <p className="text-sm font-bold text-green-600 mb-2 animate-pulse">
                    👈 Usap (Gesek) area ini berulang kali! 👉
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full max-w-xs bg-slate-200 rounded-full h-4 mb-4 overflow-hidden">
                     <div className="bg-green-500 h-4 transition-all" style={{ width: `${absorbProgress}%` }}></div>
                  </div>

                  {/* Scrub Zone */}
                  <div 
                    onMouseMove={() => {
                      setAbsorbProgress(prev => {
                        if (prev >= 100) {
                          setNutrisiTerserap(true);
                          return 100;
                        }
                        return prev + 1.5; 
                      });
                    }}
                    onTouchMove={() => {
                      setAbsorbProgress(prev => {
                        if (prev >= 100) {
                          setNutrisiTerserap(true);
                          return 100;
                        }
                        return prev + 2; 
                      });
                    }}
                    className="w-full h-24 bg-yellow-300 border-4 border-dashed border-yellow-500 rounded-xl cursor-crosshair flex items-center justify-center shadow-inner"
                  >
                    <span className="text-slate-500 font-bold opacity-70">Area Spons (Vili)</span>
                  </div>
                </div>
              ) : (
                <button onClick={() => { setActiveSection(3); setTimeout(() => scrollTo(ususBesarRef), 100); }} className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all animate-bounce mt-4">
                  ⬇️ Kirim Ampas ke Usus Besar
                </button>
              )}
            </div>
          </div>
          <div className={`w-10 bg-amber-800 absolute -bottom-16 transition-all duration-1000 ${activeSection >= 3 ? 'h-24 opacity-100' : 'h-0 opacity-0'}`}></div>
        </section>


        {/* ================= 4. USUS BESAR (Pull to Squeeze) ================= */}
        <section ref={ususBesarRef} className={`w-full max-w-2xl min-h-[80vh] flex flex-col items-center justify-center p-6 relative transition-opacity duration-1000 ${activeSection >= 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-white w-full rounded-3xl shadow-xl p-8 border-t-8 border-amber-700 z-10 text-center">
            <h2 className="text-3xl font-bold text-amber-900 mb-2">4. Usus Besar</h2>
            <p className="text-slate-500 mb-8">Geser slider ke bawah untuk menarik tisu dan menyerap sisa air hingga menjadi feses padat!</p>

            <div className="relative w-full h-64 bg-amber-50 rounded-2xl border-4 border-amber-200 flex items-end justify-center overflow-hidden mb-8">
              
              {/* Tisu turun berdasarkan slider */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/95 rounded-b-md shadow-lg border border-slate-200 border-t-0 flex flex-col items-center z-30 transition-all ease-out w-full"
                   style={{ height: `${airTerserap ? 100 : tissuePosition}%`, opacity: airTerserap ? 0 : 1 }}>
                <div className="w-full h-full relative overflow-hidden flex flex-col justify-end p-2">
                   <div className="w-full border-b-[3px] border-dotted border-slate-300/60 mb-1"></div>
                   <div className="w-full border-b-[3px] border-dotted border-slate-300/60"></div>
                </div>
              </div>

              {/* Cairan Air */}
              <div className={`absolute bottom-0 w-full bg-blue-300/70 transition-all duration-700 ease-in-out z-20 flex items-end justify-center pb-4`}
                   style={{ height: `${airTerserap ? 0 : 75 - (tissuePosition * 0.75)}%`, opacity: airTerserap ? 0 : 1 }}>
                 <div className="animate-pulse text-blue-100 text-5xl">💧💧</div>
              </div>

              {/* Feses Padat */}
              <div className={`text-7xl transition-all duration-1000 drop-shadow-xl z-10 mb-8
                ${airTerserap ? 'scale-125 opacity-100' : 'scale-50 opacity-20 blur-sm'}
              `}>
                💩
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 w-full">
              {!airTerserap ? (
                <div className="w-full flex flex-col items-center gap-2">
                  <label className="text-sm font-bold text-amber-700">Tarik ke bawah 👇</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={tissuePosition}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setTissuePosition(val);
                      if (val >= 100) {
                        setAirTerserap(true);
                      }
                    }}
                    className="w-full max-w-xs h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>
              ) : (
                <button onClick={() => { setActiveSection(4); setTimeout(() => scrollTo(anusRef), 100); }} className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all animate-bounce mt-4">
                  ⬇️ Menuju Rektum/Anus
                </button>
              )}
            </div>
          </div>
          <div className={`w-10 bg-slate-300 absolute -bottom-16 transition-all duration-1000 ${activeSection >= 4 ? 'h-24 opacity-100' : 'h-0 opacity-0'}`}></div>
        </section>


        {/* ================= 5. ANUS (Spam Click Pressure) ================= */}
        <section ref={anusRef} className={`w-full max-w-2xl min-h-[80vh] flex flex-col items-center justify-center p-6 transition-opacity duration-1000 ${activeSection >= 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-white w-full rounded-3xl shadow-xl p-8 border-t-8 border-slate-700 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">5. Anus</h2>
            <p className="text-slate-500 mb-8">Klik tombol berulang kali secepat mungkin untuk membangun tekanan (kontraksi otot) dan mendorong feses keluar!</p>

            <div className="relative w-full h-56 bg-slate-100 rounded-b-[60px] border-4 border-slate-300 flex flex-col justify-start items-center overflow-hidden mb-8 shadow-[inset_0_-20px_20px_rgba(0,0,0,0.1)]">
              {/* Feses */}
              <div className="text-8xl z-10 transition-all ease-out"
                   style={{ 
                     transform: `translateY(${isFlushed ? 300 : 20 + (pressure * 1.5)}px) scale(${isFlushed ? 0.5 : 1.1})`,
                     opacity: isFlushed ? 0 : 1
                   }}>
                💩
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 w-full">
              {!isFlushed ? (
                <div className="w-full flex flex-col items-center gap-2">
                  {/* Pressure Meter */}
                  <div className="w-full max-w-xs bg-slate-200 border-2 border-slate-300 rounded-full h-6 mb-4 overflow-hidden relative">
                     <div className="bg-red-500 h-full transition-all ease-out" style={{ width: `${pressure}%` }}></div>
                     <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700 mix-blend-overlay">
                       Tekanan: {pressure}%
                     </span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setPressure(prev => {
                        const newPressure = prev + 15; // Kecepatan menambah tekanan per klik
                        if (newPressure >= 100) {
                          setIsFlushed(true);
                          return 100;
                        }
                        return newPressure;
                      });
                    }} 
                    className="px-10 py-6 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg active:scale-90 transition-transform text-xl flex gap-2 select-none"
                  >
                    🔥 KLIK CEPAT!
                  </button>
                </div>
              ) : (
                <div className="bg-green-100 border border-green-400 text-green-700 px-8 py-6 rounded-2xl text-center animate-fade-in-up w-full">
                  <span className="text-5xl block mb-4">🎉</span>
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