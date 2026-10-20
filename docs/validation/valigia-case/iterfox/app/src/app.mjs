import {
  emptyList, addItem, updateItem, removeItem, summary, exportList, importList,
} from './domain.mjs';

const STORAGE_KEY = 'valigia.v1';
const byId = id => document.getElementById(id);
const form = byId('add-form');
const nameInput = byId('item-name');
const quantityInput = byId('item-quantity');
const categoryInput = byId('item-category');
const filter = byId('category-filter');
const list = byId('item-list');
const backup = byId('backup-json');
const rows = new Map();
let state = emptyList();
let rowSequence = 0;

function showError(element, message) {
  element.textContent = message;
  element.hidden = false;
}

function clearError(element) {
  element.hidden = true;
  element.textContent = '';
}

function announce(message) {
  byId('action-status').textContent = message;
}

function loadState() {
  let stored;
  try {
    // Access to localStorage itself can throw when browser storage is blocked.
    stored = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    showStorageFailure();
    return;
  }
  if (stored === null) {
    byId('storage-status').textContent = 'Salvataggio automatico locale attivo.';
    return;
  }
  try {
    state = importList(stored);
    byId('storage-status').textContent = 'Lista recuperata da questo browser.';
  } catch {
    showError(byId('storage-error'), 'I dati locali non sono leggibili. La lista in memoria è vuota e i dati originali non sono stati sovrascritti. Puoi importare un backup valido o iniziare una nuova lista: la prima modifica sostituirà i dati locali.');
    byId('storage-status').textContent = 'Dati locali non caricati. Nessuna modifica salvata.';
  }
  // Loading, filtering and exporting never write to storage.
}

function showStorageFailure() {
  showError(byId('storage-error'), 'Il salvataggio locale non è disponibile: i dati non sono salvati. Puoi continuare a usare la lista in memoria, ma potresti perdere le modifiche alla chiusura o al ricaricamento. Esporta un backup e copialo in un file per conservarle.');
  byId('storage-status').textContent = 'Dati non salvati · lista disponibile solo in memoria.';
}

function saveState() {
  try {
    window.localStorage.setItem(STORAGE_KEY, exportList(state));
    clearError(byId('storage-error'));
    byId('storage-status').textContent = 'Lista salvata in questo browser.';
  } catch {
    showStorageFailure();
  }
}

function commit(nextState) {
  state = nextState;
  render();
  // A storage failure must not roll back a successful in-memory operation.
  saveState();
}

function renderSummary() {
  const counts = summary(state);
  for (const key of ['total', 'packed', 'remaining']) {
    byId(key).textContent = String(counts[key]);
  }
  const percent = counts.total === 0 ? 0 : Math.floor(counts.packed / counts.total * 100);
  const progress = byId('packing-progress');
  progress.max = Math.max(counts.total, 1);
  progress.value = counts.packed;
  progress.textContent = `${percent}%`;
  byId('progress-percent').textContent = `${percent}%`;
  byId('progress-caption').textContent = counts.total === 0
    ? 'La tua lista comincia qui.'
    : counts.remaining === 0
      ? 'Tutto pronto. Buon viaggio!'
      : `${counts.packed} di ${counts.total} unità preparate`;
}

function renderCategories() {
  const selected = filter.value;
  const categories = [...new Set(state.items.map(item => item.category))]
    .sort((a, b) => a.localeCompare(b, 'it'));
  const all = document.createElement('option');
  all.value = '';
  all.textContent = 'Tutte';
  const options = categories.map(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    return option;
  });
  filter.replaceChildren(all, ...options);
  filter.value = categories.includes(selected) ? selected : '';

  const suggestions = [...new Set([
    'Generale', 'Vestiti', 'Tecnologia', 'Cura personale', 'Documenti', ...categories,
  ])].sort((a, b) => a.localeCompare(b, 'it'));
  byId('category-suggestions').replaceChildren(...suggestions.map(category => {
    const option = document.createElement('option');
    option.value = category;
    return option;
  }));
}

