import { createHttpClient, STRIPE_API_KEY } from '@stripe/ui-extension-sdk/http_client';
import Stripe from 'stripe';

const stripe: Stripe = new Stripe(STRIPE_API_KEY, {
  httpClient: createHttpClient() as Stripe.HttpClient,
  apiVersion: '2020-08-27',
});

export default stripe;