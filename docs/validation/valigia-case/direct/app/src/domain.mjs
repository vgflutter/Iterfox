const VERSION = 1;
const MAX_ITEMS = 500;
const EDITABLE_FIELDS = new Set(['name', 'quantity', 'category', 'packed']);
let idSequence = 0;

function fail(message, field) {
  const error = new Error(message);
  if (field) error.field = field;
  throw error;
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function cleanText(value, maximum, label, field) {
  if (typeof value !== 'string') fail(`${label}: inserisci un testo.`, field);
  const text = value.trim();
  const length = Array.from(text).length;
  if (length < 1 || length > maximum) {
    fail(`${label}: usa da 1 a ${maximum} caratteri.`, field);
  }
  return text;
}

function checkedQuantity(value) {
  if (!Number.isInteger(value) || value < 1 || value > 99) {
    fail('Quantità: inserisci un numero intero da 1 a 99.', 'quantity');
  }
  return value;
}

function checkedPacked(value) {
  if (typeof value !== 'boolean') fail('Preparato deve essere un valore booleano.', 'packed');
  return value;
}

// Returns fresh, validated records; no caller-owned data is ever changed.
function checkedState(state) {
  if (!isRecord(state) || state.version !== VERSION) {
    fail('Formato della lista non valido: è richiesta la versione 1.');
  }
  if (!Array.isArray(state.items) || state.items.length > MAX_ITEMS) {
    fail('La lista deve contenere un elenco di massimo 500 oggetti.');
  }
  const ids = new Set();
  const items = Array.from(state.items, (item, index) => {
    if (!isRecord(item)) fail(`Oggetto ${index + 1}: dati non validi.`);
    if (typeof item.id !== 'string' || !item.id.trim() || Array.from(item.id).length > 100) {
      fail(`Oggetto ${index + 1}: ID non valido (da 1 a 100 caratteri).`);
    }
    if (ids.has(item.id)) fail(`Oggetto ${index + 1}: ID duplicato.`);
    ids.add(item.id);
    return {
      id: item.id,
      name: cleanText(item.name, 80, 'Nome oggetto', 'name'),
      quantity: checkedQuantity(item.quantity),
      category: cleanText(item.category, 40, 'Categoria', 'category'),
      packed: checkedPacked(item.packed),
    };
  });
  return {version: VERSION, items};
}

function newId(items) {
  const ids = new Set(items.map(item => item.id));
  let id;
  do {
    idSequence += 1;
    id = `v-${Date.now().toString(36)}-${idSequence.toString(36)}`;
  } while (ids.has(id));
  return id;
}

export function emptyList() {
  return {version: VERSION, items: []};
}

export function addItem(state, input) {
  const next = checkedState(state);
  if (!isRecord(input)) fail('Inserisci i dati del nuovo oggetto.');
  if (next.items.length >= MAX_ITEMS) fail('Hai raggiunto il limite di 500 oggetti.');
  const item = {
    id: newId(next.items),
    name: cleanText(input.name, 80, 'Nome oggetto', 'name'),
    quantity: checkedQuantity(input.quantity),
    category: input.category === undefined
      ? 'Generale'
      : cleanText(input.category, 40, 'Categoria', 'category'),
    packed: false,
  };
  return {version: VERSION, items: [...next.items, item]};
}

export function updateItem(state, id, patch) {
  const next = checkedState(state);
  const index = next.items.findIndex(item => item.id === id);
  if (index === -1) fail('Oggetto non trovato nella lista.');
  if (!isRecord(patch)) fail('Le modifiche devono essere un oggetto.');
  if (Object.keys(patch).some(key => !EDITABLE_FIELDS.has(key))) {
    fail('Puoi modificare soltanto nome, quantità, categoria e stato preparato.');
  }
  const item = {...next.items[index]};
  if (Object.hasOwn(patch, 'name')) item.name = cleanText(patch.name, 80, 'Nome oggetto', 'name');
  if (Object.hasOwn(patch, 'quantity')) item.quantity = checkedQuantity(patch.quantity);
  if (Object.hasOwn(patch, 'category')) item.category = cleanText(patch.category, 40, 'Categoria', 'category');
  if (Object.hasOwn(patch, 'packed')) item.packed = checkedPacked(patch.packed);
  next.items[index] = item;
  return next;
}

export function removeItem(state, id) {
  const next = checkedState(state);
  const index = next.items.findIndex(item => item.id === id);
  if (index === -1) fail('Oggetto non trovato nella lista.');
  return {version: VERSION, items: next.items.filter((_, i) => i !== index)};
}

export function summary(state) {
  const {items} = checkedState(state);
  const total = items.reduce((sum, item) => sum + item.quantity, 0);
  const packed = items.reduce((sum, item) => sum + (item.packed ? item.quantity : 0), 0);
  return {total, packed, remaining: total - packed};
}

export function exportList(state) {
  return JSON.stringify(checkedState(state), null, 2);
}

export function importList(jsonText) {
  if (typeof jsonText !== 'string') fail('Il backup deve essere un testo JSON.');
  let data;
  try {
    data = JSON.parse(jsonText);
  } catch {
    fail('Il backup non contiene un JSON valido.');
  }
  return checkedState(data);
}
