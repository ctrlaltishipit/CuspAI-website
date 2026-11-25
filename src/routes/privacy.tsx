import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "CuspAI Privacy Policy" },
      {
        name: "description",
        content:
          "What personal data CuspAI collects on its website and in its app, why, who it is shared with, how long it is kept, and how to see, correct or delete it.",
      },
      { property: "og:title", content: "CuspAI Privacy Policy" },
      {
        property: "og:description",
        content: "What we collect, why, who sees it, and how to have it deleted.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

const mail = <a href="mailto:hello@cuspai.io">hello@cuspai.io</a>;

/*
 * Written from what the website and the app actually do. If either one starts
 * collecting something new, or adds a service that handles personal data,
 * update the matching section and the date before it ships.
 */
const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          CuspAI makes the CuspAI app and this website, www.cuspai.io. We are based in Bengaluru,
          India. In this policy, "we" and "us" mean CuspAI, and "you" means anyone who visits the
          website, joins the waitlist or uses the app.
        </p>
        <p>
          We decide why and how your personal data is used, which makes us the data fiduciary under
          India's Digital Personal Data Protection Act, 2023. To reach us about anything in this
          policy, write to {mail}.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <h3>On the website</h3>
        <ul>
          <li>
            <strong>Waitlist details.</strong> Your name and email address, what you do for work if
            you choose to tell us, which form you used, and the date and time you signed up.
          </li>
          <li>
            <strong>Visit data.</strong> We use Google Analytics to count visits. It records the
            pages you view, roughly where you are (your city or country, worked out from your IP
            address), the kind of device and browser you use, and the site that sent you here. It
            sets cookies to tell one visitor from another.
          </li>
          <li>
            <strong>Your theme choice.</strong> If you switch between light and dark, your browser
            remembers it on your device. It is never sent to us.
          </li>
          <li>
            <strong>Messages.</strong> If you email us, we keep your address and what you wrote.
          </li>
        </ul>

        <h3>In the app</h3>
        <ul>
          <li>
            <strong>Guest mode.</strong> You can use the app with only a first name. Your interests,
            what you have read and saved, your build plans, the tools you picked, your skill map and
            your reminder setting are all stored on your phone. We do not receive them.
          </li>
          <li>
            <strong>Signing in.</strong> If you sign in with Google when that option opens, Google
            gives us your name and email address so we can recognise your account.
          </li>
          <li>
            <strong>What you ask for.</strong> When you ask for a build plan, the goal you typed is
            sent to our server. When you ask for a skill map, your current role, the role you want
            and your list of interests are sent. We need these to write the result.
          </li>
          <li>
            <strong>Payments.</strong> When paid plans open, payment will be handled by the app
            store or a payment provider. We will learn which plan you bought and whether it is
            active. We will not receive your card number or UPI details.
          </li>
          <li>
            <strong>Reminders.</strong> The daily reminder is set on your phone by the app. It does
            not go through our servers.
          </li>
        </ul>
        <p>
          We do not ask for your contacts, your location, your photos or access to your email inbox.
          The app asks for photo library access only at the moment you save a plan as an image.
        </p>
      </>
    ),
  },
  {
    id: "why-we-use-it",
    title: "Why we use it",
    body: (
      <>
        <table>
          <thead>
            <tr>
              <th scope="col">What</th>
              <th scope="col">Why</th>
              <th scope="col">On what basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Waitlist details</td>
              <td>To email you once when CuspAI opens, and to understand who is interested.</td>
              <td>Your consent, given when you submit the form.</td>
            </tr>
            <tr>
              <td>Visit data</td>
              <td>To see which pages are read and where the site needs work.</td>
              <td>Our interest in running a site that works, balanced against your privacy.</td>
            </tr>
            <tr>
              <td>What you ask the app for</td>
              <td>To write the plan or skill map you asked for.</td>
              <td>It is needed to give you the service you requested.</td>
            </tr>
            <tr>
              <td>Account and payment status</td>
              <td>To recognise you and give you the plan you paid for.</td>
              <td>It is needed to give you the service you requested.</td>
            </tr>
            <tr>
              <td>Messages</td>
              <td>To reply to you.</td>
              <td>You wrote to us and expect an answer.</td>
            </tr>
          </tbody>
        </table>
        <p>
          We do not use your data for advertising, and we do not build a profile of you to sell or
          share.
        </p>
      </>
    ),
  },
  {
    id: "ai",
    title: "How AI is involved",
    body: (
      <>
        <p>
          Some build plans and skill maps are written by Claude, an AI model made by Anthropic. When
          that happens, our server passes the text you typed to Anthropic, receives the result and
          sends it to your phone. We send the text of your request and nothing that identifies you.
        </p>
        <p>
          Please do not type anything into a goal or a role that you would not want shared with a
          service of this kind, such as passwords, health details or someone else's personal
          information.
        </p>
        <p>
          The daily brief and the newsletters and podcasts in Discover are the same for everyone who
          follows a topic. No personal data is used to put them together.
        </p>
      </>
    ),
  },
  {
    id: "who-we-share-with",
    title: "Who we share it with",
    body: (
      <>
        <p>
          We do not sell personal data. We share it only with the companies that help us run CuspAI,
          and only what each one needs:
        </p>
        <table>
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">What it does for us</th>
              <th scope="col">What it handles</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Supabase</td>
              <td>Stores the waitlist</td>
              <td>Waitlist details</td>
            </tr>
            <tr>
              <td>Resend</td>
              <td>Sends the waitlist confirmation email</td>
              <td>Your name and email address</td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td>Hosts the website and the app's server</td>
              <td>Technical logs, including IP addresses</td>
            </tr>
            <tr>
              <td>Google</td>
              <td>Analytics for the website, and sign-in for the app</td>
              <td>Visit data, and your name and email if you sign in</td>
            </tr>
            <tr>
              <td>Anthropic</td>
              <td>Runs the AI model that writes plans and skill maps</td>
              <td>The text of your request</td>
            </tr>
            <tr>
              <td>Our email providers</td>
              <td>Deliver messages sent to hello@cuspai.io</td>
              <td>Your email address and what you wrote</td>
            </tr>
          </tbody>
        </table>
        <p>
          We may also share data if the law requires it, or to protect someone's safety or our legal
          rights. If CuspAI is ever sold or merged, your data may pass to the new owner, and this
          policy will keep applying to it until you are told otherwise.
        </p>
      </>
    ),
  },
  {
    id: "where",
    title: "Where it is processed",
    body: (
      <p>
        The companies above run servers in several countries, including the United States. Your data
        may therefore be processed outside India. Wherever it goes, we stay responsible for it and
        it stays covered by this policy.
      </p>
    ),
  },
  {
    id: "how-long",
    title: "How long we keep it",
    body: (
      <ul>
        <li>
          <strong>Waitlist details:</strong> until CuspAI opens and for up to twelve months after,
          or until you ask us to delete them, whichever comes first.
        </li>
        <li>
          <strong>Visit data:</strong> for the period set in Google Analytics, which is at most
          fourteen months.
        </li>
        <li>
          <strong>What you ask the app for:</strong> we do not keep your goals or roles in a
          database once the result has been sent back. Our hosting provider keeps short-lived
          technical logs.
        </li>
        <li>
          <strong>Data on your phone:</strong> until you sign out or delete the app.
        </li>
        <li>
          <strong>Messages:</strong> for as long as we need them to deal with what you raised.
        </li>
      </ul>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and similar storage",
    body: (
      <>
        <p>This website uses very few:</p>
        <ul>
          <li>
            <strong>Google Analytics cookies</strong> (names starting with _ga), used to count
            visits. You can block them in your browser settings, or with Google's own opt-out
            add-on, and the site will work exactly the same.
          </li>
          <li>
            <strong>A theme setting</strong> in your browser's local storage, which remembers
            whether you chose light or dark.
          </li>
        </ul>
        <p>We do not use advertising cookies or share data with ad networks.</p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>You can ask us to:</p>
        <ul>
          <li>tell you what personal data we hold about you and how we use it;</li>
          <li>correct anything that is wrong or out of date;</li>
          <li>delete your data;</li>
          <li>stop using it, by withdrawing a consent you gave;</li>
          <li>
            record the name of someone who may exercise these rights for you if you die or become
            unable to.
          </li>
        </ul>
        <p>
          To use any of these, write to {mail} from the address you signed up with. We will reply
          within 30 days. It costs nothing. Taking yourself off the waitlist is as simple as asking.
        </p>
        <p>
          If you are unhappy with our answer, tell us and we will look again. If you are still not
          satisfied, you can complain to the Data Protection Board of India. If you live in another
          country, you may also have the right to complain to the privacy regulator there.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        CuspAI is made for adults. We do not knowingly collect personal data from anyone under 18.
        If you believe a child has given us their details, write to {mail} and we will delete them.
      </p>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <p>
        The website and the app's server use encrypted connections. The waitlist can be read only
        through a private key that is held on our server and never sent to a browser. Access is
        limited to the people who need it. No system is perfectly secure, so if we ever learn of a
        breach that affects you, we will tell you and the authorities as the law requires.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        When we change this policy we will update the date at the top. If a change affects how we
        use data you have already given us, we will email you before it takes effect. The{" "}
        <Link to="/terms">Terms of Service</Link> sit alongside this policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact and complaints",
    body: (
      <p>
        For any question or complaint about your data, write to {mail} with "Privacy" in the subject
        line. A person will read it and answer. We are CuspAI, based in Bengaluru, Karnataka, India.
      </p>
    ),
  },
];

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      updated="26 November 2026"
      intro="This page explains what personal data we collect, why we collect it, who sees it and what you can do about it. It covers this website today and the CuspAI app when it opens."
      summary={[
        "When you join the waitlist we keep your name and email address, and what you do for work if you tell us.",
        "In the app's guest mode, your interests, saved items and plans stay on your phone.",
        "When you ask for a build plan or a skill map, the text you typed is sent to our server and to the AI model that writes it.",
        "We use Google Analytics on this website to count visits.",
        "We do not sell personal data and we do not show ads.",
        "You can ask us to show you, correct or delete your data at any time: hello@cuspai.io.",
      ]}
      sections={SECTIONS}
    />
  );
}
