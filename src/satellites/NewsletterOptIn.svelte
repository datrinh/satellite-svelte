<script lang="ts">
  import NewsletterOptInSuccess from "../components/NewsletterOptInSuccess.svelte";
  import CtaButton from "../components/CtaButton.svelte";
  import CCheckbox from "../components/BaseCheckbox.svelte";
  import CInput from "../components/BaseInput.svelte";

  export let isPreview = false;
  export let submitHandler: ({
    name,
    phoneNumber,
    hasAgreed,
  }) => Promise<unknown>;

  export let title = "Get our Whatsapp Newsletter";
  export let description =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid repellat quisquam non molestiae, unde libero cupiditate quia";
  export let legalText =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure aliquid repellat quisquam non molestiae, unde libero cupiditate quia";
  export let privacyPolicyLink = "https://hello-charles.com";
  export let ctaButtonLabel = "Submit";
  export let namePlaceholder = "Your Name";
  export let phoneNrPlaceholder = "Your Phone Number";
  export let successTitle = "Thanks a lot! 🥳";
  export let successDescription =
    "We have successfully opted-in to stay in touch with us on WhatsApp. We're excited to have you!";

  let isDone = false;
  let name = "";
  let phone = "";
  let hasAgreed = false;

  const onSubmit = async () => {
    if (isPreview) {
      isDone = true;
      return;
    }

    console.log("{ name, phoneNumber: phone, hasAgreed }", {
      name,
      phoneNumber: phone,
      hasAgreed,
    });

    await submitHandler?.({ name, phoneNumber: phone, hasAgreed });
    isDone = true;
  };

  const onClickSuccess = () => {
    if (isPreview) {
      isDone = false;
    }
  };
</script>

<div class="charles-newsletter">
  {#if !isDone}
    <form class="charles-newsletter-form" on:submit|preventDefault={onSubmit}>
      <h1 class="gap">{title}</h1>
      <p class="gap text-sm">{description}</p>

      <CInput type="text" placeholder={namePlaceholder} bind:value={name} />
      <CInput type="tel" placeholder={phoneNrPlaceholder} bind:value={phone} />

      <CCheckbox id="agreed" bind:checked={hasAgreed}>
        <span class="text-sm">
          {legalText}
          <a href={privacyPolicyLink} target="_blank">Link</a>
        </span>
      </CCheckbox>

      <div class="center">
        <CtaButton type="submit">{ctaButtonLabel}</CtaButton>
      </div>
    </form>
  {:else}
    <NewsletterOptInSuccess
      {successTitle}
      {successDescription}
      on:click={onClickSuccess}
    />
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
      font-size: 1rem;
      margin-bottom: 8px;
      font-weight: bold;
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
