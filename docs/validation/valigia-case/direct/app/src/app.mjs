import {emptyList, addItem, updateItem, removeItem, summary, exportList, importList} from './domain.mjs';

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
let saveState = 'ready';

function showError(id, message) {
  const element = byId(id);
  element.textContent = message;
  element.hidden = false;
}

function clearError(id) {
  const element = byId(id);
  element.hidden = true;
  element.textContent = '';
}

function load() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      try {
        state = importList(stored);
        saveState = 'saved';
      } catch {
        saveState = 'unreadable';
        showError('storage-error', 'I dati salvati non sono leggibili e non sono stati sovrascritti. Puoi importare un backup valido o iniziare una nuova lista: la prima modifica sostituirà i dati locali.');
      }
    }
  } catch {
    saveState = 'unavailable';
    showError('storage-error', 'Il browser non consente di leggere il salvataggio locale. Puoi usare la lista in memoria. Esporta un backup prima di chiudere o ricaricare la pagina per conservare i dati.');
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, exportList(state));
    saveState = 'saved';
    clearError('storage-error');
  } catch {
    saveState = 'unavailable';
    showError('storage-error', 'Le ultime modifiche non sono salvate sul dispositivo: il salvataggio locale non è riuscito. La lista resta utilizzabile in memoria. Esporta un backup prima di chiudere o ricaricare la pagina per non perdere le modifiche.');
  }
}

function commit(next, message) {
  state = next;
  persist();
  render();
  byId('action-status').textContent = message;
}

function renderCategories() {
  const categories = [...new Set(state.items.map(item => item.category))].sort((a, b) => a.localeCompare(b, 'it'));
  const selected = categories.includes(filter.value) ? filter.value : '';
  const options = [new Option('Tutte', ''), ...categories.map(category => new Option(category, category))];
  filter.replaceChildren(...options);
  filter.value = selected;

  const suggestions = [...new Set(['Vestiti', 'Documenti', 'Igiene', 'Tecnologia', 'Generale', ...categories])];
  byId('category-suggestions').replaceChildren(...suggestions.map(category => new Option(category, category)));
}

function createRow(id) {
  const element = document.createElement('li');
  element.className = 'item-row';
  element.dataset.itemId = id;

  const main = document.createElement('label');
  main.className = 'item-main';
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.className = 'item-check';
  const text = document.createElement('span');
  text.className = 'item-text';
  const name = document.createElement('span');
  name.className = 'item-name';
  const category = document.createElement('span');
  category.className = 'item-category';
  text.append(name, category);
  main.append(check, text);

  const quantityLabel = document.createElement('label');
  quantityLabel.className = 'item-quantity';
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
  remove.className = 'delete-button';
  // Static SVG only. User-supplied strings are always assigned with textContent.
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7m4-7v7');
  icon.append(path);
  remove.append(icon);

  check.addEventListener('change', () => {
    try {
      const next = updateItem(state, id, {packed: check.checked});
      clearError('list-error');
      commit(next, check.checked ? 'Oggetto preparato.' : 'Oggetto ancora da preparare.');
    } catch (error) {
      check.checked = state.items.find(item => item.id === id)?.packed ?? false;
      showError('list-error', error.message);
    }
  });

  quantity.addEventListener('change', () => {
    try {
      const next = updateItem(state, id, {quantity: quantity.valueAsNumber});
      clearError('list-error');
      commit(next, 'Quantità aggiornata.');
    } catch (error) {
      quantity.value = String(state.items.find(item => item.id === id).quantity);
      showError('list-error', `${error.message} La quantità precedente è stata mantenuta.`);
    }
  });

  remove.addEventListener('click', () => {
    try {
      const visibleRows = [...list.children];
      const index = visibleRows.indexOf(element);
      const focusTarget = visibleRows[index + 1]?.querySelector('.delete-button')
        ?? visibleRows[index - 1]?.querySelector('.delete-button')
        ?? nameInput;
      const next = removeItem(state, id);
      clearError('list-error');
      commit(next, 'Oggetto eliminato.');
      focusTarget.focus();
    } catch (error) {
      showError('list-error', error.message);
    }
  });

  element.append(main, quantityLabel, remove);
  return {element, check, name, category, quantity, remove};
}

