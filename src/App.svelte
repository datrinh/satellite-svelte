<script lang="ts">
  import NewsletterOptIn from "./lib/NewsletterOptIn.svelte";

  let title = undefined;
</script>

<main>
  <input type="text" bind:value={title} />
  <NewsletterOptIn heading={title} />
</main>
