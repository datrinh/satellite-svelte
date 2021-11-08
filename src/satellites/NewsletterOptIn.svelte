<script lang="ts">
  import NewsletterOptInSuccess from "../components/NewsletterOptInSuccess.svelte";
  import CtaButton from "../components/CtaButton.svelte";
  import CCheckbox from "../components/BaseCheckbox.svelte";
  import CInput from "../components/BaseInput.svelte";

  export let heading = "Get our Whatsapp Newsletter";
  export let description =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid repellat quisquam non molestiae, unde libero cupiditate quia";
  export let legalText =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid repellat quisquam non molestiae, unde libero cupiditate quia";
  export let privacyPolicyLink = "https://hello-charles.com";
  export let ctaButtonLabel = "Submit";

  let isDone = false;
  let name = "";
  let phone = "";
  let hasAgreed = false;

  const onSubmit = () => {
    isDone = true;
  };
</script>

<div class="charles-newsletter">
  {#if !isDone}
    <form class="charles-newsletter-form" on:submit|preventDefault={onSubmit}>
      <h1 class="gap">{heading}</h1>
      <p class="gap">{description}</p>

      <CInput type="text" placeholder="Your Name" bind:value={name} />
      <CInput type="tel" placeholder="Your Phone Number" bind:value={phone} />

      <CCheckbox id="agreed" value={hasAgreed}>
        {legalText}
        <a href={privacyPolicyLink} target="_blank">Link</a>
      </CCheckbox>

      <CtaButton type="submit">{ctaButtonLabel}</CtaButton>
    </form>
  {:else}
    <NewsletterOptInSuccess />
  {/if}
</div>

<style lang="scss" global>
  @import "../styles/base";
  @import "../styles/helpers";

  .charles-newsletter {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 0.5rem;
    text-align: center;
    background-color: white;
    margin: 2px; // avoid clipped box shadow in iframes

    h1 {
      font-size: 1rem;
      margin-bottom: 8px;
    }
  }

  .charles-newsletter-form {
    display: flex;
    flex-direction: column;
    max-width: $newsletter-content;
    padding: 3rem;
    margin: auto;
  }
</style>
