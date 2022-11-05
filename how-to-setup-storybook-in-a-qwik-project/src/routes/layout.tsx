import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';

export default component$(() => {
  const menus = [
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
  return (
    <>
      <main>
        <Header menus={menus} />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer>
    </>
  );
});
