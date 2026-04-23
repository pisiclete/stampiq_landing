# Stampiq Landing Page

Landing page for Stampiq - a stamp collecting application.

## Project Structure

```
stampiq_landing/
├── animations/               # Lottie animation files for Sigi character
├── images/                   # Static images
├── svgs/                     # SVG assets (app store badges, icons)
├── .well-known/              # iOS Universal Links + Android App Links config
├── index.html                # Main coming soon page
├── redirect.html             # QR code redirect page
├── privacy.html              # Privacy policy page
├── terms.html                # Terms of service page
├── delete-account.html       # Account deletion request page (Google Play compliance)
├── styles.css                # Stylesheet
├── translations.json         # Localization translations (landing page)
├── translations-legal.json   # Localization translations (privacy / terms)
├── CNAME                     # GitHub Pages custom domain (stampiq.io)
└── _config.yml               # Jekyll config (includes .well-known/)
```

## Features

- Coming soon landing page with Sigi character animations
- QR code redirect page (for app store links)
- Privacy policy page
- Terms of service page
- Account deletion request page (Google Play compliance)
- iOS Universal Links + Android App Links (`.well-known/`)
- Multi-language support (landing + legal translations)
- Responsive design

## Usage

The site is deployed to GitHub Pages at [stampiq.io](https://stampiq.io) via the `CNAME` and `_config.yml` files.

For local preview, open `index.html` directly in a web browser.

## Assets

- **Animations**: Lottie animations for the Sigi character (idle, waving, blinking, etc.)
- **Images**: Feature screenshots and graphics
- **SVGs**: App store download badges and icons

## License

Proprietary - Stampiq.io
