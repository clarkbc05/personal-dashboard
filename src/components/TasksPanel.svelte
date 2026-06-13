<script>
  import { defaultTasks } from '../data.js';

  // Build a storage key tied to today's date.
  // When the date rolls over, the old key is gone and tasks start fresh.
  const today = new Date().toISOString().split('T')[0]; // "2026-05-30"
  const STORAGE_KEY = `dashboard-tasks-${today}`;

  // Try to load today's saved state; if it doesn't exist, clone the defaults.
  let tasks =
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') ??
    defaultTasks.map(t => ({ ...t, done: false }));

  // Write to localStorage whenever tasks changes.
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // KEY REACTIVITY CONCEPT:
  // Svelte tracks *assignments*. Mutating an object property (tasks[i].done = true)
  // doesn't trigger a re-render because the reference to 'tasks' didn't change.
  // We fix this by reassigning the whole array with .map(), which creates a new array
  // reference — Svelte sees the assignment and updates the DOM.
  function toggle(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    save();
  }

  let newText = '';

  function add() {
    const trimmed = newText.trim();
    if (!trimmed) return;
    tasks = [...tasks, { id: Date.now(), text: trimmed, done: false }];
    newText = '';
    save();
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') add();
  }

  function reset() {
    tasks = defaultTasks.map(t => ({ ...t, done: false }));
    save();
  }

  $: doneCount = tasks.filter(t => t.done).length;
  $: allDone = tasks.length > 0 && doneCount === tasks.length;
</script>

<div class="panel">
  <div class="header-row">
    <span class="panel-title" style="margin-bottom:0">Today's Tasks</span>
    <span class="progress" class:complete={allDone}>{doneCount}/{tasks.length}</span>
  </div>

  {#if allDone}
    <div class="all-done">All done! ✓</div>
  {/if}

  <ul class="list">
    {#each tasks as task (task.id)}
      <li>
        <button class="task" class:done={task.done} on:click={() => toggle(task.id)}>
          <span class="checkbox" aria-hidden="true">{task.done ? '✓' : ''}</span>
          <span class="text">{task.text}</span>
        </button>
      </li>
    {/each}
  </ul>

  <div class="add-row">
    <input
      type="text"
      placeholder="Add a task..."
      bind:value={newText}
      on:keydown={handleKeydown}
    />
  </div>

  <button class="reset-btn" on:click={reset}>Reset to defaults</button>
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

  .progress.complete {
    color: var(--status-up);
    font-weight: 600;
  }

  .all-done {
    text-align: center;
    color: var(--status-up);
    font-size: 0.85rem;
    padding: 0.4rem 0 0.6rem;
  }

  .list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-bottom: 1rem;
  }

  .task {
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

  .task:hover {
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

  .task.done .checkbox {
    background: var(--accent);
    border-color: var(--accent-mid);
  }

  .text {
    font-size: 0.875rem;
    transition: color 0.15s;
  }

  .task.done .text {
    color: var(--text-dim);
    text-decoration: line-through;
  }

  .add-row {
    margin-bottom: 0.5rem;
  }

  input {
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

  input:focus {
    border-color: var(--accent-mid);
  }

  input::placeholder {
    color: var(--text-dim);
  }

  .reset-btn {
    background: none;
    border: none;
    color: var(--text-dim);
    font-size: 0.75rem;
    padding: 0;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .reset-btn:hover {
    color: var(--text-muted);
  }
</style>
