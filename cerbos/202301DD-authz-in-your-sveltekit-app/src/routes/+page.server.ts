import { getExpenseReports } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  return {
    expenses: (await getExpenseReports()).filter((exp) => exp.author === locals.user?.id),
  };
};
