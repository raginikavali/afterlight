import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import OperatorReview from './components/OperatorReview';
import PilotSection from './components/PilotSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { useTimeEngine } from './hooks/useTimeEngine';

export default function App() {
  const heroTime = useTimeEngine(150); // Hero starts at ~20:30

  return (
    <div className="min-h-screen bg-afterlight-bg">
      <Navigation />

      <main>
        <Hero
          currentTime={heroTime.currentTime}
          onTimeChange={heroTime.setTime}
          availableCount={heroTime.availableCount}
          availableCapacity={heroTime.availableCapacity}
          matchCount={heroTime.matchCount}
        />

        <div className="section-divider" />

        <ProblemSection />

        <div className="section-divider" />

        <OperatorReview />

        <div className="section-divider" />

        <PilotSection />

        <div className="section-divider" />

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
