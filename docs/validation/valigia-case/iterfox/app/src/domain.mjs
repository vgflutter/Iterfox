const VERSION = 1;
const MAX_ITEMS = 500;
const ITEM_FIELDS = ['id', 'name', 'quantity', 'category', 'packed'];
const EDITABLE_FIELDS = ['name', 'quantity', 'category', 'packed'];
const ADD_FIELDS = ['name', 'quantity', 'category'];
const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
let idSequence = 0;

function assertFields(value, allowed, required, label) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label}: deve essere un oggetto.`);
  }
  for (const key of Reflect.ownKeys(value)) {
    if (!allowed.includes(key)) {
      throw new Error(`${label}: campo non consentito.`);
    }
  }
  for (const key of required) {
    if (!hasOwn(value, key)) {
      throw new Error(`${label}: manca il campo ${key}.`);
    }
  }
}

function cleanText(value, maximum, label) {
  if (typeof value !== 'string') {
    throw new Error(`${label}: inserisci un testo.`);
  }
  const cleaned = value.trim();
  // Count Unicode code points; keep accents, emoji and HTML-like text intact.
  const length = [...cleaned].length;
  if (length < 1 || length > maximum) {
    throw new Error(`${label}: usa da 1 a ${maximum} caratteri.`);
  }
  return cleaned;
}

function assertQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    throw new Error('Quantità: inserisci un numero intero da 1 a 99.');
  }
}

function assertId(id) {
  if (typeof id !== 'string' || id.trim().length === 0 || id.length > 100) {
    throw new Error('ID: deve essere un testo non vuoto di massimo 100 caratteri.');
  }
}

function assertItem(item) {
  assertFields(item, ITEM_FIELDS, ITEM_FIELDS, 'Oggetto');
  assertId(item.id);
  // Stored data and backups must already be canonical: never repair imports.
  if (cleanText(item.name, 80, 'Nome oggetto') !== item.name) {
    throw new Error('Nome oggetto: rimuovi gli spazi iniziali e finali.');
  }
  if (cleanText(item.category, 40, 'Categoria') !== item.category) {
    throw new Error('Categoria: rimuovi gli spazi iniziali e finali.');
  }
  assertQuantity(item.quantity);
  if (typeof item.packed !== 'boolean') {
    throw new Error('Preparato: il valore deve essere booleano.');
  }
}

function assertState(state) {
  assertFields(state, ['version', 'items'], ['version', 'items'], 'Lista');
  if (state.version !== VERSION) {
    throw new Error('Versione della lista non supportata.');
  }
  if (!Array.isArray(state.items) || state.items.length > MAX_ITEMS) {
    throw new Error('La lista deve contenere un elenco di massimo 500 oggetti.');
  }
  const ids = new Set();
  for (const item of state.items) {
    assertItem(item);
    if (ids.has(item.id)) {
      throw new Error('La lista contiene ID duplicati.');
    }
    ids.add(item.id);
  }
}

function createId(items) {
  const ids = new Set(items.map(item => item.id));
  let id;
  // The sequence also avoids collisions when imports contain generated IDs.
  do {
    idSequence += 1;
    id = `item-${Date.now().toString(36)}-${idSequence.toString(36)}`;
  } while (ids.has(id));
  return id;
}

function findItemIndex(state, id) {
  assertId(id);
  const index = state.items.findIndex(item => item.id === id);
  if (index === -1) {
    throw new Error('Oggetto non trovato nella lista.');
  }
  return index;
}

export function emptyList() {
  return {version: VERSION, items: []};
}

export function addItem(state, input) {
  assertState(state);
  assertFields(input, ADD_FIELDS, ['name', 'quantity'], 'Nuovo oggetto');
  if (state.items.length >= MAX_ITEMS) {
    throw new Error('La lista può contenere al massimo 500 oggetti.');
  }
  const name = cleanText(input.name, 80, 'Nome oggetto');
  const category = hasOwn(input, 'category')
    ? cleanText(input.category, 40, 'Categoria')
    : 'Generale';
  assertQuantity(input.quantity);
  const item = {
    id: createId(state.items),
    name,
    quantity: input.quantity,
    category,
    packed: false,
  };
  return {version: VERSION, items: [...state.items, item]};
}

export function updateItem(state, id, patch) {
  assertState(state);
  const index = findItemIndex(state, id);
  assertFields(patch, EDITABLE_FIELDS, [], 'Modifica');
  const item = {...state.items[index], ...patch};
  if (hasOwn(patch, 'name')) {
    item.name = cleanText(patch.name, 80, 'Nome oggetto');
  }
  if (hasOwn(patch, 'category')) {
    item.category = cleanText(patch.category, 40, 'Categoria');
  }
  assertItem(item);
  const items = state.items.slice();
  items[index] = item;
  return {version: VERSION, items};
}

export function removeItem(state, id) {
  assertState(state);
  const index = findItemIndex(state, id);
  return {version: VERSION, items: state.items.filter((item, i) => i !== index)};
}

export function summary(state) {
  assertState(state);
  let total = 0;
  let packed = 0;
  for (const item of state.items) {
    total += item.quantity;
    if (item.packed) packed += item.quantity;
  }
  return {total, packed, remaining: total - packed};
}

export function exportList(state) {
  assertState(state);
  return JSON.stringify(state, null, 2);
}

export function importList(jsonText) {
  if (typeof jsonText !== 'string') {
    throw new Error('Backup JSON: inserisci un testo JSON.');
  }
  let state;
  try {
    state = JSON.parse(jsonText);
  } catch {
    throw new Error('Backup JSON non valido: controlla la sintassi.');
  }
  assertState(state);
  return state;
}
