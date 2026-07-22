# ADR-0003 — Global integrations are shared platform services

## Status

Accepted.

## Context

ProPresenter functionality existed inside module code, which hid configuration
and encouraged duplicated connections.

## Decision

External platform connections are registered as global BMMS integrations.
Modules consume normalized events and must not establish independent duplicate
connections unless a documented exception exists.

## Consequences

- one visible configuration;
- one connection lifecycle;
- reusable events;
- easier diagnostics;
- Scripture and Smart Flyer remain decoupled from transport details.
