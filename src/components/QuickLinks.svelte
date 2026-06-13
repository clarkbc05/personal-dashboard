<script>
  import { quickLinks as defaultLinks } from '../data.js';

  const STORAGE_KEY = 'dashboard-quicklinks';

  let links =
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') ?? defaultLinks;

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }

  let adding = false;
  let newIcon = '🔗';
  let newName = '';
  let newUrl  = '';

  function add() {
    const name = newName.trim();
    const url  = newUrl.trim();
    if (!name || !url) return;
    links = [...links, { id: Date.now(), name, url, icon: newIcon || '🔗' }];
    newName = '';
    newUrl  = '';
    newIcon = '🔗';
    adding  = false;
    save();
  }

  function remove(id) {
    links = links.filter(l => l.id !== id);
    save();
  }

  function handleKeydown(e) {
    if (e.key === 'Enter')  add();
    if (e.key === 'Escape') adding = false;
  }
</script>

<div class="panel">
  <div class="header-row">
    <span class="panel-title" style="margin-bottom:0">Quick Links</span>
    <button class="add-btn" on:click={() => (adding = !adding)} title="Add link">+</button>
  </div>

  {#if adding}
    <div class="add-form">
      <input class="icon-input" type="text" bind:value={newIcon} maxlength="2" placeholder="🔗" />
      <input type="text" bind:value={newName} placeholder="Name" on:keydown={handleKeydown} />
      <input type="text" bind:value={newUrl}  placeholder="https://..." on:keydown={handleKeydown} />
      <button class="confirm-btn" on:click={add}>Add</button>
    </div>
  {/if}

  <div class="grid">
    {#each links as link (link.id)}
      <div class="link-wrap">
        <a class="link-card" href={link.url} target="_blank" rel="noreferrer">
          <span class="icon">{link.icon}</span>
          <span class="name">{link.name}</span>
        </a>
        <button class="remove-btn" on:click={() => remove(link.id)} title="Remove">×</button>
      </div>
    {/each}
  </div>
</div>

<style>
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .add-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--text-muted);
    border-radius: var(--radius-sm);
    width: 24px;
    height: 24px;
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.15s, color 0.15s;
  }

  .add-btn:hover {
    border-color: var(--accent-mid);
    color: var(--text);
  }

  .add-form {
    display: flex;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
    align-items: center;
  }

  .add-form input {
    background: var(--surface-hover);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text);
    padding: 0.4rem 0.6rem;
    font-size: 0.82rem;
    outline: none;
    transition: border-color 0.15s;
  }

  .add-form input:focus {
    border-color: var(--accent-mid);
  }

  .add-form input::placeholder {
    color: var(--text-dim);
  }

  .icon-input {
    width: 42px;
    text-align: center;
    flex-shrink: 0;
  }

  .add-form input:not(.icon-input):first-of-type {
    flex: 1;
  }

  .add-form input:last-of-type {
    flex: 2;
  }

  .confirm-btn {
    background: var(--accent);
    border: none;
    border-radius: var(--radius-sm);
    color: var(--text);
    font-size: 0.82rem;
    padding: 0.4rem 0.75rem;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s;
  }

  .confirm-btn:hover {
    background: var(--accent-mid);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .link-wrap {
    position: relative;
    display: flex;
  }

  .link-card {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.75rem;
    background: var(--surface-hover);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    text-decoration: none;
    color: var(--text);
    font-size: 0.85rem;
    transition: border-color 0.15s, background 0.15s;
    flex: 1;
    min-width: 0;
  }

  .link-card:hover {
    border-color: var(--accent-mid);
    background: #1e321e;
  }

  .remove-btn {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-dim);
    font-size: 0.7rem;
    line-height: 1;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
  }

  .link-wrap:hover .remove-btn {
    display: flex;
  }

  .remove-btn:hover {
    background: var(--surface-hover);
    color: var(--text);
    border-color: var(--border-bright);
  }

  .icon {
    font-size: 1rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
