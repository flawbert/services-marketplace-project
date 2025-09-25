<script lang="ts">
  import type { ActionData as OriginalActionData } from './$types';
  
  type ServiceType = { id: number; name: string };
  type PageData = {
    serviceTypes: ServiceType[];
    // Talvez tenha outras propriedades
  };

  // Extend or redefine ActionData to include 'success' and 'error'
  type ActionData = {
    success?: boolean;
    error?: string;
    // Talvez tenha outras propriedades
  };
  
  export let data: PageData;
  export let form: ActionData;
  
  let variations = [{ id: 1, name: '', price: '', duration: '' }];
  
  function addVariation() {
    const newId = variations.length > 0 ? Math.max(...variations.map(v => v.id)) + 1 : 1;
    variations = [...variations, { id: newId, name: '', price: '', duration: '' }];
  }
  
  function removeVariation(id: number) {
    variations = variations.filter(v => v.id !== id);
  }
</script>

<main class="container">
  <h1>Manage Services</h1>

  <h2>Create new Service</h2>

  <form method="POST" action="?/createService">
    <div class="form-group">
      <label for="serviceTypeId">Service Type</label>
      <select name="serviceTypeId" id="serviceTypeId" required>
        {#if data.serviceTypes}
          {#each data.serviceTypes as type}
            <option value={type.id}>{type.name}</option>
          {/each}
        {/if}
      </select>
    </div>

    <div class="form-group">
      <label for="name">Service name</label>
      <input type="text" name="name" id="name" required />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea name="description" id="description" rows="3"></textarea>
    </div>

    <h3>Service variations</h3>
    {#each variations as variation (variation.id)}
      <div class="variation-card">
        <input type="text" placeholder="Variation name" bind:value={variation.name} required />
        <input type="number" step="0.01" placeholder="Price (R$)" bind:value={variation.price} required />
        <input type="number" placeholder="Duration (minutes)" bind:value={variation.duration} required />
        <button type="button" class="remove-btn" on:click={() => removeVariation(variation.id)}>Remove</button>
      </div>
    {/each}
    
    <input type="hidden" name="variations" value={JSON.stringify(variations)} />

    <button type="button" on:click={addVariation}>+ Add variation</button>
    <hr />
    <button type="submit" class="submit-btn">Save service</button>

     {#if form?.success}
      <p class="success">Service created successfull!</p>
    {/if}
     {#if form?.error}
      <p class="error">{form.error}</p>
    {/if}
  </form>
</main>

<style>
  .container { max-width: 800px; margin: 2rem auto; }
  .form-group { margin-bottom: 1rem; }
  label { display: block; margin-bottom: 0.5rem; }
  input, select, textarea { width: 100%; padding: 0.5rem; font-size: 1rem; }
  .variation-card {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr auto;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  .remove-btn, .submit-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .remove-btn { background-color: #f44336; color: white; }
  .submit-btn { background-color: #4CAF50; color: white; font-size: 1.2rem; }
  hr { margin: 1.5rem 0; }
  .success { color: green; }
  .error { color: red; }
</style>