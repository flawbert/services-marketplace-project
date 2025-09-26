<script lang="ts">
  import type { ActionData as OriginalActionData } from './$types';

  type ScheduleItem = {
    day_of_week: number;
    start_time: string;
    end_time: string;
  };

  type ActionData = {
    success?: boolean;
    error?: string;
    [key: string]: unknown;
  };

  type PageData = {
    schedule?: ScheduleItem[];
  };
  export let data: PageData;
  export let form: ActionData;

  const weekDays = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 0, name: 'Sunday' },
  ];
  let schedule = weekDays.map(day => {
    const savedDay = data.schedule?.find(d => d.day_of_week === day.id);
    return {
      day_of_week: day.id,
      name: day.name,
      active: !!savedDay,
      start_time: savedDay?.start_time?.substring(0, 5) || '09:00',
      end_time: savedDay?.end_time?.substring(0, 5) || '18:00'
    };
  });
  
  $: activeSchedule = schedule.filter(day => day.active);
</script>

<main class="container">
  <h1>My Availability Schedule</h1>
  <p>Mark the days of the week you work and set the start and end times.</p>

  <form method="POST" action="?/save">
    <div class="schedule-grid">
      {#each schedule as day, i}
        <div class="day-card" class:active={day.active}>
          <label class="day-label">
            <input type="checkbox" bind:checked={day.active} />
            {day.name}
          </label>
          {#if day.active}
            <div class="time-inputs">
              <label>
                Start:
                <input type="time" bind:value={day.start_time} />
              </label>
              <label>
                End:
                <input type="time" bind:value={day.end_time} />
              </label>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <input type="hidden" name="schedule" value={JSON.stringify(activeSchedule)} />

    <button type="submit">Save Schedule</button>

    {#if form?.success}
      <p class="success">Schedule saved successfully!</p>
    {/if}
    {#if form?.error}
      <p class="error">{form.error}</p>
    {/if}
  </form>
</main>

<style>
  .container { max-width: 700px; margin: 2rem auto; }
  .schedule-grid { display: grid; gap: 1rem; margin-bottom: 1.5rem; }
  .day-card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    transition: all 0.2s ease-in-out;
  }
  .day-card.active {
    border-color: #4CAF50;
    background-color: #f0fff0;
  }
  .day-label { font-size: 1.2rem; font-weight: bold; display: flex; align-items: center; gap: 0.5rem; }
  .time-inputs { display: flex; gap: 1.5rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee; }
  button { font-size: 1.1rem; padding: 0.7rem 1.5rem; }
  .success { color: green; }
  .error { color: red; }
</style>