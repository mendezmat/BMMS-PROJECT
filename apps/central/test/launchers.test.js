import test from "node:test";
import assert from "node:assert/strict";
import { launcherName, targetFromArgs, targetFromUrl } from "../src/launchers.js";
import { versionAtLeast } from "../src/updater.js";

test("apps open from a deep link or a launch argument", () => {
  assert.equal(targetFromUrl("bmms-central://open/tb-tool"), "tb-tool");
  assert.equal(targetFromUrl("bmms-central://open/tb-tool/"), "tb-tool");
  assert.equal(targetFromUrl("bmms-central://open/../x"), null);
  assert.equal(targetFromUrl("https://evil.example/open/tb-tool"), null);
  assert.equal(targetFromArgs(["/Applications/BMMS Central.app", "--open-app=tb-tool"]), "tb-tool");
  assert.equal(targetFromArgs(["C:\\BMMS Central.exe", "bmms-central://open/tb-tool"]), "tb-tool");
  assert.equal(targetFromArgs(["--open-app=../../x"]), null);
  assert.equal(targetFromArgs([]), null);
});

test("launchers are named like the app with the BMMS prefix", () => {
  assert.equal(launcherName("TB Tool"), "BMMS TB Tool");
});

test("UI updates only apply to compatible Central versions", () => {
  assert.equal(versionAtLeast("0.1.0", "0.1.0"), true);
  assert.equal(versionAtLeast("0.2.0", "0.1.5"), true);
  assert.equal(versionAtLeast("0.1.0", "0.2.0"), false);
  assert.equal(versionAtLeast("1.0", "0.9.9"), true);
});