function renderItems() {
  const ids = new Set(state.items.map(item => item.id));
  for (const [id, row] of rows) {
    if (!ids.has(id)) {
      row.element.remove();
      rows.delete(id);
    }
  }
  const visible = state.items.filter(item => !filter.value || item.category === filter.value);
  const visibleIds = new Set(visible.map(item => item.id));
  for (const element of [...list.children]) {
    if (!visibleIds.has(element.dataset.itemId)) element.remove();
  }
  visible.forEach((item, index) => {
    if (!rows.has(item.id)) rows.set(item.id, createRow(item.id));
    const row = rows.get(item.id);
    row.name.textContent = item.name;
    row.category.textContent = item.category;
    row.check.checked = item.packed;
    row.check.setAttribute('aria-label', `Preparato: ${item.name}`);
    row.quantity.setAttribute('aria-label', `Quantità: ${item.name}`);
    if (row.quantity.value !== String(item.quantity)) row.quantity.value = String(item.quantity);
    row.remove.setAttribute('aria-label', `Elimina: ${item.name}`);
    row.remove.title = `Elimina: ${item.name}`;
    row.element.classList.toggle('is-packed', item.packed);
    // Reuse existing controls to preserve keyboard focus during changes.
    if (list.children[index] !== row.element) list.insertBefore(row.element, list.children[index] ?? null);
  });

  const count = state.items.length;
  byId('list-count').textContent = `${count} ${count === 1 ? 'oggetto' : 'oggetti'} in lista${filter.value ? ` · ${visible.length} visibili` : ''}`;
  byId('empty-state').hidden = visible.length > 0;
  byId('empty-title').textContent = count === 0 ? 'La valigia è ancora vuota' : 'Nessun oggetto in questa categoria';
  byId('empty-copy').textContent = count === 0
    ? 'Comincia da un documento, un cambio o quel piccolo oggetto che vuoi sempre con te.'
    : 'Scegli un’altra categoria oppure aggiungi un nuovo oggetto.';
}

function render() {
  const totals = summary(state);
  for (const key of ['total', 'packed', 'remaining']) {
    document.querySelector(`[data-testid="${key}"]`).textContent = String(totals[key]);
  }
  byId('packing-progress').max = totals.total || 1;
  byId('packing-progress').value = totals.packed;
  byId('progress-description').textContent = totals.total === 0
    ? 'Inizia con il primo oggetto.'
    : totals.remaining === 0
      ? 'Tutto pronto. Buon viaggio!'
      : `${totals.packed} di ${totals.total} unità preparate`;
  const statusLabels = {
    ready: 'Lista pronta su questo dispositivo',
    saved: 'Salvato su questo dispositivo',
    unavailable: 'Modifiche non salvate · solo in memoria',
    unreadable: 'Dati locali da recuperare',
  };
  byId('save-status-text').textContent = statusLabels[saveState];
  byId('save-status').classList.toggle('save-status--warning', saveState === 'unavailable' || saveState === 'unreadable');
  renderCategories();
  renderItems();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  for (const input of [nameInput, quantityInput, categoryInput]) input.removeAttribute('aria-invalid');
  try {
    const next = addItem(state, {
      name: nameInput.value,
      quantity: quantityInput.valueAsNumber,
      category: categoryInput.value.trim() || undefined,
    });
    clearError('form-error');
    commit(next, 'Oggetto aggiunto alla lista.');
    nameInput.value = '';
    quantityInput.value = '1';
    nameInput.focus();
  } catch (error) {
    showError('form-error', error.message);
    const input = {name: nameInput, quantity: quantityInput, category: categoryInput}[error.field];
    if (input) {
      input.setAttribute('aria-invalid', 'true');
      input.focus();
    }
  }
});

filter.addEventListener('change', () => {
  renderItems();
  byId('action-status').textContent = filter.value ? `Categoria: ${filter.value}. I totali restano globali.` : 'Sono visibili tutte le categorie.';
});

byId('empty-add').addEventListener('click', () => nameInput.focus());

byId('export-backup').addEventListener('click', () => {
  clearError('backup-error');
  backup.removeAttribute('aria-invalid');
  backup.value = exportList(state);
  byId('backup-status').textContent = 'Backup pronto. Copia il testo e conservalo in un file per recuperare la lista.';
  backup.focus();
  backup.select();
});

byId('import-backup').addEventListener('click', () => {
  byId('backup-status').textContent = '';
  try {
    // Validate the complete document before changing state or localStorage.
    const next = importList(backup.value);
    clearError('backup-error');
    clearError('list-error');
    backup.removeAttribute('aria-invalid');
    filter.value = '';
    commit(next, 'Lista importata.');
    byId('backup-status').textContent = 'Backup importato: la lista è stata sostituita.';
  } catch (error) {
    backup.setAttribute('aria-invalid', 'true');
    showError('backup-error', `Backup non importato. ${error.message} La lista corrente è rimasta invariata.`);
    backup.focus();
  }
});

load();
render();
