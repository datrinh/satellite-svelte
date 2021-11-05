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
