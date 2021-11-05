<script lang="ts">
  export let type = "text";
  export let placeholder = "";
  export let value = undefined;
</script>

<input {type} {placeholder} {value} />

<style lang="scss">
  @import "../styles/variables";
  input {
    padding: 0.5rem;
    background-color: $gray-light;
    border: none;
    margin-bottom: 16px;
    height: 2rem;
  }
</style>
