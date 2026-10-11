# Security Policy

Do not publish security vulnerabilities in a public issue. Report them directly
to the repository owner with the affected version, reproduction steps, impact
and any known mitigation.

BMMS Graphics binds to `127.0.0.1` by default, so only the same computer can
reach it. To feed OBS/vMix on another computer of the same local network, turn on
"Permitir otros equipos de la red" in Scripture (saved in
`data/graphics-server.json`) or start it with `BMMS_HOST=0.0.0.0`; the change
applies after restarting the server. The TB Tool API (`/api/tb/*`) only answers
requests from the same computer even in LAN mode. Do not expose it directly to
the public internet. Authentication, authorization, encrypted transport and
secure remote access are not yet production-ready.
