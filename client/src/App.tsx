import './index.css';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import AnnouncementTicker from '@/components/sections/AnnouncementTicker';
import ImpactNumbers from '@/components/sections/ImpactNumbers';
import About from '@/components/sections/About';
import SSIP from '@/components/sections/SSIP';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Team from '@/components/sections/Team';
import Partners from '@/components/sections/Partners';
import CTA from '@/components/sections/CTA';
import SocialSidebar from '@/components/layout/SocialSidebar';
import StartupsPage from '@/pages/StartupsPage';
import ServicesPage from '@/pages/ServicesPage';
import JourneyPage from '@/pages/JourneyPage';
import SubmitIdeaPage from '@/pages/SubmitIdeaPage';

export default function App() {
  const [activePage, setActivePage] = useState<string>('');

  useEffect(() => {
    const checkHash = () => {
      if (
        window.location.hash === '#startups-page' || 
        window.location.hash === '#services-page' ||
        window.location.hash === '#journey-page' ||
        window.location.hash === '#submit-idea-page'
      ) {
        setActivePage(window.location.hash);
      } else {
        setActivePage('');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const renderPage = () => {
    if (activePage === '#startups-page') return <StartupsPage />;
    if (activePage === '#services-page') return <ServicesPage />;
    if (activePage === '#journey-page') return <JourneyPage />;
    if (activePage === '#submit-idea-page') return <SubmitIdeaPage />;
    
    return (
      <main>
        <Hero />
        <AnnouncementTicker />
        <ImpactNumbers />
        <About />
        <SSIP />
        <Gallery />
        <Team />
        <Partners />
        <CTA />
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-canvas text-ink overflow-x-hidden">
      <Header />
      <SocialSidebar />
      {renderPage()}
      <Footer />
    </div>
  );
}