function createRow(id) {
  const element = document.createElement('li');
  element.className = 'item';
  element.dataset.itemId = id;

  const packedLabel = document.createElement('label');
  packedLabel.className = 'packed-control';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  const details = document.createElement('span');
  details.className = 'item-details';
  const name = document.createElement('span');
  name.className = 'item-name';
  const meta = document.createElement('span');
  meta.className = 'item-meta';
  const category = document.createElement('span');
  category.className = 'category-tag';
  const packedText = document.createElement('span');
  packedText.className = 'packed-text';
  meta.append(category, packedText);
  details.append(name, meta);
  packedLabel.append(checkbox, details);

  const controls = document.createElement('div');
  controls.className = 'item-controls';
  const quantityLabel = document.createElement('label');
  quantityLabel.className = 'item-quantity-label';
  const quantityCaption = document.createElement('span');
  quantityCaption.textContent = 'Quantità';
  const quantity = document.createElement('input');
  quantity.type = 'number';
  quantity.min = '1';
  quantity.max = '99';
  quantity.step = '1';
  quantity.required = true;
  quantity.inputMode = 'numeric';
  quantityLabel.append(quantityCaption, quantity);
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'button button-delete';
  remove.textContent = 'Elimina';
  controls.append(quantityLabel, remove);

  const error = document.createElement('p');
  error.className = 'message error row-error';
  error.id = `row-error-${++rowSequence}`;
  error.setAttribute('role', 'alert');
  error.hidden = true;
  quantity.setAttribute('aria-describedby', error.id);
  checkbox.setAttribute('aria-describedby', error.id);
  element.append(packedLabel, controls, error);

  const row = {element, checkbox, name, category, packedText, quantity, remove, error};
  checkbox.addEventListener('change', () => {
    clearError(error);
    try {
      const next = updateItem(state, id, {packed: checkbox.checked});
      const item = next.items.find(item => item.id === id);
      commit(next);
      announce(`${item.name}: ${item.packed ? 'preparato' : 'da preparare'}.`);
    } catch (problem) {
      checkbox.checked = state.items.find(item => item.id === id)?.packed ?? false;
      showError(error, problem.message);
    }
  });

  function changeQuantity() {
    clearError(error);
    const current = state.items.find(item => item.id === id);
    if (!current) return;
    try {
      const next = updateItem(state, id, {quantity: quantity.valueAsNumber});
      if (current.quantity !== quantity.valueAsNumber) {
        commit(next);
        announce(`Quantità aggiornata per ${current.name}.`);
      }
    } catch (problem) {
      quantity.value = String(current.quantity);
      showError(error, `${problem.message} È stata mantenuta la quantità ${current.quantity}.`);
    }
  }
  quantity.addEventListener('change', changeQuantity);
  quantity.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      changeQuantity();
    }
  });

  remove.addEventListener('click', () => {
    const current = state.items.find(item => item.id === id);
    const visibleIds = [...list.children].map(element => element.dataset.itemId);
    const index = visibleIds.indexOf(id);
    const focusId = visibleIds[index + 1] ?? visibleIds[index - 1];
    try {
      const next = removeItem(state, id);
      commit(next);
      announce(`Eliminato: ${current.name}.`);
      (rows.get(focusId)?.checkbox ?? rows.values().next().value?.checkbox ?? nameInput).focus();
    } catch (problem) {
      showError(error, problem.message);
    }
  });
  return row;
}

function updateRow(row, item) {
  // User content is always assigned as text or a DOM property, never as HTML.
  row.name.textContent = item.name;
  row.category.textContent = item.category;
  row.packedText.textContent = item.packed ? 'Preparato' : 'Da preparare';
  row.checkbox.checked = item.packed;
  row.checkbox.setAttribute('aria-label', `Preparato: ${item.name}`);
  row.quantity.setAttribute('aria-label', `Quantità: ${item.name}`);
  row.remove.setAttribute('aria-label', `Elimina: ${item.name}`);
  row.element.classList.toggle('is-packed', item.packed);
  if (row.quantity.value !== String(item.quantity)) row.quantity.value = String(item.quantity);
}

