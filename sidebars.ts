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
      label: 'Features',
      collapsed: false,
      items: [
        'features/intelligence',
        'features/knowledge',
        'features/tasks',
        'features/automation',
      ],
    },
    {
      type: 'category',
      label: 'Agents & Integrations',
      collapsed: false,
      items: [
        'agents-and-integrations/overview',
        'agents-and-integrations/official-integrations',
        'agents-and-integrations/custom-mcps',
        'agents-and-integrations/custom-agents',
        {
          type: 'category',
          label: 'Building Your Own',
          items: [
            'agents-and-integrations/mcp-concepts',
            'agents-and-integrations/building-an-mcp-server',
            'agents-and-integrations/testing-your-mcp',
            'agents-and-integrations/deploying-mcps',
            'agents-and-integrations/creating-custom-agents',
            'agents-and-integrations/registering-with-catalex',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      collapsed: true,
      items: [
        'administration/user-management',
        'administration/roles-and-permissions',
        'administration/company-settings',
      ],
    },
  ],
};

export default sidebars;
