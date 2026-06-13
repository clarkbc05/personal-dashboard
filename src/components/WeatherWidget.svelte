<script>
  import { onMount } from 'svelte';

  // WMO weather interpretation codes → human label + emoji
  // Full spec: https://open-meteo.com/en/docs#weathervariables
  const WMO = {
    0:  { label: 'Clear sky',        emoji: '☀️' },
    1:  { label: 'Mostly clear',     emoji: '🌤️' },
    2:  { label: 'Partly cloudy',    emoji: '⛅' },
    3:  { label: 'Overcast',         emoji: '☁️' },
    45: { label: 'Fog',              emoji: '🌫️' },
    48: { label: 'Icy fog',          emoji: '🌫️' },
    51: { label: 'Light drizzle',    emoji: '🌦️' },
    53: { label: 'Drizzle',          emoji: '🌦️' },
    55: { label: 'Heavy drizzle',    emoji: '🌧️' },
    61: { label: 'Light rain',       emoji: '🌧️' },
    63: { label: 'Rain',             emoji: '🌧️' },
    65: { label: 'Heavy rain',       emoji: '🌧️' },
    71: { label: 'Light snow',       emoji: '🌨️' },
    73: { label: 'Snow',             emoji: '❄️' },
    75: { label: 'Heavy snow',       emoji: '❄️' },
    77: { label: 'Snow grains',      emoji: '🌨️' },
    80: { label: 'Light showers',    emoji: '🌦️' },
    81: { label: 'Showers',          emoji: '🌧️' },
    82: { label: 'Heavy showers',    emoji: '⛈️' },
    85: { label: 'Snow showers',     emoji: '🌨️' },
    86: { label: 'Heavy snow showers', emoji: '❄️' },
    95: { label: 'Thunderstorm',     emoji: '⛈️' },
    96: { label: 'Thunderstorm + hail', emoji: '⛈️' },
    99: { label: 'Thunderstorm + hail', emoji: '⛈️' },
  };

  function interpret(code) {
    return WMO[code] ?? { label: 'Unknown', emoji: '🌡️' };
  }

  let loading = true;
  let error = null;
  let weather = null;

  onMount(async () => {
    try {
      const url =
        'https://api.open-meteo.com/v1/forecast' +
        '?latitude=32.22&longitude=-98.20' +
        '&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,relativehumidity_2m' +
        '&temperature_unit=fahrenheit' +
        '&windspeed_unit=mph' +
        '&timezone=America%2FChicago';

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const c = data.current;

      weather = {
        temp:       Math.round(c.temperature_2m),
        feelsLike:  Math.round(c.apparent_temperature),
        code:       c.weathercode,
        wind:       Math.round(c.windspeed_10m),
        humidity:   c.relativehumidity_2m,
        ...interpret(c.weathercode),
      };
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });
</script>

<div class="panel">
  <div class="panel-title">Weather — Stephenville, TX</div>

  {#if loading}
    <div class="state-msg">Loading...</div>

  {:else if error}
    <div class="state-msg error">Failed to load weather<br /><span class="error-detail">{error}</span></div>

  {:else if weather}
    <div class="main">
      <span class="emoji">{weather.emoji}</span>
      <div class="temps">
        <span class="temp">{weather.temp}°F</span>
        <span class="feels">Feels like {weather.feelsLike}°F</span>
      </div>
    </div>

    <div class="condition">{weather.label}</div>

    <div class="details">
      <div class="detail">
        <span class="detail-label">Humidity</span>
        <span class="detail-value">{weather.humidity}%</span>
      </div>
      <div class="detail">
        <span class="detail-label">Wind</span>
        <span class="detail-value">{weather.wind} mph</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .state-msg {
    font-size: 0.85rem;
    color: var(--text-muted);
    padding: 0.5rem 0;
    line-height: 1.6;
  }

  .state-msg.error {
    color: var(--status-down);
  }

  .error-detail {
    font-size: 0.75rem;
    color: var(--text-dim);
  }

  .main {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.4rem;
  }

  .emoji {
    font-size: 2.4rem;
    line-height: 1;
  }

  .temps {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .temp {
    font-size: 2rem;
    font-weight: 300;
    color: var(--text);
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .feels {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .condition {
    font-size: 0.9rem;
    color: var(--accent-bright);
    font-weight: 500;
    margin-bottom: 0.9rem;
  }

  .details {
    display: flex;
    gap: 1.25rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
  }

  .detail {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .detail-label {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-dim);
  }

  .detail-value {
    font-size: 0.875rem;
    color: var(--text);
  }
</style>
