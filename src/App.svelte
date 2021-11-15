<script lang="ts">
  import NewsletterOptIn from "./satellites/NewsletterOptIn.svelte";
  import BubbleButton from "./satellites/BubbleButton.svelte";

  let title: string;
</script>

<main>
  <input type="text" bind:value={title} placeholder="Title" />
  <NewsletterOptIn {title} />
  <BubbleButton />
</main>
