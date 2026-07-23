function clone(value) {
  return structuredClone(value);
}

function mergeNested(current = {}, patch = {}) {
  return { ...current, ...patch };
}

export function normalizeScriptureState(defaults, saved = {}) {
  return {
    ...defaults,
    ...saved,
    manual: mergeNested(defaults.manual, saved.manual),
    propresenter: mergeNested(defaults.propresenter, saved.propresenter),
    composition: mergeNested(defaults.composition, saved.composition),
    appearance: mergeNested(defaults.appearance, saved.appearance),
    gradient: mergeNested(defaults.gradient, saved.gradient),
    animation: mergeNested(defaults.animation, saved.animation),
    autoTake: mergeNested(defaults.autoTake, saved.autoTake),
    live: mergeNested(defaults.live, saved.live),
    output: mergeNested(defaults.output, saved.output),
    broadcast: {
      preview: saved.broadcast?.preview || null,
      program: saved.broadcast?.program || null,
      visible: Boolean(saved.broadcast?.visible),
      autoTake: Boolean(
        saved.broadcast?.autoTake ??
        saved.autoTake?.enabled ??
        defaults.broadcast?.autoTake
      )
    }
  };
}

export function mergeScripturePatch(current, patch = {}) {
  return {
    ...current,
    ...patch,
    manual: mergeNested(current.manual, patch.manual),
    propresenter: mergeNested(current.propresenter, patch.propresenter),
    composition: mergeNested(current.composition, patch.composition),
    appearance: mergeNested(current.appearance, patch.appearance),
    gradient: mergeNested(current.gradient, patch.gradient),
    animation: mergeNested(current.animation, patch.animation),
    autoTake: mergeNested(current.autoTake, patch.autoTake),
    live: mergeNested(current.live, patch.live),
    output: mergeNested(current.output, patch.output),
    broadcast: mergeNested(current.broadcast, patch.broadcast)
  };
}

export class ScriptureStateStore {
  constructor({ defaults, initialState, persist, publish = () => {} }) {
    this.defaults = defaults;
    this.state = normalizeScriptureState(defaults, initialState);
    this.revision = Number(initialState?.stateRevision || 0);
    this.persist = persist;
    this.publish = publish;
    this.queue = Promise.resolve();
  }

  getSnapshot() {
    return {
      revision: this.revision,
      scripture: clone(this.state),
      broadcast: clone(this.state.broadcast)
    };
  }

  async transact(reason, operation) {
    const task = this.queue.then(async () => {
      const draft = clone(this.state);
      const next = operation(draft) || draft;

      this.revision += 1;
      next.stateRevision = this.revision;

      next.broadcast = {
        ...(next.broadcast || {}),
        autoTake: Boolean(next.broadcast?.autoTake)
      };

      next.autoTake = {
        ...(next.autoTake || {}),
        enabled: Boolean(next.broadcast.autoTake)
      };

      next.output = {
        ...(next.output || {}),
        visible: Boolean(next.broadcast.visible)
      };

      this.state = normalizeScriptureState(this.defaults, next);
      this.state.stateRevision = this.revision;

      await this.persist(clone(this.state));

      const snapshot = this.getSnapshot();
      this.publish({ ...snapshot, reason });
      return snapshot;
    });

    this.queue = task.catch(() => {});
    return task;
  }

  updateConfig(patch) {
    return this.transact("config", current =>
      mergeScripturePatch(current, patch)
    );
  }

  loadManualPreview(verse) {
    return this.transact("manual-preview", current => {
      current.source = "manual";
      current.currentVerse = verse;
      current.manual = {
        ...current.manual,
        reference: verse.reference,
        version: verse.version,
        text: verse.text
      };
      current.broadcast.preview = verse;

      if (current.broadcast.autoTake) {
        current.broadcast.program = verse;
        current.broadcast.visible = true;
      }

      return current;
    });
  }

  receiveProPresenterVerse(verse) {
    return this.transact("propresenter-verse", current => {
      current.source = "propresenter";
      current.currentVerse = verse;
      current.propresenter = {
        ...current.propresenter,
        reference: verse.reference,
        version: verse.version,
        text: verse.text,
        presentation: verse.presentationId || verse.presentation || "",
        slideIndex: verse.slideIndex ?? null,
        receivedAt: verse.receivedAt || new Date().toISOString()
      };
      current.broadcast.preview = verse;

      if (current.broadcast.autoTake) {
        current.broadcast.program = verse;
        current.broadcast.visible = true;
      }

      return current;
    });
  }

  updateProPresenterText(incoming) {
    return this.transact("propresenter-text", current => {
      current.propresenter = {
        ...current.propresenter,
        ...incoming,
        receivedAt: incoming.receivedAt || new Date().toISOString()
      };
      return current;
    });
  }

  take() {
    return this.transact("take", current => {
      if (!current.broadcast.preview) {
        throw new Error("No hay contenido en Preview.");
      }

      current.broadcast.program = current.broadcast.preview;
      current.broadcast.visible = true;
      return current;
    });
  }

  clear() {
    return this.transact("clear", current => {
      current.broadcast.visible = false;
      return current;
    });
  }

  setAutoTake(enabled) {
    return this.transact("auto-take", current => {
      current.broadcast.autoTake = Boolean(enabled);

      if (current.broadcast.autoTake && current.broadcast.preview) {
        current.broadcast.program = current.broadcast.preview;
        current.broadcast.visible = true;
      }

      return current;
    });
  }
}
