export interface SatelliteConfig {
  newsletter_opt_in: NewsletterOptInConfig;
}

interface NewsletterOptInConfig {
  selector: string;
  title: string;
  legalText: string;
  description: string;
  ctaButtonLabel: string;
  namePlaceholder: string;
  privacyPolicyLink: string;
  phoneNrPlaceholder: string;
  message_subscription: string;
}
