<script>
  import { milestones as defaultMilestones } from '../data.js';

  const STORAGE_KEY = 'dashboard-milestones';

  let milestones =
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') ?? defaultMilestones;

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones));
  }

  function toggle(id) {
    const updated = milestones.map(m => m.id === id ? { ...m, done: !m.done } : m);
    milestones = updated;
    save();
    if (updated.find(m => m.id === id)?.done) {
      setTimeout(() => {
        milestones = milestones.filter(m => m.id !== id);
        save();
      }, 600);
    }
  }

  function remove(id) {
    milestones = milestones.filter(m => m.id !== id);
    save();
  }

  let newText = '';

  function add() {
    const text = newText.trim();
    if (!text) return;
    milestones = [...milestones, { id: Date.now(), text, done: false }];
    newText = '';
    save();
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') add();
  }

  $: doneCount = milestones.filter(m => m.done).length;
</script>

<div class="panel">
  <div class="header-row">
    <span class="panel-title" style="margin-bottom:0">Homelab Milestones</span>
    <span class="progress">{doneCount}/{milestones.length}</span>
  </div>

  <ul class="list">
    {#each milestones as item (item.id)}
      <li class="item-row">
        <button class="row" class:done={item.done} on:click={() => toggle(item.id)}>
          <span class="checkbox" aria-hidden="true">{item.done ? '✓' : ''}</span>
          <span class="text">{item.text}</span>
        </button>
        <button class="remove-btn" on:click={() => remove(item.id)} title="Remove">×</button>
      </li>
    {/each}
  </ul>

  <div class="add-row">
    <input
      type="text"
      placeholder="Add a milestone..."
      bind:value={newText}
      on:keydown={handleKeydown}
    />
  </div>
</div>

<style>
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .progress {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
  }

  .list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-bottom: 0.75rem;
  }

  .item-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.5rem 0.6rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
    user-select: none;
    transition: background 0.1s;
    flex: 1;
    background: none;
    border: none;
    color: var(--text);
    text-align: left;
  }

  .row:hover {
    background: var(--surface-hover);
  }

  .checkbox {
    width: 16px;
    height: 16px;
    border: 1.5px solid var(--border-bright);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: var(--accent-bright);
    flex-shrink: 0;
    transition: background 0.15s, border-color 0.15s;
  }

  .row.done .checkbox {
    background: var(--accent);
    border-color: var(--accent-mid);
  }

  .text {
    font-size: 0.875rem;
    transition: color 0.15s;
  }

  .row.done .text {
    color: var(--text-dim);
    text-decoration: line-through;
  }

  .remove-btn {
    background: none;
    border: none;
    color: var(--text-dim);
    font-size: 1rem;
    line-height: 1;
    padding: 0.25rem 0.4rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.15s, color 0.15s;
    flex-shrink: 0;
  }

  .item-row:hover .remove-btn {
    opacity: 1;
  }

  .remove-btn:hover {
    color: var(--text);
  }

  .add-row input {
    width: 100%;
    background: var(--surface-hover);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text);
    padding: 0.45rem 0.7rem;
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.15s;
  }

  .add-row input:focus {
    border-color: var(--accent-mid);
  }

  .add-row input::placeholder {
    color: var(--text-dim);
  }
</style>
