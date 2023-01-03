import { error } from '@sveltejs/kit';
import { getExpenseReportById } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
  const expense = await getExpenseReportById(params.expenseId);
  if (!expense) {
    throw error(404, 'Not found');
  }
  if (locals.user?.id !== expense.author) {
    throw error(403, 'Forbidden');
  }
  return {
    expense,
  };
}) satisfies PageServerLoad;
