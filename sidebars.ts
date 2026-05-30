import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/sign-up-and-onboarding',
        'getting-started/setting-up-your-company',
        'getting-started/inviting-your-team',
        'getting-started/connecting-data-sources',
      ],
    },
    {
      type: 'category',
      label: 'Core Features',
      collapsed: false,
      items: [
        'features/studio',
        'features/freeflow',
        'features/knowledge',
        'features/tools',
        'features/tasks',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: true,
      items: [
        'agents-and-integrations/overview',
        'agents-and-integrations/official-integrations',
      ],
    },
    {
      type: 'category',
      label: 'Account & Administration',
      collapsed: true,
      items: [
        'administration/preferences',
        'administration/user-management',
        'administration/roles-and-permissions',
        'administration/company-settings',
      ],
    },
    {
      type: 'category',
      label: 'Legal',
      collapsed: true,
      items: [
        'privacy-policy',
        'terms-of-service',
      ],
    },
  ],
};

export default sidebars;
