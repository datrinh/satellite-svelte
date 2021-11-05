<script lang="ts">
  export let id;
  export let value = undefined;
</script>

<div class="satellite-checkbox">
  <input {id} type="checkbox" {value} />
  <label for={id}>
    <slot />
  </label>
</div>

<style lang="scss">
  .satellite-checkbox {
    display: flex;
    text-align: left;
    margin-bottom: 16px;

    label {
      cursor: pointer;
      width: fit-content;
    }
    input[type="checkbox"] {
      width: 24px;
      height: 24px;
      cursor: pointer;
      margin-right: 8px;
    }
  }
</style>
