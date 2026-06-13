<script>
  import { uptimeServices } from '../data.js';
</script>

<div class="panel">
  <div class="panel-title">Service Status</div>
  <div class="cards">
    {#each uptimeServices as service}
      <a class="card" href={service.url} target="_blank" rel="noreferrer">
        <span class="dot" class:up={service.status === 'up'} class:down={service.status === 'down'} class:warn={service.status === 'warn'}></span>
        <span class="name">{service.name}</span>
        <span class="label" class:up={service.status === 'up'} class:down={service.status === 'down'}>
          {service.status === 'up' ? 'Operational' : service.status === 'down' ? 'Down' : 'Degraded'}
        </span>
      </a>
    {/each}
  </div>
</div>

<style>
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .card {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 1rem;
    background: var(--surface-hover);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    text-decoration: none;
    color: var(--text);
    transition: border-color 0.15s;
  }

  .card:hover {
    border-color: var(--accent-mid);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dot.up   { background: var(--status-up); box-shadow: 0 0 6px var(--status-up); }
  .dot.down { background: var(--status-down); }
  .dot.warn { background: var(--status-warn); }

  .name {
    font-weight: 500;
    flex: 1;
  }

  .label {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .label.up   { color: var(--status-up); }
  .label.down { color: var(--status-down); }
</style>
