export default function Confirmation({ movie, day, time, selectedSeats, name }) {
  return (
    <div className="success-wrapper">
      <div className="success-icon">✓</div>
      <h2 className="success-title">تم الحجز بنجاح</h2>
      <p>شكرا {name}</p>
      <div className="ticket-card">
        <p className="ticket-movie">{movie.title}</p>
        <div className="divider"></div>
        <div className="ticket-row"><span>اليوم:</span><span>{day}</span></div>
        <div className="ticket-row"><span>الوقت:</span><span>{time}</span></div>
        <div className="ticket-row"><span>الكراسي:</span><span>{selectedSeats.join(", ")}</span></div>
      </div>
    </div>
  );
}
