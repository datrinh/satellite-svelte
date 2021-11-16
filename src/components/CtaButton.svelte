<script lang="ts">
  export let type = "button";
</script>

<button {type}>
  <slot />
</button>

<style lang="scss">
  @import "../styles/variables";

  button {
    box-sizing: border-box;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    background-color: $green-whatsapp;
    border-radius: 2rem;
    border: none;
    color: white;
    height: $button-height;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
