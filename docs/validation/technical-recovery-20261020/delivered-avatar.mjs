export function avatarLabel(name) {
  const trimmedName = (name ?? '').trim();
  return trimmedName ? trimmedName[0].toUpperCase() : '?';
}

export function dialogue(names) {
  const labels = names.map(name => avatarLabel(name));
  return labels.map((label, index) => (
    index === 0 ? `${label}: Hello!` : `${label}: Hi, ${labels[0]}!`
  )).join('\n');
}
