<script lang="ts">
  import type { PageData, ActionData } from './$types';
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

  let photos = [{ id: 1, url: '' }];
  function addPhoto() {
    const newId = photos.length > 0 ? Math.max(...photos.map(p => p.id)) + 1 : 1;
    photos = [...photos, { id: newId, url: '' }];
  }
  function removePhoto(id: number) {
    photos = photos.filter(p => p.id !== id);
  }
  $: photosField = JSON.stringify(photos.map(p => p.url).filter(Boolean));
  $: variationsField = JSON.stringify(
    variations.map(v => ({
      name: v.name,
      price: parseFloat(String(v.price)) || 0,
      duration: parseInt(String(v.duration)) || 0
    })).filter(v => v.name) 
  );
</script>

<main class="container">
  <h1>Manage Services</h1>
  <h2>Create new service</h2>

  <form method="POST" action="?/createService">
    <div class="form-group">
      <label for="serviceTypeId">Services types</label>
      <select name="serviceTypeId" id="serviceTypeId" required>
        {#if data.serviceTypes && data.serviceTypes.length > 0}
          {#each data.serviceTypes as type}
            <option value={type.id}>{type.name}</option>
          {/each}
        {:else}
          <option disabled>No services registered. Visit the admin area.</option>
        {/if}
      </select>
    </div>

    <div class="form-group">
      <label for="name">Service name</label>
      <input type="text" name="name" id="name" required />
    </div>

    <div class="form-group">
      <label for="description">Service description</label>
      <textarea name="description" id="description" rows="3"></textarea>
    </div>

    <h3>Service Photos (Links/URLs)</h3>
    {#each photos as photo (photo.id)}
      <div class="photo-card">
        <input type="url" placeholder="https://example.com/image.jpg" bind:value={photo.url} />
        <button type="button" class="remove-btn" on:click={() => removePhoto(photo.id)}>Delete</button>
      </div>
    {/each}
    <button type="button" on:click={addPhoto}>+ Add photo</button>
    <hr />
    
    <h3>Service variations</h3>
    {#each variations as variation (variation.id)}
      <div class="variation-card">
        <input type="text" placeholder="Variation name" bind:value={variation.name} required />
        <input type="number" step="0.01" placeholder="Price (R$)" bind:value={variation.price} required />
        <input type="number" placeholder="Duration (minutes)" bind:value={variation.duration} required />
        <button type="button" class="remove-btn" on:click={() => removeVariation(variation.id)}>Delete</button>
      </div>
    {/each}
    <button type="button" on:click={addVariation}>+ Add variation</button>
    <input type="hidden" name="photos" value={photosField} />
    <input type="hidden" name="variations" value={variationsField} />

    <hr />
    <button type="submit" class="submit-btn">Save Service</button>

    {#if form?.success}
    <p class="success">Service created successfully!</p>
    {/if}
    {#if form?.error}
    <p class="error">{form.error}</p>
    {/if}
  </form>
</main>

<style>
  .container { max-width: 800px; margin: 2rem auto; }
  hr { margin: 2rem 0; }
  .form-group { margin-bottom: 1rem; }
  label { display: block; margin-bottom: 0.5rem; }
  input, select, textarea { width: 100%; padding: 0.5rem; font-size: 1rem; box-sizing: border-box; }
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
  .photo-card {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    align-items: center;
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
  .success { color: green; }
  .error { color: red; }
</style>
