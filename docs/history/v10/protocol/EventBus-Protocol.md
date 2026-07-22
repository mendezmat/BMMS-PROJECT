# Event Bus Protocol

Envelope

{
 id,
 type,
 version,
 timestamp,
 source,
 correlationId,
 payload
}

Rules

- Immutable payload
- Versioned schema
- Async by default
- Sync allowed for UI
- Correlation IDs required
