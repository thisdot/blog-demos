<script lang="ts">
  import ExpenseTable from '$lib/ui/components/ExpenseTable.svelte';
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;
  $: expenses = data.expenses;
</script>

<ExpenseTable
  {expenses}
  on:new={() => goto(`/new`)}
  on:selected={({ detail: expense }) => goto(`/${expense.id}`)}
/>
