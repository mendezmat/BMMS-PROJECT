const SUPPORTED_TYPES = new Set(["none", "fade", "slide", "scale", "wipe"]);
const SUPPORTED_DIRECTIONS = new Set(["left", "right", "up", "down"]);
const SUPPORTED_EASINGS = new Set([
  "linear",
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out"
]);

export function createAnimationConfig(overrides = {}) {
  return {
    enabled: overrides.enabled === true,
    type: normalizeAnimationType(overrides.type),
    duration: clampNumber(overrides.duration, 0, 10000, 600),
    delay: clampNumber(overrides.delay, 0, 10000, 0),
    easing: normalizeEasing(overrides.easing),
    direction: normalizeDirection(overrides.direction),
    distance: clampNumber(overrides.distance, 0, 2000, 120)
  };
}

export function normalizeAnimationSet(animation = {}) {
  return {
    enter: createAnimationConfig(animation.enter),
    exit: createAnimationConfig(animation.exit)
  };
}

export function animationToCss(config, phase = "enter") {
  const animation = createAnimationConfig(config);
  if (!animation.enabled || animation.type === "none") {
    return {
      keyframes: [],
      options: {
        duration: 0,
        delay: 0,
        easing: animation.easing,
        fill: "both"
      }
    };
  }

  const start = phase === "enter" ? fromFrame(animation) : { opacity: 1, transform: "none" };
  const end = phase === "enter" ? { opacity: 1, transform: "none" } : fromFrame(animation);

  return {
    keyframes: [start, end],
    options: {
      duration: animation.duration,
      delay: animation.delay,
      easing: animation.easing,
      fill: "both"
    }
  };
}

function fromFrame(animation) {
  if (animation.type === "fade") {
    return { opacity: 0, transform: "none" };
  }

  if (animation.type === "scale") {
    return { opacity: 0, transform: "scale(0.82)" };
  }

  if (animation.type === "wipe") {
    return {
      opacity: 1,
      clipPath: wipeClip(animation.direction),
      transform: "none"
    };
  }

  if (animation.type === "slide") {
    const offset = slideOffset(animation.direction, animation.distance);
    return {
      opacity: 0,
      transform: `translate(${offset.x}px, ${offset.y}px)`
    };
  }

  return { opacity: 1, transform: "none" };
}

function slideOffset(direction, distance) {
  if (direction === "right") return { x: distance, y: 0 };
  if (direction === "up") return { x: 0, y: -distance };
  if (direction === "down") return { x: 0, y: distance };
  return { x: -distance, y: 0 };
}

function wipeClip(direction) {
  if (direction === "right") return "inset(0 100% 0 0)";
  if (direction === "up") return "inset(100% 0 0 0)";
  if (direction === "down") return "inset(0 0 100% 0)";
  return "inset(0 0 0 100%)";
}

function normalizeAnimationType(type) {
  const value = String(type || "none").toLowerCase();
  return SUPPORTED_TYPES.has(value) ? value : "none";
}

function normalizeDirection(direction) {
  const value = String(direction || "left").toLowerCase();
  return SUPPORTED_DIRECTIONS.has(value) ? value : "left";
}

function normalizeEasing(easing) {
  const value = String(easing || "ease-out").toLowerCase();
  return SUPPORTED_EASINGS.has(value) ? value : "ease-out";
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}
