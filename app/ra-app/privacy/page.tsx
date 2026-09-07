import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RA App Privacy Policy',
  description: 'Privacy Policy for RA App roadside assistance service.',
};

export default function RaAppPrivacyPolicy() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px 80px', fontFamily: 'Arial, sans-serif', lineHeight: 1.7, color: '#172033' }}>
      <h1>RA App Privacy Policy</h1>
      <p><strong>Effective date:</strong> September 8, 2026</p>
      <p>
        This Privacy Policy explains how <strong>RA App</strong>, published by <strong>Sesan Developer Team</strong>,
        collects, uses, stores, and shares information when you use our roadside assistance application.
      </p>

      <h2>1. Information we collect</h2>
      <p>Depending on the features you use, RA App may collect or process:</p>
      <ul>
        <li><strong>Account and contact information:</strong> name, phone number, email address, profile photo, profile information, and RA account ID.</li>
        <li><strong>Location information:</strong> precise or approximate device location when needed to request roadside assistance, identify a service location, match users with providers, show maps, routes, distance, and provider location during an active job.</li>
        <li><strong>Service and transaction information:</strong> roadside assistance requests, booking history, provider applications, membership/payment submissions, payment references or receipts, marketplace listings, promotions, and related status information.</li>
        <li><strong>User content and communications:</strong> chat messages, support messages, complaint/report information, photos, images, voice messages, and other files that you choose to send or upload.</li>
        <li><strong>Device and app information:</strong> notification tokens and technical information necessary to operate notifications, authentication, security, and app functionality.</li>
        <li><strong>Camera, photos/files, and microphone:</strong> only when you choose features that require taking/selecting an image, uploading evidence or receipts, or recording/sending voice content.</li>
      </ul>

      <h2>2. How we use information</h2>
      <p>We use information to:</p>
      <ul>
        <li>create, authenticate, maintain, and secure RA App accounts;</li>
        <li>provide roadside assistance and connect users with approved service providers;</li>
        <li>provide maps, location-based matching, routes, distance, and active-job tracking;</li>
        <li>operate in-app chat, support, complaints, notifications, marketplace, and promotion features;</li>
        <li>process and review provider membership or promotion payment submissions;</li>
        <li>prevent abuse, investigate reports, enforce our rules, and improve reliability and safety;</li>
        <li>comply with applicable legal obligations.</li>
      </ul>

      <h2>3. Location data</h2>
      <p>
        Location is central to roadside assistance. RA App may use location while you are using relevant features to identify where help is needed,
        find or match nearby providers, display maps/routes, and show provider progress during an active service request. We do not sell location data.
        Device permission controls can be used to allow or deny location access, although some roadside assistance features may not work correctly without it.
      </p>

      <h2>4. Sharing of information</h2>
      <p>
        We do not sell personal or sensitive user data. Information may be shared only as necessary to provide RA App services. For example,
        relevant service-request and location information may be made available to a provider involved in a request, and information you intentionally
        send through chat may be visible to the other participant. We may also use service providers that process data on our behalf, including
        cloud hosting, authentication, database, storage, push notification, mapping/routing, and communications infrastructure.
        Information may also be disclosed where required by applicable law or a valid legal process.
      </p>

      <h2>5. Third-party services</h2>
      <p>
        RA App uses third-party technology and infrastructure, including Google/Firebase services, Google Maps/Routes services, and other infrastructure
        necessary to deliver app functionality. Those providers may process limited information on our behalf according to their applicable terms and privacy practices.
      </p>

      <h2>6. Payments</h2>
      <p>
        RA App may allow users or providers to submit payment-related evidence such as a transaction reference or receipt for membership or promotion review.
        We use this information to verify and administer the relevant service. RA App does not sell payment information.
      </p>

      <h2>7. Data security</h2>
      <p>
        We use reasonable technical and organizational safeguards designed to protect personal information, including authenticated access,
        access-control rules, and encrypted network connections provided by our service infrastructure. No method of storage or transmission is completely risk-free.
      </p>

      <h2>8. Data retention and deletion</h2>
      <p>
        We retain information for as long as reasonably necessary to provide RA App, maintain security, resolve disputes, comply with legal obligations,
        and maintain legitimate transaction or service records. Users may request account deletion through the account/profile controls available in RA App
        or by contacting us. When an account deletion request is completed, associated personal data will be deleted or anonymized unless specific information
        must be retained for legitimate legal, security, fraud-prevention, dispute, or regulatory purposes. Any retained information will be limited to the necessary purpose and period.
      </p>

      <h2>9. Your choices and permissions</h2>
      <p>
        You can control Android permissions such as location, camera/photos, and microphone through your device settings. You may also choose whether to upload
        optional photos, voice content, receipts, or other user-generated content. Revoking a permission may prevent the related feature from working.
      </p>

      <h2>10. Children</h2>
      <p>
        RA App is a roadside assistance and service marketplace application and is not designed or directed specifically to children.
        Users should meet any applicable legal requirements for using roadside, vehicle, marketplace, and payment-related services in their jurisdiction.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy as RA App changes or as required by law or platform policies. The current version will be published on this page with its effective date.
      </p>

      <h2>12. Contact</h2>
      <p>
        For privacy questions, data requests, or account-deletion assistance, contact <strong>Sesan Developer Team</strong> through the Help &amp; Support feature in RA App.
      </p>

      <p style={{ marginTop: 40, fontSize: 14, color: '#5b6474' }}>
        RA App — Roadside Assistance | Sesan Developer Team
      </p>
    </main>
  );
}
