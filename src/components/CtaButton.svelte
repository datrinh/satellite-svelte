<script lang="ts">
  export let type = "button";
</script>

<button {type}>
  <slot />
</button>

<style lang="scss">
  @import "../styles/variables";

  button {
    padding: 0.5rem;
    cursor: pointer;
    background-color: $green-whatsapp;
    border-radius: 1rem;
    border: none;
    color: white;
    height: $button-height;
  }
</style>
