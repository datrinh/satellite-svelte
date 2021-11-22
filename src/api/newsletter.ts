export const submitNewsletterOptIn = async (
  { universeId, scriptId },
  { name, phoneNumber, hasAgreed }
) => {
  const payload = {
    name,
    phone_number: phoneNumber,
    legal_opt_in: hasAgreed,
  };
  const res = await fetch(
    // `${universeUri}/api/v0/storefronts/scripts/${scriptId}/public/api/v0/message_subscriptions/from_newsletter_opt_in`,
    `http://localhost:3000/api/v0/storefronts/scripts/${scriptId}/public/api/v0/message_subscriptions/from_newsletter_opt_in`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  console.log("res", res);
  return res;
  // this.makeRequest({
  //   method: 'POST',
  //   url: `storefronts/scripts/${this.script_id}/public/api/v0/message_subscriptions/from_external_order_confirmation`,
  //   body: payload
  // })
};
