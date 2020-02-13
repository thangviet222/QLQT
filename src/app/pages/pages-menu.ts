import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Administration',
    icon: 'lock-outline',
    children: [
      {
        title: 'User',
        link: '/pages/administration/user',
      },
      {
        title: 'Role',
        link: '/pages/administration/role',
      },
      {
        title: 'Right',
        link: '/pages/administration/right',
      },
      {
        title: 'Api',
        link: '/pages/administration/api',
      },
      {
        title: 'Access',
        link: '/pages/administration/access',
      },
    ],
  },
  {
    title: 'Process Manager',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: 'Process Time',
        link: '/pages/process/time',
      },
      {
        title: 'Process Manager',
        link: '/pages/process/manager',
      },
      {
        title: 'Process History',
        link: '/pages/process/history',
      },
      {
        title: 'Project Issue',
        link: '/pages/process/project-issue',
      }
    ],
  }
];
