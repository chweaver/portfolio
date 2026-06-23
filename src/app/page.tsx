import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { ADLabProgress } from '@/components/ADLabProgress';
import { FirewallRules } from '@/components/FirewallRules';
import { NetworkTopology } from '@/components/NetworkTopology';
import { SkillsMatrix } from '@/components/SkillsMatrix';
import { ArtifactGallery } from '@/components/ArtifactGallery';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <ADLabProgress />
      <FirewallRules />
      <NetworkTopology />
      <SkillsMatrix />
      <ArtifactGallery />
      <Contact />
    </>
  );
}
