# Deploying ITPidia safely on the VPS

The site is 100% static (HTML, CSS, JS, PNG). It has no backend, no database, no forms posting to the server
and no secrets. The contact form opens the visitor's mail app (`mailto:`), so nothing reaches the VPS.
The attack surface is the server itself, so most of the work below is on the VPS.

Traffic flow: visitor → Cloudflare (proxied, orange cloud) → VPS nginx. The VPS should only ever talk to Cloudflare.

## 1. DNS in Cloudflare

- Point `itpidia.com` (A, **proxied**) at the VPS IP and delete the old `63.250.43.130/131` records.
  Those are the old EasyWP hosting. Keeping both would send some visitors to the old site.
- `www` stays a proxied CNAME to `itpidia.com`.
- **Never** create a DNS-only (grey cloud) record that points at the VPS IP. It reveals the real IP and makes the
  Cloudflare protection useless. If the VPS is the same machine as `mail.itpidia.com` (85.215.55.96), the IP is already
  public. In that case, host the website on a different server/IP or move mail elsewhere.
- Add a DMARC record (there is none today):
  `_dmarc  TXT  "v=DMARC1; p=quarantine; rua=mailto:contact@itpidia.com"`

Cloudflare dashboard settings:
- SSL/TLS: **Full (strict)**, Always Use HTTPS **on**, Minimum TLS **1.2**
- Security: Bot Fight Mode **on**
- SSL/TLS > Origin Server: create an **Origin Certificate**, then save it on the VPS as `/etc/ssl/itpidia/origin.pem`
  and `/etc/ssl/itpidia/origin.key` (`chmod 600` the key)

## 2. Upload only the public files

Never `git clone` into the web root (that exposes `.git`). Copy only what the site needs:

```bash
rsync -av --delete index.html styles.css script.js assets user@VPS:/var/www/itpidia/
ssh user@VPS 'sudo chown -R root:root /var/www/itpidia && sudo find /var/www/itpidia -type d -exec chmod 755 {} + && sudo find /var/www/itpidia -type f -exec chmod 644 {} +'
```

The web root is owned by root and read-only for nginx (`www-data`), so even a compromised nginx worker can't modify the site.

## 3. nginx + firewall

1. Add the three `http { }` lines from the top of [`nginx.conf`](nginx.conf) to `/etc/nginx/nginx.conf`.
2. Copy [`nginx.conf`](nginx.conf) to `/etc/nginx/sites-available/itpidia`, symlink it into `sites-enabled`, and remove `sites-enabled/default`.
3. Run `sudo bash cloudflare-origin.sh`. It makes nginx see the real visitor IP and firewalls ports 80/443 to Cloudflare only.
   **Make sure your SSH key login works first.** The script keeps SSH (22) open.

The nginx config:
- serves only `index.html`, `styles.css`, `script.js` and `assets/*.png|jpg|webp`; everything else is a 404
- allows only GET/HEAD, caps request size and timeouts, and rate-limits each visitor IP
- drops requests to the bare IP or an unknown Host (`444`, TLS handshake rejected)
- sends CSP, HSTS, nosniff, frame-deny, Referrer-Policy and Permissions-Policy headers
- hides the nginx version (`server_tokens off`)

## 4. VPS hardening checklist

- [ ] SSH: key-only login. In `/etc/ssh/sshd_config`: `PasswordAuthentication no`, `PermitRootLogin no`, `KbdInteractiveAuthentication no`. Then `sudo systemctl restart ssh`.
- [ ] Nothing else listening publicly: `sudo ss -tulpn` should show only 22, 80 and 443 (databases, Docker and admin panels bound to `127.0.0.1` only).
      Note: Docker bypasses ufw for published ports. Publish container ports as `127.0.0.1:PORT:PORT`.
- [ ] `sudo apt install fail2ban unattended-upgrades` and enable the `sshd` jail and automatic security updates.
- [ ] Don't run other apps (Coolify, Grafana, panels, phpMyAdmin) on this VPS publicly. Use Cloudflare Tunnel + Access for those.
- [ ] Re-run `cloudflare-origin.sh` every few months.

## 5. Check after deploying

```bash
curl -sI https://itpidia.com | grep -iE 'content-security|strict-transport|x-frame|server'
curl -s -o /dev/null -w '%{http_code}\n' https://itpidia.com/.git/config      # expect 404
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://itpidia.com/         # expect 405
curl -sk --max-time 5 https://VPS_IP/ ; echo "exit=$?"                        # from your PC: expect timeout/failure
```

Then run https://securityheaders.com and https://www.ssllabs.com/ssltest/ against the domain.
