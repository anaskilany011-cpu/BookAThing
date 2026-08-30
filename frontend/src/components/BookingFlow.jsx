import { useState } from "react";
import "./BookingFlow.css";

export default function BookingFlow({ movie }) {
  const [step, setStep] = useState(1);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("7:00 PM");

  const days = (() => {
    const t = new Date();
    return [0,1,2].map(i => {
      const d = new Date(); d.setDate(t.getDate() + i);
      return d.toLocaleDateString('ar-EG', { weekday: 'short', day: 'numeric', month: 'short' }) + ` - ${d.getDate()}/${d.getMonth()+1}`;
    });
  })();

  return (
    <div className="booking-container">
      <div className="progress-bar">
        {[1,2,3,4].map(s => <div key={s} className={`progress-step ${step >= s? 'active' : ''}`}></div>)}
      </div>
      <h3 className="movie-title">{movie.title}</h3>
      <p className="label">اختار اليوم:</p>
      <div className="days-grid">
        {days.map(d => (
          <div key={d} onClick={() => setDay(d)} className={`day-card ${day === d? 'selected' : ''}`}>{d}</div>
        ))}
      </div>
    </div>
  );
}
