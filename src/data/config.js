export const config = {
  // Formspree Form ID to receive email notifications with full design specs
  // Replace this placeholder with your own Formspree Form ID (from formspree.io)
  formspreeId: "xzbkbjqk",
  
  // Stripe Payment Links (Flat-fee one-time payments)
  // Replace these placeholders with your actual Stripe checkout links
  stripe: {
    conceptProOnce: "https://buy.stripe.com/mock-pro-once",    // $149 Flat Fee
    expertSetupOnce: "https://buy.stripe.com/mock-expert-once"   // $599 Flat Fee
  }
};
