import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Form from '~/components/form';
import { useLocalStorage } from '~/hooks/useLocalStorage';

export default component$(() => {
  const [cachedName, setName] = useLocalStorage("name", "Guest");

  return (
    <div>
      <h1>
        Welcome to Qwik {cachedName.value} <span class="lightning">⚡️</span>
      </h1>
      <Form value={cachedName.value} setValue={setName} />
      <br />
      <input type="button" value="Reload Page" onClick$={() => window.location.reload() } />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
