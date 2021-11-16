<script lang="ts">
  export let id;
  export let value;
</script>

<div class="satellite-checkbox">
  <label class="container" for={id}>
    <slot />
    <input {id} type="checkbox" {value} />
    <span class="checkmark" />
  </label>
</div>

<style lang="scss">
  @import "../styles/variables";
  .satellite-checkbox {
    display: flex;
    text-align: left;
    margin-bottom: 16px;

    .container {
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 12px;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      color: $gray-dark;
      width: fit-content;
      font-size: 0.8rem;
    }

    /* Hide the browser's default checkbox */
    .container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 1.25rem;
      width: 1.25rem;
      border-radius: $input-radius;
      background-color: $gray-light;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
      background-color: darken($gray-light, 10%);
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
      display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
      left: 0.5rem;
      top: 0.1rem;
      width: 0.4rem;
      height: 0.8rem;
      border: solid black;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
</style>
