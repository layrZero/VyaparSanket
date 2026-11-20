# Vyapar Sanket website change plan

The first action on the homepage will be installing the Android app. The second will let a visitor send a sample signal and see precisely where their decision is required.

## 1. Establish the product evidence before finalizing the design

The public homepage and local index both use “Your fund manager, in your pocket.” The local hero and SoftwareApplication downloadUrl point to the old package. The header and footer already use the correct one. The Play listing specifies per-topic handling, automatic placement for eligible opening orders, and user confirmation to close. Both index.html and llms.txt describe automatic closing. Use the listing for the correction and bring any newer conflicting evidence back for review.

The repository contains a product icon, feature graphic, three older screen PNGs, and a locally vendored Three.js module. Matching hierarchy dumps and Android theme source are still needed to verify the screen evidence and exact typography. On 20 November 2026, USB ADB confirmed an authorized phone with Vyapar Sanket 1.0.5 (build 42), package `app.sales4radii.indiancrossTrader`. The capture session and local implementation results are recorded below.

- Use the authorized USB connection for the capture session. Recheck USB status with `adb -d get-state`, obtain the selected USB serial locally and pass it with `adb -s SERIAL` for each capture or navigation command. If several USB phones appear, ask the owner to identify the intended one. Keep the serial out of the repository and handoff.
- Verify the installed package with adb -s SERIAL shell pm path app.sales4radii.indiancrossTrader and the foreground package in the hierarchy. Record app version, display size and density, font scale, and theme privately. The owner handles unlocking or sign-in.
- Navigate Home and signal channels, Trades and each available feed/history tab, then Profile and readiness. Inspect visible goal, broker, handling-mode and order-review views through read-only navigation. Preserve the session, account settings, subscriptions, and orders. Respect protected screens and record inaccessible states.
- For each stable view, privately save a native screencap PNG and UI Automator XML with the same stem. Open both, match labels and bounds, and repeat obscured or changing captures. Log the route, starting state, navigation result, and what it verifies. Remove only capture-created device files.
- Inspect both artifacts for private data. Export screened image copies with sensitive details cropped or masked, preserving controls and native proportions. Keep raw PNG/XML outside the repository. Document observed text hierarchy, spacing, surfaces, radii and accents. Verify font identity against licensed assets or theme code where available and label visual estimates. Use the findings for gallery captions, the phone texture and app-derived CSS variables.

## 2. Correct the static homepage and its public descriptions

