<script>
  import { onMount, onDestroy } from 'svelte';

  let now = new Date();
  let interval;

  // onMount runs after the component is added to the DOM.
  // We start a 1-second interval here so the clock ticks live.
  onMount(() => {
    interval = setInterval(() => {
      now = new Date(); // reassigning 'now' triggers Svelte to re-render anything using it
    }, 1000);
  });

  // onDestroy is cleanup — always clear intervals to avoid memory leaks.
  onDestroy(() => clearInterval(interval));

  // $: means "reactive statement" — re-runs whenever the variables on the
  // right side change. So every time 'now' updates, all of these recalculate.
  $: hours = now.getHours();
  $: greeting =
    hours < 12 ? 'Good morning' :
    hours < 17 ? 'Good afternoon' :
                 'Good evening';

  $: timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  $: dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
</script>

<header>
  <div class="greeting">
    <span class="greet-text">{greeting}, Clark</span>
    <span class="date">{dateStr}</span>
  </div>
  <div class="clock">{timeStr}</div>
</header>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .greeting {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .greet-text {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--accent-bright);
  }

  .date {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .clock {
    font-size: 2rem;
    font-weight: 300;
    font-variant-numeric: tabular-nums;
    color: var(--text);
    letter-spacing: 0.05em;
  }
</style>
