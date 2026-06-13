<script>
  import Header from './components/Header.svelte';
  import UptimePanel from './components/UptimePanel.svelte';
  import ProjectsPanel from './components/ProjectsPanel.svelte';
  import TasksPanel from './components/TasksPanel.svelte';
  import DeadlinesPanel from './components/DeadlinesPanel.svelte';
  import QuickLinks from './components/QuickLinks.svelte';
  import WeatherWidget from './components/WeatherWidget.svelte';
</script>

<div class="app">
  <Header />
  <main class="grid">
    <div class="area-uptime"><UptimePanel /></div>
    <div class="area-projects"><ProjectsPanel /></div>
    <div class="area-tasks"><TasksPanel /></div>
    <div class="area-deadlines"><DeadlinesPanel /></div>
    <div class="area-links"><QuickLinks /></div>
    <div class="area-weather"><WeatherWidget /></div>
  </main>
</div>

<style>
  /* --- Global reset and CSS variables --- */
  :global(*, *::before, *::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(:root) {
    --bg:             #0c180c;
    --surface:        #132013;
    --surface-hover:  #1b2f1b;
    --accent:         #2E5A2E;
    --accent-mid:     #4a8c4a;
    --accent-bright:  #6dcf6d;
    --text:           #d6ead6;
    --text-muted:     #7aaa7a;
    --text-dim:       #4a6a4a;
    --border:         #263f26;
    --border-bright:  #3a6a3a;
    --status-up:      #4ade80;
    --status-down:    #f87171;
    --status-warn:    #fb923c;
    --radius:         8px;
    --radius-sm:      4px;
  }

  :global(body) {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    min-height: 100vh;
  }

  :global(button) {
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
  }

  /* --- Panel card base style, shared across all components --- */
  :global(.panel) {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem;
    height: 100%;
  }

  :global(.panel-title) {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  /* --- Layout --- */
  .app {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.25rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "uptime   uptime   uptime"
      "projects projects tasks"
      "deadlines links    weather";
    gap: 1rem;
    margin-top: 1rem;
  }

  .area-uptime    { grid-area: uptime; }
  .area-projects  { grid-area: projects; }
  .area-tasks     { grid-area: tasks; }
  .area-deadlines { grid-area: deadlines; }
  .area-links     { grid-area: links; }
  .area-weather   { grid-area: weather; }
</style>
