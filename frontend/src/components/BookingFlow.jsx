import { useState } from "react";
import "./BookingFlow.css";

export default function BookingFlow({ movie }) {
  const [step, setStep] = useState(1);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState([]);
  const [name, setName] = useState("");

  const days = (() => {
    const t = new Date();
    return [0,1,2,3,4].map(i => {
      const d = new Date(); 
      d.setDate(t.getDate() + i);
      const label = d.toLocaleDateString('ar-EG', { weekday: 'short' });
      const display = label + " " + d.getDate() + "/" + (d.getMonth()+1);
      return { id: d.toISOString(), label: display };
    });
  })();

  const times = ["12:00 PM", "3:00 PM", "7:00 PM", "10:00 PM"];
  const allSeats = Array.from({ length: 40 }, (_, i) => "R" + (Math.floor(i/8)+1) + "S" + ((i%8)+1));
  const price = 120;

  const toggleSeat = (s) => setSeats(prev => prev.includes(s) ? prev.filter(x=>x!==s) : [...prev, s]);
  const reset = () => { setStep(1); setSeats([]); setDay(''); setTime(''); setName(''); };

  return (
    <div className="booking-container">
      <div style={{display:'flex', gap:'6px', marginBottom:'15px'}}>
        {[1,2,3,4].map(s => <div key={s} style={{flex:1, height:'4px', borderRadius:'10px', background: step>=s ? '#E2C078' : '#333'}}></div>)}
      </div>
      <h3>{movie.title}</h3>
      {step === 1 && (
        <>
          <p>اختار اليوم:</p>
          <div style={{display:'flex', gap:'5px', flexWrap:'wrap'}}>
            {days.map(d => <div key={d.id} onClick={()=>setDay(d.id)} style={{padding:'8px', border: day===d.id ? '2px solid #E2C078' : '1px solid #333', cursor:'pointer'}}>{d.label}</div>)}
          </div>
          <p>اختار الوقت:</p>
          <div style={{display:'flex', gap:'5px', flexWrap:'wrap'}}>
            {times.map(t => <div key={t} onClick={()=>setTime(t)} style={{padding:'8px', border: time===t ? '2px solid #E2C078' : '1px solid #333', cursor:'pointer'}}>{t}</div>)}
          </div>
          <button disabled={!day || !time} onClick={()=>setStep(2)}>التالي</button>
        </>
      )}
      {step === 2 && (
        <>
          <p>المقاعد: {seats.length} - {seats.length * price} جنيه</p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:'8px', margin:'20px 0'}}>
            {allSeats.map(s => <div key={s} onClick={()=>toggleSeat(s)} style={{padding:'10px', border:'1px solid #444', background: seats.includes(s) ? '#e50914' : '#2a2a2a', cursor:'pointer'}}>{s}</div>)}
          </div>
          <button onClick={()=>setStep(1)}>رجوع</button>
          <button disabled={seats.length===0} onClick={()=>setStep(3)}>التالي</button>
        </>
      )}
      {step === 3 && (
        <>
          <input placeholder="اسمك" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%', padding:'12px', marginBottom:'15px'}} />
          <p>اليوم: {days.find(d=>d.id===day)?.label} - {time} - {seats.join(', ')}</p>
          <button onClick={()=>setStep(2)}>رجوع</button>
          <button disabled={!name} onClick={()=>setStep(4)}>تأكيد</button>
        </>
      )}
      {step === 4 && (
        <div style={{textAlign:'center', padding:'40px 0'}}>
          <h2>✅ تم الحجز بنجاح!</h2>
          <p>شكراً {name}، حجزك لـ {movie.title}</p>
          <button onClick={reset}>حجز جديد</button>
        </div>
      )}
    </div>
  );
}