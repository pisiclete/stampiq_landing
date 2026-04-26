// StampIQ post-launch landing — composes everything
const App = () => (
  <div style={{ background: 'white', color: SIQ.fg, fontFamily: "'Roboto', -apple-system, sans-serif", lineHeight: 1.6 }}>
    <Header/>
    <Hero/>
    <ThreeActs/>
    <SigiVision/>
    <MeetSigi/>
    <Pricing/>
    <Press/>
    <Partner/>
    <Founder/>
    <FAQ/>
    <FinalCTA/>
    <Footer/>
  </div>
);
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
