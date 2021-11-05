<script>
  import NewsletterOptInSuccess from "./NewsletterOptInSuccess.svelte";
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

<div class="shadow rounded text-center bg-white">
  {#if !isDone}
    <form
      class="flex flex-col max-w-xl p-12 m-auto space-y-4"
      on:submit|preventDefault={onSubmit}
    >
      <h1 class="text-lg mt-2 font-semibold">{heading}</h1>
      <p>{description}</p>

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
