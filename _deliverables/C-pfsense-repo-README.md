# Deliverable C: pfSense public repo README template

Drop this in as `README.md` at the root of the public pfSense configs repo. Plain technical voice, no marketing framing, no "this demonstrates" sentences.

---

# pfSense Lab Configs

Sanitized exports from a two-subnet pfSense lab running on VMware Workstation Pro. The configs route between two private /24 subnets with three firewall rules on the LAB200 interface.

## Topology

| Subnet | CIDR              | VMnet  | Gateway          |
| ------ | ----------------- | ------ | ---------------- |
| LAN    | 192.168.100.0/24  | VMnet2 | 192.168.100.1    |
| LAB200 | 192.168.200.0/24  | VMnet3 | 192.168.200.1    |
| WAN    | host NAT pool     | VMnet8 | issued by VMware |

pfSense holds all three gateways. WAN gets DHCP from the VMware NAT pool. LAN and LAB200 each run their own DHCP scope inside pfSense.

## Firewall rules on LAB200 (top-down, first match wins)

1. **PASS** TCP/22 from LAB200 net to 192.168.100.10. Logged.
2. **BLOCK** any proto from LAB200 net to 192.168.100.0/24. Logged.
3. **PASS** any proto from LAB200 net to any destination.

Order matters. Rule 1 is the narrow exception. Rule 2 catches everything else from LAB200 toward LAN. Rule 3 permits outbound to the internet.

LAN to LAB200 has no explicit permit on the LAN ruleset, so the LAN default-deny applies. SSH from a LAN host to a LAB200 host times out.

## Verification

From a LAB200 host (e.g., 192.168.200.12):

```bash
# Rule 1: SSH to the LAN target should succeed.
ssh cweaver@192.168.100.10

# Rule 2: ICMP to the same host should fail.
ping -c 4 192.168.100.10
# Expected: 100% packet loss.

# Rule 3: Outbound to the internet should work.
curl -s https://ifconfig.me
# Expected: WAN-side IP.
```

## Files

- `config.xml`, sanitized pfSense backup (Diagnostics, Backup & Restore)
- `firewall-rules.md`, narrative of each rule with intent and verification
- `logs/filter.log`, log lines covering one example per rule
- `logs/dhcpd.log`, DHCP lease activity for the lab subnets
- `logs/system.log`, general system events

## On import

1. Restore the config in pfSense (Diagnostics, Backup & Restore, Restore).
2. Set a new admin password on first login.
3. SSH host keys regenerate automatically on first SSH service start.
4. Re-issue any certificates required for HTTPS, OpenVPN, or IPsec; they are not included.
5. WAN settings assume DHCP from a VMware NAT pool. Adjust to suit your environment.

## What was redacted

WAN IPs, real MAC addresses, DDNS hostnames, admin password hashes, SSH host keys, DHCP static mappings tied to real device names, VPN credentials, email/notification credentials, system hostname/domain if personally identifying. See `SANITIZATION.md` for the full checklist used.

## License

MIT. See `LICENSE`.
