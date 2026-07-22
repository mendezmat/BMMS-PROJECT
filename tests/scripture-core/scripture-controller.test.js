import test from "node:test";
import assert from "node:assert/strict";
import {
  EventBus,
  Logger
} from "../../packages/foundation/src/index.js";
import {
  ScriptureController
} from "../../packages/scripture-core/src/index.js";

test("publishes verse and program events", () => {
  const events = new EventBus();
  const received = [];

  events.subscribe("scripture.verse.changed", event => received.push(event.type));
  events.subscribe("scripture.program.changed", event => received.push(event.type));

  const controller = new ScriptureController({
    events,
    logger: new Logger("test")
  });

  controller.receiveVerse({
    reference: "Juan 3:16",
    text: "Porque de tal manera amó Dios"
  });
  controller.takeIn();
  controller.takeOut();

  assert.deepEqual(received, [
    "scripture.verse.changed",
    "scripture.program.changed",
    "scripture.program.changed"
  ]);
});

test("does not mark identical normalized content as changed", () => {
  const events = new EventBus();
  const changes = [];

  events.subscribe("scripture.verse.changed", event => {
    changes.push(event.payload.changed);
  });

  const controller = new ScriptureController({
    events,
    logger: new Logger("test")
  });

  controller.receiveVerse({ reference: "Juan 3:16", text: "Texto" });
  controller.receiveVerse({ reference: " Juan  3:16 ", text: "Texto" });

  assert.deepEqual(changes, [true, false]);
});
