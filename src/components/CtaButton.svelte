<script lang="ts">
  export let type = "button";
</script>

<button {type}>
  <slot />
</button>

<style>
  button {
    padding: 0.5rem;
    cursor: pointer;
    background-color: #00c40a;
    border-radius: 1rem;
    border: none;
    color: white;
  }
</style>
