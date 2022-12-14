import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Form from '~/components/form';
import { useLocalStorage } from '~/hooks/useLocalStorage';

export default component$(() => {
  const [value, setValue] = useLocalStorage("name", "Guest");

  return (
    <div>
      <h1>
        Welcome to Qwik {value} <span class="lightning">⚡️</span>
      </h1>
      <Form value={value} setValue={setValue} />
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
