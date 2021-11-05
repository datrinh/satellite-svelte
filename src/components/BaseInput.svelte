<script lang="ts">
  export let type = "text";
  export let placeholder = "";
  export let value = undefined;
</script>

<input {type} {placeholder} {value} class="bg-gray-light p-2 border-none" />
