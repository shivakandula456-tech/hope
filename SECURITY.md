# Website Security Hardening

This release applies a medium, non-visual security hardening pass.

## Included
- Content Security Policy baseline
- Referrer Policy
- Permissions Policy
- X-Content-Type-Options: nosniff
- Clickjacking protection via X-Frame-Options / frame-ancestors
- HTTPS upgrade directive
- HSTS configuration for Apache when served over HTTPS
- Directory listing disabled on Apache

## Hosting requirement
The included `.htaccess` applies to Apache-compatible hosting. If the site is deployed on another platform, configure the equivalent response headers at the hosting/CDN layer. HSTS should only be enabled after confirming the whole production site is HTTPS-only.

## Code review
The site's dynamic HTML is generated from local, static application data. User-provided consultation values are encoded before being placed in the WhatsApp URL, and existing escaping is retained for dynamic text rendered into HTML.
