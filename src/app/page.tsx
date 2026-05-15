import { Hero } from '@/components/Hero';
import { ArtifactGallery } from '@/components/ArtifactGallery';
import { LabOverview } from '@/components/LabOverview';
import { NetworkTopology } from '@/components/NetworkTopology';
import { FirewallRules } from '@/components/FirewallRules';
import { VMInventory } from '@/components/VMInventory';
import { SkillsMatrix } from '@/components/SkillsMatrix';
import { Roadmap } from '@/components/Roadmap';
import { Certifications } from '@/components/Certifications';
import { Career } from '@/components/Career';
import { Supplementary } from '@/components/Supplementary';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <ArtifactGallery />
      <LabOverview />
      <NetworkTopology />
      <FirewallRules />
      <VMInventory />
      <SkillsMatrix />
      <Roadmap />
      <Certifications />
      <Career />
      <Supplementary />
      <Contact />
    </>
  );
}
