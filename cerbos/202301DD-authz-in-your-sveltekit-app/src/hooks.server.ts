import type { Handle } from '@sveltejs/kit';
import { handleAuth } from '$lib/auth/auth';

export const handle = (async ({ event, resolve }) => {
  return handleAuth({ event, resolve });
}) satisfies Handle;
