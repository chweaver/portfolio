# Deliverable D: Screenshot PII scan checklist

Run through this list for every PNG before publishing (portfolio site or public repo). The goal is to catch things that leak personal info or that just look unprofessional.

## Per-screenshot review

For each of the five lab screenshots:

- Firewall Rules
- Firewall Log
- Interface Assignments
- Dashboard
- SSH with no ping back from 192.168.100.10

...check the following.

### 1. Browser tab titles

- The pfSense tab title is fine: "pfSense.localdomain - <page>".
- Adjacent tabs visible at the top: any showing personal email (Gmail), Slack DMs, social media, or unrelated browsing? Close them before retaking, or crop the tab bar out.

### 2. Windows hostname or computer name

- Bottom-right system tray, taskbar tooltips, pfSense "System Information → Name" widget.
- If the hostname reveals a real name ("CharlieWeaver-PC") or has a unique identifier, rename the Windows host to something neutral (`HOMELAB-WS`) or crop the indicator.

### 3. Desktop background and adjacent windows

- Any family photos, personal docs, identifying wallpapers visible behind the browser?
- Set a neutral wallpaper or capture in full-screen / maximized mode with the browser filling the screen.
- Close every non-pfSense window before capturing.

### 4. Notification banners

- Toast notifications from email, Slack, Teams, calendar, browser updates can show up in the corner.
- Turn on Focus Assist / Do Not Disturb before capturing.

### 5. MAC addresses

- Interface Assignments page, ARP table view, DHCP leases.
- Real MACs are low-risk but tie the screenshot to your hardware. Mask with a black rectangle, or use the redacted lab MACs you keep for documentation.

### 6. Usernames other than cweaver

- SSH session prompts (`cweaver@rocky-base ~$`, `cweaver@ubuntu-base:~$`).
- Login banners ("Last login: ... from ...").
- File paths under `/home/<user>/`.
- Verify nothing reads `vybz` anywhere. If `vybz` appears, retake after the lab rename (see deliverable A).

### 7. WAN IP visibility

- Dashboard widget, Interfaces page, Gateway status.
- The WAN IP identifies the home ISP and rough geolocation. Mask with a black rectangle if present, or capture before the WAN gets a real lease (with the placeholder `DHCP pending`).

### 8. DNS and DDNS hostnames

- DNS resolver page (Services → DNS Resolver) and DDNS status page.
- Strip if a real DDNS hostname or upstream resolver is shown.

### 9. System time and timestamps

- Low risk, but a screenshot timestamped 03:14 tells a viewer about your habits.
- Optional: set system time temporarily to a normal weekday afternoon for the capture.

### 10. Recent files, breadcrumbs, shell history

- If a terminal screenshot shows recent commands, clear bash history first: `history -c && history -w` and re-run only what you want shown.
- File-explorer breadcrumbs or "Recent" items in the corner of a screenshot can reveal personal docs.

## Quick batch check before pushing

Open each PNG full-screen, scan the four corners and any text overlay, ask "if a stranger saw this, what could they learn about me, my home network, my hardware, or my non-lab activity?"

If the answer is "nothing", commit. If the answer is anything specific, redact or retake.
