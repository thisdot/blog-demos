import { getUsers } from '$lib/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    users: getUsers(),
    currentUser: locals.user?.id,
  };
};
