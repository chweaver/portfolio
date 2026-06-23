import { Section } from './Section';
import { profile } from '@/data/portfolio';
import { publicAsset } from '@/lib/paths';

const PHONE_DISPLAY = '(463) 710-5540';
const PHONE_TEL = '+14637105540';

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk"
      subtitle="Indianapolis metro. On-site, hybrid, or remote."
    >
      <div className="card p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Open to</div>
            <ul className="space-y-2 text-ink">
              <li className="flex gap-2">
                <span className="font-mono text-signal-green">→</span>
                <span>Tier-1 service desk / help desk technician</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-signal-green">→</span>
                <span>Technical alignment specialist</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-signal-green">→</span>
                <span>NOC technician</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-signal-green">→</span>
                <span>Junior systems administrator</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Reach me</div>
            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elevated px-4 py-3 hover:border-accent/40 hover:bg-accent/5 transition-colors group"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">email</span>
                <span className="font-mono text-sm text-ink group-hover:text-accent">{profile.email}</span>
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elevated px-4 py-3 hover:border-accent/40 hover:bg-accent/5 transition-colors group"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">phone</span>
                <span className="font-mono text-sm text-ink group-hover:text-accent">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elevated px-4 py-3 hover:border-accent/40 hover:bg-accent/5 transition-colors group"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">linkedin</span>
                <span className="font-mono text-sm text-ink group-hover:text-accent">/in/charlie-weaver-it</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elevated px-4 py-3 hover:border-accent/40 hover:bg-accent/5 transition-colors group"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">github</span>
                <span className="font-mono text-sm text-ink group-hover:text-accent">/chweaver</span>
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(profile.location)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-bg-border bg-bg-elevated px-4 py-3 hover:border-accent/40 hover:bg-accent/5 transition-colors group"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">location</span>
                <span className="font-mono text-sm text-ink group-hover:text-accent">{profile.location}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-bg-border pt-6">
          <a
            href={publicAsset('/Charlie-Weaver-Resume.pdf')}
            download
            className="rounded-md bg-accent px-4 py-2.5 font-mono text-sm font-medium text-bg hover:bg-accent-glow transition-colors"
          >
            Download resume (PDF) ↓
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md border border-bg-border bg-bg-elevated px-4 py-2.5 font-mono text-sm text-ink hover:border-accent/40 hover:text-accent transition-colors"
          >
            Email Charlie
          </a>
        </div>
      </div>
    </Section>
  );
}
