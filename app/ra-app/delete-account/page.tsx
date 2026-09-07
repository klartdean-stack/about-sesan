import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete RA App Account',
  description: 'How to request deletion of your RA App account and associated data.',
};

export default function RaAppDeleteAccount() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px 80px', fontFamily: 'Arial, sans-serif', lineHeight: 1.7, color: '#172033' }}>
      <h1>Delete Your RA App Account</h1>
      <p>
        This page explains how users of <strong>RA App</strong>, published by <strong>Sesan Developer Team</strong>,
        can request deletion of their account and associated personal data.
      </p>

      <h2>Request account deletion</h2>
      <p>You can request deletion using either of the following methods:</p>
      <ol>
        <li>
          <strong>Inside RA App:</strong> Open RA App, go to your Profile or account settings, and use the account deletion option available there.
        </li>
        <li>
          <strong>Without the app:</strong> If you no longer have access to RA App, contact Sesan Developer Team and clearly state that you want your
          <strong> RA App account and associated data deleted</strong>. Include the phone number or other account identifier used for your RA App account so we can verify and process the request.
        </li>
      </ol>

      <p>
        For an external deletion request, contact us at:{' '}
        <a href="mailto:klartdean@gmail.com?subject=RA%20App%20Account%20Deletion%20Request">
          klartdean@gmail.com
        </a>
      </p>

      <h2>Data deleted with your account</h2>
      <p>When an account deletion request is completed, we will delete or anonymize personal data associated with the account, as applicable, including:</p>
      <ul>
        <li>account and profile information;</li>
        <li>contact information and RA account identifiers;</li>
        <li>stored location information associated with the account or service requests;</li>
        <li>user-created marketplace or promotion content associated with the account;</li>
        <li>chat, support, uploaded images, voice content, and other user-submitted content where applicable;</li>
        <li>provider profile/application information associated with the account, where applicable.</li>
      </ul>

      <h2>Data that may be retained</h2>
      <p>
        Certain limited records may be retained when reasonably necessary for legal obligations, security, fraud prevention, dispute resolution,
        or legitimate transaction and service-record requirements. Any retained information will be limited to the purpose and period for which it is required.
      </p>

      <h2>Verification and processing</h2>
      <p>
        We may need to verify that the person making the request owns the RA App account before completing deletion. We will process verified deletion
        requests within a reasonable period and will not require you to reinstall RA App merely to submit an external deletion request.
      </p>

      <h2>Privacy</h2>
      <p>
        For more information about how RA App handles personal information, see the{' '}
        <a href="/ra-app/privacy">RA App Privacy Policy</a>.
      </p>

      <h2>Contact</h2>
      <p>
        <strong>Sesan Developer Team</strong><br />
        RA App — Roadside Assistance<br />
        Email: <a href="mailto:klartdean@gmail.com">klartdean@gmail.com</a>
      </p>

      <p style={{ marginTop: 40, fontSize: 14, color: '#5b6474' }}>
        Last updated: September 8, 2026
      </p>
    </main>
  );
}
