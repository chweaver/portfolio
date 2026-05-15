# Deliverable A: Lab user rename, vybz to cweaver

Run on every VM where `vybz` exists: `ubuntu-base` (192.168.100.10), `debian-base` (192.168.100.11), `rocky-base` (192.168.200.12).

The flow: create `cweaver`, migrate the home directory contents, transplant SSH authorized_keys, lock `vybz` (do not delete), verify SSH, re-capture verification output and screenshots.

## 1. Snapshot every VM first

VMware Workstation, right-click each VM, Snapshot, name it `pre-rename-2026-05-15` (or current date). Cheap insurance.

## 2. Create cweaver on each VM

Ubuntu and Debian:

```bash
sudo useradd -m -s /bin/bash -G sudo cweaver
sudo passwd cweaver
```

Rocky Linux uses `wheel` instead of `sudo`:

```bash
sudo useradd -m -s /bin/bash -G wheel cweaver
sudo passwd cweaver
```

## 3. Migrate home directory contents from vybz

```bash
# Copy dotfiles, .ssh, anything else vybz had set up.
sudo rsync -a --exclude='.cache' --exclude='.local/share' /home/vybz/ /home/cweaver/
sudo chown -R cweaver:cweaver /home/cweaver

# Lock down SSH dir permissions in case rsync widened them.
sudo chmod 700 /home/cweaver/.ssh
sudo chmod 600 /home/cweaver/.ssh/authorized_keys 2>/dev/null || true
```

## 4. Verify cweaver can do what vybz did

Log in directly as `cweaver` (not via `sudo su`) and confirm:

```bash
# On the VM itself
whoami                # cweaver
id                    # groups include sudo (Ubuntu/Debian) or wheel (Rocky)
sudo -v               # sudo works
ls -la ~/.ssh         # authorized_keys present, perms 600
```

## 5. Lock vybz (do not delete)

```bash
sudo usermod -L vybz
sudo passwd -l vybz   # belt and suspenders
```

Leaves the home dir intact for rollback if something breaks.

## 6. End-to-end SSH verification (the portfolio's claim)

From `rocky-base` (192.168.200.12):

```bash
ssh cweaver@192.168.100.10
# Expect: password prompt, login banner, prompt as cweaver@ubuntu-base
exit

ping -c 4 192.168.100.10
# Expect: 100% packet loss (blocked by LAB200 rule 2)

curl -s https://ifconfig.me
# Expect: WAN-side IP (LAB200 rule 3)
```

## 7. Re-capture the verification log and pfSense filter log

Update [src/data/portfolio.ts](src/data/portfolio.ts):

- `verificationLog`: paste the new SSH transcript, ping output, curl output. The prompts now show `cweaver@rocky-base` and `cweaver@ubuntu-base`.
- `pfsenseLog`: re-export three representative lines from `Status → System Logs → Firewall` covering each LAB200 rule.
- `firewallRules[0].verification`: change `ssh vybz@...` to `ssh cweaver@...`.

## 8. Re-take the five pfSense screenshots

Same five views, captured with cweaver in the lab (any SSH session output, terminal prompts, or banners that show username need to read `cweaver`):

- Firewall Rules
- Firewall Log
- Interface Assignments
- Dashboard
- SSH with no ping back from 192.168.100.10

Drop the new PNGs into `public/logs/` (overwrite the existing files). Then regenerate WebP:

```bash
node scripts/convert-screenshots.mjs
```

If image dimensions differ from 1920x1080 / 2560x1440, update the `width` and `height` fields in [src/components/ArtifactGallery.tsx](src/components/ArtifactGallery.tsx).

## 9. Rollback if anything broke

```bash
sudo usermod -U vybz
sudo passwd -u vybz
# Then revert the VM to the pre-rename snapshot if needed.
```
