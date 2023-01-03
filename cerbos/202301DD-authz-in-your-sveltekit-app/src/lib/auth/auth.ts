import type { Handle } from '@sveltejs/kit';
import { getUserById } from '$lib/db';
import { invalidateAll } from '$app/navigation';

export type User = Exclude<App.Locals['user'], undefined>;

export const handleAuth = (async ({ event, resolve }) => {
  event.locals.user = await validateUser(event.cookies.get('user'));
  return resolve(event);
}) satisfies Handle;

export const logInUser = async (user?: User) => {
  if (!user) return;
  document.cookie = `user=${user.id}`;
  return invalidateAll();
};

export const validateUser = async (token?: string) => {
  return token ? getUserById(token) : undefined;
};
