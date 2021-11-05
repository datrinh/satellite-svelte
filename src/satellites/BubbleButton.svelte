<script lang="ts">
  let isOpen = false;

  const onClick = () => {
    isOpen = !isOpen;
  };
</script>

<div class="charles-newsletter">
  <button class="charles-satellite-button" on:click={onClick}> Open </button>
  {#if isOpen}
    <div>Tada!</div>
  {/if}
</div>

<style lang="scss" global>
  .charles-satellite-button {
    position: fixed;
    bottom: 8px;
    right: 8px;
    border-radius: 9999px;
    width: 48px;
    height: 48px;
  }
</style>
