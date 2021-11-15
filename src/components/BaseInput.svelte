<script lang="ts">
  export let type = "text";
  export let placeholder: string;
  export let value: string;
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
    border-radius: $input-radius;
  }
</style>
