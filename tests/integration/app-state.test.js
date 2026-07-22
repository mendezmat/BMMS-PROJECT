import test from "node:test";
import assert from "node:assert/strict";
import { defaultAppState } from "../../packages/shared/src/default-app-state.js";

test("Scripture defaults to manual source", () => {
  assert.equal(defaultAppState.scripture.source, "manual");
});

test("ProPresenter settings are globally available", () => {
  const config = defaultAppState.settings.integrations.propresenter;
  assert.equal(config.host, "127.0.0.1");
  assert.equal(config.enabled, false);
});

test("Smart Flyer defaults to assisted automation", () => {
  assert.equal(defaultAppState.settings.smartFlyer.automationMode, "assisted");
});