- In index.html use “Put your trading rules to work.” and the supplied supporting copy. Put “Get the Android app” and “Try a sample signal” beside the tabletop on desktop. On phones, put the headline and install action before the desk and controls. Keep existing fragment targets for incoming links and retain the custom domain, canonical URL, sitemap and robots routes.
- Use ordinary HTML links to the [official Android listing](https://play.google.com/store/apps/details?id=app.sales4radii.indiancrossTrader) across header, mobile navigation, hero and footer. Correct the structured download URL. Search for the obsolete ID across the published files and decode any installation QR discovered in reviewed artwork.
- Replace the fund comparison with how the partner, user's phone and broker participate. Explain topic selection, trading and investing goals, personal broker control, eligible opening orders and close confirmation. Align accessibility text, social metadata, structured data and llms.txt. Verify or remove stale preorder/free-price metadata. Verify broker names, provider relationships, trials and pricing before publication.
- Use the actual installed labels for the three gallery captions. Link getting started to the registration walkthrough, IMC documentation and Google Play. The docs destination identifies itself as India Market Connector. Describe its scope accurately. Recheck support and privacy destinations from the listing and retain a visible market-risk disclosure.
- Preserve the Research360 March–October 2026 monthly HTML table, source link and CSS charts. Reconcile each month and segment against supporting source records before claiming verification. Preserve negative values, including October swing at −470.19%, counts, win rates and existing ordering. Explain that gross signal returns sum individual closed-trade returns by exit month. Preserve holding-period buckets, exclusion of incomplete months and the exclusions for costs, execution and capital allocation. Keep historical data separate from sandbox samples. Flag any missing source records.

## 3. Build and test the decision logic before wiring up 3D

Add a small native ES module for deterministic sample rules. Use script.js as the module that connects native HTML controls and status to the model. Start at short-term trading and Manual with a seeded sample position. Supply an intraday opening, a matching long-term investment opening and a closing signal. Show “Sandbox demo” with sample order details, the current step and outcome in accessible HTML.

| Sample | At the phone | Completion |
| --- | --- | --- |
| Eligible opening, Manual | Pause for “Confirm simulated order” or “Skip” | Confirmation moves the pulse to the broker and shows “Opening order simulated”. Skip ends the run at the phone. |
| Eligible opening, Automatic | Show the settings check | Continue to the broker and show “Opening order simulated”. |
| Intraday opening, long-term goal | Stop in either mode | Show “Skipped — this intraday signal is outside your selected goal”. The matching investment sample exercises the eligible path. |
| Close seeded position, either goal or mode | Always request confirmation | Confirmation simulates the close once. Skip leaves the position open. |

Keep state changes independent of animation callbacks. Identify each run so reset, replay or selection changes invalidate pending timers and confirmations. Ignore duplicate sends and confirmations. Reset restores defaults and the seeded position. Replay restores that scenario's starting conditions so a visitor can try a close first or repeat it after completion. Keep all examples local to the browser.

## 4. Replace the scroll-driven illustration with the pocket desk

- Keep the ivory drafting grid, charcoal text, forest-green controls and brass accents in styles.css. Put the research slips, upright graphite Android phone and compact “Your broker” module on one fixed tabletop, in that order. Use the reviewed screenshot at its original aspect ratio, subtle paper and bevel details, and one amber pulse on a brass line. Give the visitor a perceptible stop at the phone. Keep actions and status in responsive HTML.
- Initially render a lightweight still and a static worked example. On activation, dynamically import scene.js. The current index loads it immediately and its Three.js dependency imports a missing three.core.js. Vendor a complete version-pinned official module set with matching add-ons if used. Retain static hosting with semantic HTML, plain CSS and native ES modules.
- Replace the perpetual frame loop and scroll phases with updates driven by the same model as the controls. Cap pixel ratio, use modest geometry and compressed assets, pause offscreen or in hidden tabs, and stop scheduling frames when idle. Reduced motion jumps to each decision state. Failed imports, WebGL creation or context loss leave HTML interaction usable. With JavaScript disabled, display the worked example and ordinary navigation and install links.

## 5. Verify the local implementation and hand it back for review

Run from the repository root with `python -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000/`.

- Compare desktop and narrow-phone drafts side by side with private reference captures. Check screen aspect ratio, legibility, actual navigation labels, gallery, typography and sandbox sequence. Record the screens used, their design roles and any unresolved workflow or font differences.
- Test narrow Android, tablet and desktop layouts for overflow, clipped labels, canvas overlap, touch targets and visible keyboard focus. Exercise every row above plus double taps, skip then retry, closing first, switching during travel and confirmation, replay and reset. Check live status announcements and reduced motion.
- Force WebGL failure and a blocked Three.js request independently, then disable JavaScript. Check the applicable HTML experience, navigation and install links each time. Inspect console and network traffic for broken modules/assets, early 3D loads and broker/trading requests. Check fragment targets, exact Play URLs, documentation, registration, privacy and support destinations.
- Review the published asset list for sanitized copies only. Handoff includes working files, preview command, checks actually performed, evidence gaps, and a first-time visitor walkthrough showing publisher, decision point, confirmation and installation. Production deployment requires separate authorization.

### References checked during planning

- [Public homepage](https://vyaparsanket.layr0.org/) and [official Google Play listing](https://play.google.com/store/apps/details?id=app.sales4radii.indiancrossTrader)
- [IMC documentation](https://docs.layr0.org/docs/products/imc), [registration walkthrough](https://youtu.be/GCFPUApT26I) and [Layr0 products](https://layr0.org/products)

## Local implementation and verification, 20 November 2026

Preview from the repository root with `python -m http.server 8000 --bind 127.0.0.1`. Open `http://127.0.0.1:8000/`.

### Android capture record

USB ADB verified the installed and foreground package. Matching native PNG and UI Automator XML pairs were collected outside the site at 1080 × 2344, density 440, font scale 1.0. Android reported night mode enabled. The app itself displayed pale surfaces with blue controls. The system status bar is excluded or masked in the public images.

| Navigation and observed change | Use on the website |
| --- | --- |
| Home initially showed Trader Central License Key and Layr0 Connected Brokers, including broker login status. Scrolling revealed Signal Channels, Subscribed and Available to subscribe. Search Channels opened a separate search view. | The sanitized channel view supplies the Home gallery detail and the native-ratio phone display. Broker and licence details are excluded. |
| From Home, selecting Trades opened Live Feed with connection and signal information. Selecting Signal History exposed Filter by date, All Types and All Topics. | The Trades gallery shows the tab strip and filters. The crop ends before order data. |
| Selecting Profile showed Featured Content. Scrolling revealed Background Readiness, service controls and a topic marked Auto. | The Profile gallery isolates the readiness panel. Account, referral and topic details are excluded. |

The observed controls establish screen labels and presentation. A live goal-selection screen, a full handling-mode change and an order confirmation were not verified on the phone. The Play listing supplies the public opening/closing distinction. The goal filter and orders in the browser are explicitly simulated. No account changes or orders were required. When another app came to the foreground, device navigation stopped.

The capture colors include #1565c0 for the blue header, #f3f3fa for cards, #f9f9ff for the page and #191c20 for dark text. The gallery and sandbox use the observed colors, dark labels and soft corners. Native-resolution estimates at the recorded density put titles around 20–22 sp, section headings around 16–18 sp and body, field, button and status text around 13–16 sp. Selected tabs, section headings and status labels appear heavier than body text, with approximately 1.2–1.45 line spacing. Cards and fields have rounded corners, compact inset labels and adjacent action icons. Exact font family, weights and dimensions could not be established from XML. Web labels use a Roboto/system fallback. The original app typography remains in the images.

### Local checks

- Compared the sanitized Android images with desktop and phone-viewport gallery renders. Inspected the Three.js phone image, gallery crops, caption accuracy and the activated sandbox layout. The public capture set contains three sanitized PNGs and a desk still rendered from the sanitized Home image. Raw PNG/XML pairs are private.
- Checked the normal HTTP entry point at 320, 360, 390, 768, 1024 and 1440 CSS pixels in Chromium. Verified asset loading, fragment links, install destinations, visible controls, keyboard focus, native selections and horizontal page overflow. Active layouts keep the scene beside or above the controls. Checked selected-option space and adjusted narrow layouts.
- Exercised all 12 goal, mode and signal combinations. Verified opening and closing confirmation, skipping a close, matched investment and mismatched intraday samples, replay, repeated sends, reset during the phone check and selection changes during travel. Checked live-region markup, keyboard-only activation and confirmation. Native screen-reader speech and physical-device browser performance remain unmeasured.
- Verified reduced motion, forced WebGL failure, blocked Three.js import and disabled JavaScript. The text model works independently of the canvas. With scripts disabled the static example, navigation and install links remain available. Initial page traffic excludes scene.js and Three.js. The simulation requested only local files. The normal page produced no browser console errors. Renderer checks covered idle/offscreen frame scheduling and context loss.
- Reconciled all 72 March–October table values against the public homepage, including signs, segment counts and win rates. Cross-checked chart returns, monthly trade totals and summary maxima. Research360's public cards did not supply the exit-date records needed for independent recomputation.
- Checked the Google Play listing, registration video, IMC documentation, privacy URL, support email and Layr0 product destination. The Play listing's separate website field led to unrelated content during review. The site uses the listing's support email. Published copy omits unverified prices, trial terms and provider-relationship claims.

The changes are local and ready for review.
