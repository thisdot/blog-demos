import { Meta } from '@storybook/html';
import Header, {HeaderProps} from './header';

export default {
  title: 'Header',
} as Meta;

const Template = (args: HeaderProps) => <Header menus={args.menus} />;

export const Demo: any = Template.bind({
    menus: []
});

Demo.args = {
    menus: [
        {
          name: 'Docs',
          link: 'https://qwik.builder.io/docs/components/overview/',
        },
        {
          name: 'Examples',
          link: 'https://qwik.builder.io/examples/introduction/hello-world/',
        },
        {
          name: 'Tutorials',
          link: 'https://qwik.builder.io/tutorial/welcome/overview/',
        },
      ]
};
