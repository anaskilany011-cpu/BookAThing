import BookingFlow from './components/BookingFlow'

function App() {
  const movie = { title: "Inside Out 2" }
  return (
    <div style={{ padding: '20px', background: '#0f0f0f', minHeight: '100vh', color: 'white' }}>
      <BookingFlow movie={movie} />
    </div>
  )
}

export default App
