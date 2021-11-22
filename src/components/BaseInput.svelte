<script lang="ts">
  export let type = "text";
  export let placeholder: string;
  export let value: string;

  const onInput = (ev) => (value = ev.target.value);
</script>

<input {type} {placeholder} {value} on:input={onInput} />

<style lang="scss">
  @import "../styles/variables";
  input {
    padding: 0.5rem;
    background-color: $gray-light;
    border: none;
    margin-bottom: 16px;
    height: $input-height;
    border-radius: $input-radius;
    font-size: 0.75rem;
  }
</style>
