<script>
  import { quickLinks } from '../data.js';
</script>

<div class="panel">
  <div class="panel-title">Quick Links</div>
  <div class="grid">
    {#each quickLinks as link}
      <a class="link-card" href={link.url} target="_blank" rel="noreferrer">
        <span class="icon">{link.icon}</span>
        <span class="name">{link.name}</span>
      </a>
    {/each}
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
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
  }

  .link-card:hover {
    border-color: var(--accent-mid);
    background: #1e321e;
  }

  .icon {
    font-size: 1rem;
    line-height: 1;
  }

  .name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
