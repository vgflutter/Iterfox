// Deliberately incomplete input normalization. This is the demo's initial bug.
export function avatarLabel(name) {
  return name.trim()[0].toUpperCase();
}

// A conversation check exposes this second defect after the first check passes.
export function dialogue(names) {
  return names.map(name => `${avatarLabel(name)}: Hello!`).join('\n');
}
