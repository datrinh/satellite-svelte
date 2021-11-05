<script lang="ts">
  export let id;
  export let value = undefined;
</script>

<div class="flex space-x-2">
  <input {id} type="checkbox" class="w-6 h-6 cursor-pointer" {value} />
  <label class="text-left cursor-pointer w-full text-sm text-gray-400" for={id}>
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
