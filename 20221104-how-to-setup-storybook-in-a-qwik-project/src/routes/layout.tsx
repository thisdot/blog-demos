import { component$, createContext, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import Header from '../components/header/header';

export interface SharedState {
  bg: string;
}

export const RepoContext = createContext<SharedState>('repo-context');


export default component$(() => {
  const store = useStore<SharedState>(
    {
      bg: '',
 
    },
    { recursive: true }
  );

  const menus = [
    {
      name: 'Docs',
      link: '/docs',
    },
    {
      name: 'Examples',
      link: '/examples',
    },
    {
      name: 'Tutorials',
      link: '/tutorials',
    },
  ]

  useContextProvider(RepoContext, store);
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
