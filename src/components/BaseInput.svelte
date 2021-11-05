<script lang="ts">
  export let type = "text";
  export let placeholder = "";
  export let value = undefined;
</script>

<input {type} {placeholder} {value} />

<style>
  input {
    padding: 0.5rem;
    background-color: #f3f3f3;
    border: none;
  }
</style>
