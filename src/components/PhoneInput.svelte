<script lang="ts">
  import { DEFAULT_PHONE_PREFIXES } from "@/config";
  import { createEventDispatcher } from "svelte";
  import CInput from "./BaseInput.svelte";

  export let prefix = "+49";
  export let number = "";
  export let value = `${prefix} ${number}`;
  export let placeholder: string;
  export let required = false;
  export let allowedPrefixes = DEFAULT_PHONE_PREFIXES;

  const dispatch = createEventDispatcher();

  const removeLeadingZero = (number: string): string => {
    return number.substr(0, 1) === "0" ? number.substr(1) : number;
  };

  const sanitizeNumber = (number: string): string => {
    return removeLeadingZero(number);
  };

  const onInput = () => {
    value = `${prefix}${sanitizeNumber(number)}`;
    console.log("value", value);
    dispatch("input", value);
  };
</script>

<div class="phone-input">
  <select
    class="phone-input-prefix-select"
    {required}
    bind:value={prefix}
    on:change={onInput}
  >
    {#each allowedPrefixes as prefix}
      <option>{prefix}</option>
    {/each}
  </select>

  <CInput
    type="tel"
    {placeholder}
    {required}
    bind:value={number}
    on:input={onInput}
  />
</div>

<style lang="scss">
  @import "../styles/variables";

  .phone-input {
    display: flex;

    .phone-input-prefix-select {
      height: $input-height;
      border-radius: $input-radius;
      border: none;
      background-color: $gray-light;
      padding: 0.5rem;
      margin-right: 0.5rem;
    }
  }
</style>
