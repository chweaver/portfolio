# Deliverable B: pfSense public repo sanitization checklist

Run through every item before pushing the sanitized configs to GitHub. The redaction targets are the things that either tie the lab to a specific home/ISP or that would let someone restore a working admin account from the export.

## Source files to check

- `config.xml` (the pfSense backup, Diagnostics → Backup & Restore)
- `filter.log`, `dhcpd.log`, `system.log` exports from `public/logs/`
- Any narrative docs (`README.md`, `firewall-rules.md`) you author for the repo
- Screenshots you include in the repo (separate checklist in deliverable D)

## Redaction targets

### 1. WAN IPs and ISP-identifying info

- `config.xml`: find the WAN interface block, replace `<ipaddr>` with `dhcp` or a synthetic placeholder. Real WAN IP reveals home ISP, geolocation, and may invite probing.
- DNS resolver config: replace ISP-issued DNS server IPs with Cloudflare (1.1.1.1) or Quad9 (9.9.9.9) entries.
- Logs: scrub real WAN IP from `filter.log` lines (typically the `igb0` or `em0` source).

### 2. MAC addresses

- `config.xml`: search for `<mac>` and `<dhcpd>` `<staticmap>` blocks. Replace real MACs with documentation prefix (`02:00:00:00:00:0X`) or remove the mappings entirely.
- Logs: filter `dhcpd.log` for real MACs before committing.
- VMware-assigned MACs (00:0c:29:xx:xx:xx) are slightly lower risk but trace to your host install.

### 3. DDNS hostnames

- `config.xml`: remove the entire `<dyndns>` block if present.
- Drop any DDNS hostname references from README or firewall-rule narratives.

### 4. Admin password hashes

- `config.xml`: strip `<password>` from every `<user>` block and any `<priv_passwd>` entries.
- Replace with placeholder text like `REDACTED_SET_ON_IMPORT`.
- Note in the README that the first-boot admin password must be set on import.

### 5. SSH host keys

- `config.xml`: remove the `<ssh>` block (specifically `<sshd_keys>` if present).
- Regenerated automatically on first SSH start with the new instance.

### 6. DHCP static mappings tied to real device names

- `config.xml`: `<dhcpd>` → `<staticmap>` blocks. Anonymize or remove `<hostname>` and `<descr>` fields that name real devices (e.g., Charlie's phone, partner's laptop).
- Keep lab VM static mappings (ubuntu-base, debian-base, rocky-base) since they are part of the documented lab.

### 7. VPN credentials, certificates, keys

- `<openvpn>`, `<ipsec>`, `<cert>`, `<ca>`, `<crl>` blocks: strip private keys and certificate bodies. Replace with `REDACTED` placeholder.
- If no VPN is configured, confirm by grepping for these tags and removing if found.

### 8. Backup task destinations

- `config.xml`: `<cron>` jobs or autoconfigbackup endpoints. Remove URLs, S3 keys, cloud backup credentials, any `<encryption_password>` field.

### 9. Email notification config

- `<notifications>` → `<smtp>` block: strip server hostname, username, password.

### 10. System hostname and domain

- `<system>` → `<hostname>` and `<domain>`. If they reveal personal info (real name, custom domain), replace with `pfsense.lab.local` or similar.

### 11. Logs (separate sweep)

Before committing `filter.log`, `dhcpd.log`, `system.log`:

- Scrub real WAN IP
- Scrub non-lab MAC addresses
- Scrub any DDNS update entries
- Truncate to a representative window (a day or two) rather than months of history

## Verification grep before pushing

```bash
# From the repo root, none of these should return matches:
grep -rE '<password>[^<]+</password>' .
grep -rE '<priv_passwd>' .
grep -rE '<sshd_keys>' .
grep -rE 'ddns|dyndns|<wildcard>' .
grep -rE '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' . | grep -v -E '192\.168\.(100|200|19)\.|1\.1\.1\.1|9\.9\.9\.9'
# Last one flags any IP not in lab subnets or known public resolvers. Manually review hits.
```

If any of those returns something, redact and re-check.
