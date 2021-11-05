<script lang="ts">
  export let id;
  export let value = undefined;
</script>

<div class="charles-checkbox">
  <input {id} type="checkbox" {value} />
  <label for={id}>
    <slot />
  </label>
</div>

<!-- <style>
  .charles-checkbox {
    display: flex;
    align-items: center;
    text-align: left;

    label {
      cursor: pointer;
    }
    input[type="checkbox"] {
      width: 24px;
      height: 24px;
      cursor: pointer;
      margin-right: 8px;
    }
  }
</style> -->
