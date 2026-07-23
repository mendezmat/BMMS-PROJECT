const SCENE_SCHEMA_VERSION = 1;
const SUPPORTED_COMPONENTS = new Set([
  "container",
  "gradient",
  "text",
  "divider",
  "bible-verse"
]);

function now() {
  return new Date().toISOString();
}

function id(prefix = "scene") {
  return `${prefix}-${crypto.randomUUID()}`;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function finite(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeTransform(transform = {}) {
  return {
    x: finite(transform.x, 0),
    y: finite(transform.y, 0),
    width: Math.max(1, finite(transform.width, 100)),
    height: Math.max(1, finite(transform.height, 100)),
    rotation: finite(transform.rotation, 0),
    scaleX: finite(transform.scaleX, 1),
    scaleY: finite(transform.scaleY, 1),
    anchorX: finite(transform.anchorX, 0.5),
    anchorY: finite(transform.anchorY, 0.5)
  };
}

export function createSceneComponent(type, overrides = {}) {
  if (!SUPPORTED_COMPONENTS.has(type)) {
    throw new Error(`Unsupported scene component type: ${type}`);
  }

  return {
    id: overrides.id || id("component"),
    type,
    name: overrides.name || type,
    role: overrides.role || null,
    visible: overrides.visible !== false,
    locked: overrides.locked === true,
    transform: normalizeTransform(overrides.transform),
    style: clone(overrides.style || {}),
    data: clone(overrides.data || {}),
    behavior: clone(overrides.behavior || {}),
    children: Array.isArray(overrides.children)
      ? overrides.children.map(normalizeSceneComponent)
      : []
  };
}

export function normalizeSceneComponent(component) {
  if (!component?.type) throw new Error("Scene component type is required.");

  return createSceneComponent(component.type, {
    ...component,
    id: component.id,
    children: component.children || []
  });
}

export function createScene(overrides = {}) {
  const timestamp = now();
  return {
    schema: "bmms.scene",
    schemaVersion: SCENE_SCHEMA_VERSION,
    id: overrides.id || id("scene"),
    name: overrides.name || "Escena sin título",
    kind: overrides.kind || "generic",
    width: Math.max(1, finite(overrides.width, 1920)),
    height: Math.max(1, finite(overrides.height, 1080)),
    responsive: {
      mode: overrides.responsive?.mode || "fixed",
      constraints: clone(overrides.responsive?.constraints || {})
    },
    metadata: {
      createdAt: overrides.metadata?.createdAt || timestamp,
      updatedAt: timestamp,
      module: overrides.metadata?.module || null,
      sourceVersion: overrides.metadata?.sourceVersion || null,
      tags: Array.isArray(overrides.metadata?.tags)
        ? [...overrides.metadata.tags]
        : []
    },
    components: Array.isArray(overrides.components)
      ? overrides.components.map(normalizeSceneComponent)
      : []
  };
}

function scriptureText(scripture = {}) {
  const source = scripture.source === "propresenter"
    ? scripture.propresenter
    : scripture.manual;
  return {
    reference: source?.reference || "",
    version: source?.version || "",
    text: source?.text || ""
  };
}

export function createScriptureScene(scripture = {}, overrides = {}) {
  const composition = scripture.composition || {};
  const appearance = scripture.appearance || {};
  const gradient = scripture.gradient || {};
  const animation = scripture.animation || {};
  const current = scriptureText(scripture);

  const width = finite(composition.width, 1660);
  const height = finite(gradient.height, 430);
  const x = (1920 - width) / 2 + finite(composition.offsetX, 0);
  const y = 1080 - finite(composition.bottom, 28) - height;

  return createScene({
    ...overrides,
    name: overrides.name || "Scripture principal",
    kind: "scripture",
    metadata: {
      ...overrides.metadata,
      module: "scripture",
      sourceVersion: "1.9.0-beta.10",
      tags: ["scripture", scripture.design || "classic", scripture.format || "lower"]
    },
    components: [
      createSceneComponent("gradient", {
        id: "scripture-background",
        name: "Background",
        role: "background",
        transform: { x: 0, y: 1080 - height, width: 1920, height },
        style: {
          mode: gradient.mode,
          color: gradient.color,
          opacity: gradient.opacity,
          softness: gradient.softness,
          edgeFade: gradient.edgeFade,
          edgeFadeEnabled: gradient.edgeFadeEnabled,
          extendToBottom: gradient.extendToBottom,
          topOffset: gradient.topOffset,
          bottomExtension: gradient.bottomExtension
        }
      }),
      createSceneComponent("container", {
        id: "scripture-composition",
        name: "Composition",
        role: "composition",
        transform: {
          x, y, width, height,
          scaleX: composition.scaleX,
          scaleY: composition.scaleY
        },
        style: {
          design: scripture.design || "classic",
          format: scripture.format || "lower",
          alignment: composition.alignment || "center",
          paddingX: composition.horizontalPadding,
          columns: composition.columns,
          maxLines: composition.maxLines,
          balance: composition.balance
        },
        behavior: {
          layoutMode: composition.layoutMode || "automatic",
          editor: clone(composition.editor || {}),
          constraints: {
            horizontal: composition.editor?.constraints?.horizontal || "center",
            vertical: composition.editor?.constraints?.vertical || "bottom",
            resize: composition.editor?.constraints?.resize || "fixed",
            preserveAspectRatio:
              composition.editor?.constraints?.preserveAspectRatio !== false
          },
          guides: clone(composition.editor?.guides || [])
        },
        children: [
          createSceneComponent("text", {
            id: "scripture-reference",
            name: "Reference",
            role: "reference",
            transform: { x: 0, y: 0, width, height: 70 },
            style: {
              fontFamily: appearance.titleFont,
              fontSize: appearance.titleSize,
              fontWeight: appearance.titleWeight,
              color: appearance.titleColor,
              letterSpacing: appearance.letterSpacing
            },
            data: {
              binding: "scripture.reference",
              value: current.reference
            }
          }),
          createSceneComponent("divider", {
            id: "scripture-divider",
            name: "Divider",
            role: "divider",
            transform: { x: 0, y: 78, width, height: 2 },
            style: { color: appearance.lineColor }
          }),
          createSceneComponent("bible-verse", {
            id: "scripture-verse",
            name: "Verse",
            role: "verse",
            transform: { x: 0, y: 92, width, height: Math.max(1, height - 140) },
            style: {
              fontFamily: appearance.bodyFont,
              fontSize: appearance.bodySize,
              fontWeight: appearance.bodyWeight,
              color: appearance.textColor,
              lineHeight: appearance.lineHeight,
              letterSpacing: appearance.letterSpacing
            },
            data: {
              binding: "scripture.text",
              value: current.text,
              reference: current.reference,
              version: current.version,
              source: scripture.source || "manual"
            },
            behavior: {
              balance: composition.balance,
              maxLines: composition.maxLines,
              animation: clone(animation)
            }
          }),
          createSceneComponent("text", {
            id: "scripture-version",
            name: "Version",
            role: "version",
            transform: { x: 0, y: Math.max(0, height - 45), width, height: 40 },
            style: {
              fontFamily: appearance.titleFont,
              fontSize: Math.max(12, finite(appearance.titleSize, 44) * 0.42),
              fontWeight: appearance.titleWeight,
              color: appearance.titleColor
            },
            data: {
              binding: "scripture.version",
              value: current.version
            }
          })
        ]
      })
    ]
  });
}

export function synchronizeScriptureScene(scene, scripture = {}) {
  const fresh = createScriptureScene(scripture, {
    id: scene?.id,
    name: scene?.name || "Scripture principal",
    metadata: scene?.metadata
  });

  return {
    ...fresh,
    metadata: {
      ...fresh.metadata,
      createdAt: scene?.metadata?.createdAt || fresh.metadata.createdAt,
      updatedAt: now()
    }
  };
}

export function normalizeScene(scene) {
  if (!scene || scene.schema !== "bmms.scene") {
    throw new Error("Invalid BMMS scene.");
  }

  return createScene({
    ...scene,
    id: scene.id,
    metadata: scene.metadata,
    components: scene.components || []
  });
}

export function duplicateScene(scene, name) {
  const copy = clone(scene);
  return createScene({
    ...copy,
    id: undefined,
    name: name || `${scene.name} copia`,
    metadata: {
      ...copy.metadata,
      createdAt: undefined,
      updatedAt: undefined
    }
  });
}

export function findComponent(scene, componentId) {
  const visit = components => {
    for (const component of components || []) {
      if (component.id === componentId) return component;
      const nested = visit(component.children);
      if (nested) return nested;
    }
    return null;
  };

  return visit(scene?.components);
}

export { SCENE_SCHEMA_VERSION };
