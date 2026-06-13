<script>
  import { defaultProjects } from '../data.js';

  const STATUSES = ['In Progress', 'Live', 'Planned'];
  const STORAGE_KEY = 'dashboard-projects';

  // Load from localStorage, fall back to data.js defaults
  let projects = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') ?? defaultProjects;

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  function cycleStatus(id) {
    projects = projects.map(p => {
      if (p.id !== id) return p;
      const next = (STATUSES.indexOf(p.status) + 1) % STATUSES.length;
      return { ...p, status: STATUSES[next] };
    });
    save();
  }

  function remove(id) {
    projects = projects.filter(p => p.id !== id);
    save();
  }

  let newName = '';

  function add() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    const id = Date.now();
    projects = [...projects, { id, name: trimmed, status: 'In Progress' }];
    newName = '';
    save();
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') add();
  }
</script>

<div class="panel">
  <div class="panel-title">Active Projects</div>

  <ul class="list">
    {#each projects as project (project.id)}
      <li class="row">
        <span class="name">{project.name}</span>
        <button
          class="tag tag-{project.status.toLowerCase().replace(' ', '-')}"
          on:click={() => cycleStatus(project.id)}
          title="Click to change status"
        >
          {project.status}
        </button>
        <button class="remove" on:click={() => remove(project.id)} title="Remove">×</button>
      </li>
    {/each}
  </ul>

  <div class="add-row">
    <input
      type="text"
      placeholder="New project name..."
      bind:value={newName}
      on:keydown={handleKeydown}
    />
    <button class="add-btn" on:click={add}>Add</button>
  </div>
</div>

<style>
  .list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem 0.6rem;
    border-radius: var(--radius-sm);
    transition: background 0.1s;
  }

  .row:hover {
    background: var(--surface-hover);
  }

  .name {
    flex: 1;
    font-size: 0.9rem;
  }

  .tag {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2em 0.6em;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: opacity 0.15s;
    white-space: nowrap;
  }

  .tag:hover { opacity: 0.8; }

  .tag-live        { background: #143a14; color: #6dcf6d; }
  .tag-in-progress { background: #3a2c0a; color: #f0b840; }
  .tag-planned     { background: #0e1f3a; color: #60a8e0; }

  .remove {
    background: none;
    border: none;
    color: var(--text-dim);
    font-size: 1.1rem;
    line-height: 1;
    padding: 0 0.2rem;
    opacity: 0;
    transition: opacity 0.15s, color 0.15s;
  }

  .row:hover .remove {
    opacity: 1;
  }

  .remove:hover {
    color: var(--status-down);
  }

  .add-row {
    display: flex;
    gap: 0.5rem;
  }

  input {
    flex: 1;
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

  .add-btn {
    background: var(--accent);
    border: 1px solid var(--accent-mid);
    border-radius: var(--radius-sm);
    color: var(--text);
    padding: 0.45rem 0.9rem;
    font-size: 0.85rem;
    transition: background 0.15s;
  }

  .add-btn:hover {
    background: var(--accent-mid);
  }
</style>
