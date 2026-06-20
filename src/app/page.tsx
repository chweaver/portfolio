import { Hero } from '@/components/Hero';
import { ReadyForWork } from '@/components/ReadyForWork';
import { ADLabProgress } from '@/components/ADLabProgress';
import { LinuxLabProgress } from '@/components/LinuxLabProgress';
import { ArtifactGallery } from '@/components/ArtifactGallery';
import { FirewallRules } from '@/components/FirewallRules';
import { NetworkTopology } from '@/components/NetworkTopology';
import { Projects } from '@/components/Projects';
import { VMInventory } from '@/components/VMInventory';
import { LabOverview } from '@/components/LabOverview';
import { SkillsMatrix } from '@/components/SkillsMatrix';
import { Certifications } from '@/components/Certifications';
import { Roadmap } from '@/components/Roadmap';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <ReadyForWork />
      <ADLabProgress />
      <LinuxLabProgress />
      <ArtifactGallery />
      <FirewallRules />
      <NetworkTopology />
      <Projects />
      <VMInventory />
      <LabOverview />
      <SkillsMatrix />
      <Certifications />
      <Roadmap />
      <Contact />
    </>
  );
}
