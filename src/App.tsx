import Navigation from './components/Navigation';
import Hero from './components/Hero';
import InsightSection from './components/InsightSection';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import DistrictSimulation from './components/DistrictSimulation';
import ScenarioRoom from './components/ScenarioRoom';
import ConstraintPanel from './components/ConstraintPanel';
import OperatorReview from './components/OperatorReview';
import SystemModel from './components/SystemModel';
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

        <InsightSection />

        <div className="section-divider" />

        <ProblemSection />

        <div className="section-divider" />

        <HowItWorks />

        <div className="section-divider" />

        <DistrictSimulation />

        <div className="section-divider" />

        <ScenarioRoom />

        <div className="section-divider" />

        <ConstraintPanel />

        <div className="section-divider" />

        <OperatorReview />

        <div className="section-divider" />

        <SystemModel />

        <div className="section-divider" />

        <PilotSection />

        <div className="section-divider" />

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