function renderList() {
  const visible = state.items.filter(item => filter.value === '' || item.category === filter.value);
  const visibleIds = new Set(visible.map(item => item.id));
  for (const [id, row] of rows) {
    if (!visibleIds.has(id)) {
      row.element.remove();
      rows.delete(id);
    }
  }
  // Keep existing controls in place so editing and checking do not lose focus.
  let position = list.firstElementChild;
  for (const item of visible) {
    let row = rows.get(item.id);
    if (!row) {
      row = createRow(item.id);
      rows.set(item.id, row);
    }
    updateRow(row, item);
    if (row.element !== position) list.insertBefore(row.element, position);
    position = row.element.nextElementSibling;
  }
  list.hidden = visible.length === 0;
  byId('empty-state').hidden = visible.length !== 0;
  byId('item-count').textContent = filter.value === ''
    ? `${state.items.length} ${state.items.length === 1 ? 'oggetto' : 'oggetti'}`
    : `${visible.length} di ${state.items.length} oggetti`;

  const isEmpty = state.items.length === 0;
  byId('empty-title').textContent = isEmpty ? 'La valigia è ancora vuota' : 'Nessun oggetto in questa categoria';
  byId('empty-description').textContent = isEmpty
    ? 'Inizia dal primo oggetto. Poi spunta ciò che hai preparato: penseremo noi a contare.'
    : 'Scegli Tutte per ritrovare gli oggetti delle altre categorie, oppure aggiungine uno nuovo.';
  byId('empty-action').textContent = isEmpty ? 'Aggiungi il primo oggetto' : 'Mostra tutte le categorie';
}

function render() {
  renderSummary();
  renderCategories();
  renderList();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  clearError(byId('add-error'));
  for (const input of [nameInput, quantityInput, categoryInput]) input.removeAttribute('aria-invalid');
  try {
    const input = {name: nameInput.value, quantity: quantityInput.valueAsNumber};
    if (categoryInput.value.trim() !== '') input.category = categoryInput.value;
    const next = addItem(state, input);
    const added = next.items.at(-1);
    commit(next);
    nameInput.value = '';
    quantityInput.value = '1';
    const hiddenByFilter = filter.value !== '' && filter.value !== added.category;
    announce(`Aggiunto: ${added.name}.${hiddenByFilter ? ' Scegli Tutte nel filtro per vederlo.' : ''}`);
    nameInput.focus();
  } catch (problem) {
    showError(byId('add-error'), problem.message);
    const input = problem.message.startsWith('Quantità') ? quantityInput
      : problem.message.startsWith('Categoria') ? categoryInput
        : problem.message.startsWith('Nome oggetto') ? nameInput : null;
    if (input) {
      input.setAttribute('aria-invalid', 'true');
      input.focus();
    } else {
      byId('add-error').tabIndex = -1;
      byId('add-error').focus();
    }
  }
});

filter.addEventListener('change', () => {
  renderList();
  announce(filter.value === '' ? 'Mostrate tutte le categorie.' : `Categoria: ${filter.value}. I totali restano globali.`);
});

byId('empty-action').addEventListener('click', () => {
  if (state.items.length === 0) {
    nameInput.focus();
  } else {
    filter.value = '';
    renderList();
    filter.focus();
  }
});

byId('export-backup').addEventListener('click', () => {
  clearError(byId('backup-error'));
  backup.removeAttribute('aria-invalid');
  backup.value = exportList(state);
  byId('backup-status').textContent = 'Backup pronto. Copia il testo e conservalo in un file: il campo da solo non è una copia permanente.';
  backup.focus();
  backup.select();
});

byId('import-backup').addEventListener('click', () => {
  clearError(byId('backup-error'));
  byId('backup-status').textContent = '';
  backup.removeAttribute('aria-invalid');
  let imported;
  try {
    // Validate every row before replacing state, changing filters or saving.
    imported = importList(backup.value);
  } catch (problem) {
    showError(byId('backup-error'), `Importazione non riuscita. ${problem.message} La lista corrente è rimasta intatta.`);
    backup.setAttribute('aria-invalid', 'true');
    backup.focus();
    return;
  }
  for (const row of rows.values()) clearError(row.error);
  filter.value = '';
  commit(imported);
  byId('backup-status').textContent = 'Importazione completata: la lista è stata sostituita con il backup.';
  announce('Lista importata. Sono visibili tutte le categorie.');
});

loadState();
render();
