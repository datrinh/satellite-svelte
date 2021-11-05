<script lang="ts">
  export let type = "button";
</script>

<button
  {type}
  class="p-2 cursor-pointer bg-green-whatsapp rounded-2xl border-none text-white"
>
  <slot />
</button>
