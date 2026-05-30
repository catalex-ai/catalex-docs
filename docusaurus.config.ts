import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {PrismTheme} from 'prism-react-renderer';

// CatalEx-branded light prism theme (GitHub base on warm terracotta tint)
const catalexLightTheme: PrismTheme = {
  ...prismThemes.github,
  plain: {
    ...prismThemes.github.plain,
    color: '#0E0D0C',
    backgroundColor: '#FAF1EA',
  },
};

// CatalEx-branded dark prism theme (Dracula base on warm charcoal)
const catalexDarkTheme: PrismTheme = {
  ...prismThemes.dracula,
  plain: {
    ...prismThemes.dracula.plain,
    color: '#F5EFE7',
    backgroundColor: '#1E1915',
  },
};

const config: Config = {
  title: 'CatalEx Docs',
  tagline: 'AI-powered workplace intelligence',
  favicon: 'img/logo.svg',

  url: 'https://docs.catalex.co',
  baseUrl: '/',

  organizationName: 'catalex-ai',
  projectName: 'catalex-docs',
  deploymentBranch: 'deploy',
  trailingSlash: false,

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
            {label: 'Core Features', to: '/features/studio'},
            {label: 'Building Custom Tools & Agents', to: '/agents-and-integrations/overview'},
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
            {label: 'Terms of Service', to: '/terms-of-service'},
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
