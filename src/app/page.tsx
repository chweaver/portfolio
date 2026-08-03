import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { ADLabProgress } from '@/components/ADLabProgress';
import { LinuxLabProgress } from '@/components/LinuxLabProgress';
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
      <LinuxLabProgress />
      <FirewallRules />
      <NetworkTopology />
      <SkillsMatrix />
      <ArtifactGallery />
      <Contact />
    </>
  );
}
