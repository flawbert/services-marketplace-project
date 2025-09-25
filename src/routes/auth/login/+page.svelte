<script lang="ts">
  export let form: any;
</script>

<main class="container">
  <h1>Provider Login</h1>
  <form method="POST" action="?/login">
    <div class="form-group">
      <label for="email">E-mail</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required />
    </div>

    {#if form?.error}
      <p class="error">{form.error}</p>
    {/if}

    <button type="submit">Login</button>
  </form>
</main>

<style>
  /* ... */
</style>