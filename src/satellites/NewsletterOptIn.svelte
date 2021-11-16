<script lang="ts">
  import NewsletterOptInSuccess from "../components/NewsletterOptInSuccess.svelte";
  import CtaButton from "../components/CtaButton.svelte";
  import CCheckbox from "../components/BaseCheckbox.svelte";
  import CInput from "../components/BaseInput.svelte";

  export let title = "Get our Whatsapp Newsletter";
  export let description =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid repellat quisquam non molestiae, unde libero cupiditate quia";
  export let legalText =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid repellat quisquam non molestiae, unde libero cupiditate quia";
  export let privacyPolicyLink = "https://hello-charles.com";
  export let ctaButtonLabel = "Submit";
  export let namePlaceholder = "Your Name";
  export let phoneNrPlaceholder = "Your Phone Number";

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
      <h1 class="gap">{title}</h1>
      <p class="gap">{description}</p>

      <CInput type="text" placeholder={namePlaceholder} bind:value={name} />
      <CInput type="tel" placeholder={phoneNrPlaceholder} bind:value={phone} />

      <CCheckbox id="agreed" value={hasAgreed}>
        <span class="legal-text">
          {legalText}
          <a href={privacyPolicyLink} target="_blank">Link</a>
        </span>
      </CCheckbox>

      <div class="center">
        <CtaButton type="submit">{ctaButtonLabel}</CtaButton>
      </div>
    </form>
  {:else}
    <NewsletterOptInSuccess />
  {/if}
</div>

<style lang="scss">
  @import "../styles/base";
  @import "../styles/helpers";

  .charles-newsletter {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 0.5rem;
    text-align: center;
    background-color: white;
    margin: 2px; // avoid clipped box shadow in iframes

    h1 {
      font-size: 0.75rem;
      margin-bottom: 8px;
    }
    p {
      font-size: 0.6rem;
    }
    .legal-text {
      font-size: 0.333rem;
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
