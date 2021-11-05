<script lang="ts">
  import NewsletterOptIn from "./satellites/NewsletterOptIn.svelte";
  import BubbleButton from "./satellites/BubbleButton.svelte";

  let title = undefined;
</script>

<main>
  <input type="text" bind:value={title} placeholder="Title" />
  <NewsletterOptIn heading={title} />
  <BubbleButton />
</main>
