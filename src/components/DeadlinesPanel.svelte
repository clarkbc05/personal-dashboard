<script>
  import { milestones as defaultMilestones } from '../data.js';

  const STORAGE_KEY = 'dashboard-milestones';

  let milestones =
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') ?? defaultMilestones;

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones));
  }

  function toggle(id) {
    milestones = milestones.map(m => m.id === id ? { ...m, done: !m.done } : m);
    save();
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
      <li>
        <button class="row" class:done={item.done} on:click={() => toggle(item.id)}>
          <span class="checkbox" aria-hidden="true">{item.done ? '✓' : ''}</span>
          <span class="text">{item.text}</span>
        </button>
      </li>
    {/each}
  </ul>
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
    width: 100%;
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
</style>
