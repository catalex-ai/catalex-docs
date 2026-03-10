import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {PrismTheme} from 'prism-react-renderer';

// CatalEx-branded light prism theme (based on GitHub, warm background)
const catalexLightTheme: PrismTheme = {
  ...prismThemes.github,
  plain: {
    ...prismThemes.github.plain,
    color: '#1A1A1A',
    backgroundColor: '#F8F8F8',
  },
};

// CatalEx-branded dark prism theme (based on Dracula, zinc background)
const catalexDarkTheme: PrismTheme = {
  ...prismThemes.dracula,
  plain: {
    ...prismThemes.dracula.plain,
    backgroundColor: '#1e1e21',
  },
};

const config: Config = {
  title: 'CatalEx Docs',
  tagline: 'AI-powered workplace intelligence',
  favicon: 'img/logo.svg',

  url: 'https://docs.catalex.co',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'CatalEx',
      logo: {
        alt: 'CatalEx Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://console.catalex.co',
          label: 'CatalEx Console',
          position: 'right',
          className: 'navbar__link--console',
          'aria-label': 'Go to CatalEx Console',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/getting-started/sign-up-and-onboarding'},
            {label: 'Features', to: '/features/intelligence'},
            {label: 'Agents & Integrations', to: '/agents-and-integrations/overview'},
          ],
        },
        {
          title: 'Product',
          items: [
            {label: 'CatalEx Console', href: 'https://console.catalex.co'},
          ],
        },
        {
          title: 'Legal',
          items: [
            {label: 'Privacy Policy', to: '/privacy-policy'},
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} CatalEx. All rights reserved.`,
    },
    prism: {
      theme: catalexLightTheme,
      darkTheme: catalexDarkTheme,
      additionalLanguages: ['bash', 'json', 'python'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
