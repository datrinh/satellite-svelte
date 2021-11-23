<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let type = "text";
  export let placeholder: string;
  export let value: string;
  export let required = false;

  const dispatch = createEventDispatcher();

  const onInput = (ev) => {
    value = ev.target.value;
    dispatch("input", value);
  };
</script>

<input {type} {placeholder} {value} {required} on:input={onInput} />

<style lang="scss">
  @import "../styles/variables";
  input {
    padding: 0.5rem;
    background-color: $gray-light;
    border: none;
    margin-bottom: 1rem;
    height: $input-height;
    border-radius: $input-radius;
    font-size: 0.75rem;
    width: 100%;
  }
</style>
