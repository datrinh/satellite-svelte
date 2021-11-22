<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let successTitle: string;
  export let successDescription: string;

  const dispatch = createEventDispatcher();
</script>

<section class="charles-newsletter-done" on:click={() => dispatch("click")}>
  <div class="content">
    <h1 class="text-5xl">
      <!-- <img src="@/assets/wa.svg" alt="Whatsapp Logo" height="36" /> -->
      {successTitle}
    </h1>

    <p class="text-base">
      {successDescription}
    </p>
  </div>
</section>

<style lang="scss">
  @import "../styles/variables";

  .charles-newsletter-done {
    background-color: $green-whatsapp;
    color: white;
    padding: 2rem;

    h1 {
      font-size: 3rem;
    }
    p {
      font-size: 1.5rem;
    }

    .content {
      max-width: $newsletter-content;
      margin: auto;
    }
  }
</style>
