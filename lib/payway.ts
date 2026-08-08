import {createHmac} from "node:crypto";

type PayWayCheckoutInput = {
  origin: string;
  locale: "km" | "en";
  transactionId: string;
  buyerEmail: string;
  buyerUid: string;
  courseId: string;
  courseTitle: string;
  amountRiel: number;
};

function requiredEnvironment(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`MISSING_${name}`);
  return value;
}

function base64(value: unknown) {
  return Buffer.from(typeof value === "string" ? value : JSON.stringify(value), "utf8").toString("base64");
}

function payWayHash(value: string) {
  return createHmac("sha512", requiredEnvironment("ABA_PAYWAY_PUBLIC_KEY"))
    .update(value)
    .digest("base64");
}

export function createPayWayCheckout(input: PayWayCheckoutInput) {
  const merchantId = requiredEnvironment("ABA_PAYWAY_MERCHANT_ID");
  const checkoutUrl = requiredEnvironment("ABA_PAYWAY_API_URL");
  const reqTime = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const amount = String(Math.round(input.amountRiel));
  const items = base64([{name: input.courseTitle, quantity: 1, price: input.amountRiel}]);
  // PayWay expects a numeric shipping price even for digital products.
  const shipping = "0.00";
  const firstname = "Sesan";
  const lastname = "Learner";
  const email = input.buyerEmail;
  const phone = "";
  const type = "purchase";
  const paymentOption = "";
  const returnUrl = base64(`${input.origin}/api/academy/payway/callback`);
  const cancelUrl = `${input.origin}/${input.locale}/academy?payment=cancelled#courses`;
  const continueSuccessUrl = `${input.origin}/${input.locale}/academy/payment/success?tran_id=${encodeURIComponent(input.transactionId)}`;
  const returnDeeplink = "";
  const currency = "KHR";
  const customFields = base64({courseId: input.courseId, buyerUid: input.buyerUid, locale: input.locale});
  const returnParams = base64({courseId: input.courseId, buyerUid: input.buyerUid});
  const payout = "";
  const lifetime = "15";
  const additionalParams = "";
  const googlePayToken = "";
  const skipSuccessPage = "1";
  const hashSource = reqTime + merchantId + input.transactionId + amount + items + shipping
    + firstname + lastname + email + phone + type + paymentOption + returnUrl + cancelUrl
    + continueSuccessUrl + returnDeeplink + currency + customFields + returnParams + payout
    + lifetime + additionalParams + googlePayToken + skipSuccessPage;

  return {
    checkoutUrl,
    fields: {
      req_time: reqTime,
      merchant_id: merchantId,
      tran_id: input.transactionId,
      firstname,
      lastname,
      email,
      phone,
      type,
      payment_option: paymentOption,
      items,
      shipping,
      amount,
      currency,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      skip_success_page: skipSuccessPage,
      continue_success_url: continueSuccessUrl,
      return_deeplink: returnDeeplink,
      custom_fields: customFields,
      return_params: returnParams,
      view_type: "checkout",
      payment_gate: "0",
      payout,
      additional_params: additionalParams,
      lifetime,
      google_pay_token: googlePayToken,
      hash: payWayHash(hashSource),
    },
  };
}

export async function checkPayWayTransaction(transactionId: string) {
  const merchantId = requiredEnvironment("ABA_PAYWAY_MERCHANT_ID");
  const configuredUrl = requiredEnvironment("ABA_PAYWAY_API_URL");
  const reqTime = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const url = new URL(configuredUrl);
  url.pathname = url.pathname.replace(/\/purchase\/?$/, "/check-transaction-2");
  const response = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      req_time: reqTime,
      merchant_id: merchantId,
      tran_id: transactionId,
      hash: payWayHash(reqTime + merchantId + transactionId),
    }),
    cache: "no-store",
  });
  const result = await response.json().catch(() => ({})) as {
    data?: {payment_status?: string; payment_status_code?: number; payment_amount?: number; payment_currency?: string};
    status?: {code?: string; message?: string; tran_id?: string};
  };
  if (!response.ok) throw new Error(result.status?.message || "PAYWAY_STATUS_FAILED");
  return result;
}
