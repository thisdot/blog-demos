<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  type Expense = {
    amount: number; // total cost of the expense, including tax
    author: string; // who purchased the item
    client: string; // what client the item was purchased for
    date: number | Date | string; // the date the item was purchased
    notes: string; // additional clarifying notes
    vendor: string; // where the item was purchased
  };
  export let expenses: Expense[] | undefined;
  export let showAuthorColumn = true;

  const dispatch = createEventDispatcher();

  const dateFormatter = new Intl.DateTimeFormat('en-US');
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const formatDate = (date: Date | number | string) =>
    typeof date === 'string' ? dateFormatter.format(new Date(date)) : dateFormatter.format(date);

  const handleViewExpenseDetails = (expense: Expense) => {
    dispatch('selected', expense);
  };

  const handleNewExpenseReport = () => {
    dispatch('new');
  };
</script>

<figure>
  <table role="grid">
    <thead>
      <tr>
        {#if showAuthorColumn}
          <th scope="col">Author</th>
        {/if}
        <th scope="col">Amount</th>
        <th scope="col">Date</th>
        <th scope="col">Vendor</th>
        <th scope="col">Notes</th>
        <th scope="col">Client</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#if !expenses}
        <tr><td class="pending" colspan="7" aria-busy="true">Loading...</td></tr>
      {:else if expenses.length === 0}
        <tr><td class="empty" colspan="7">No expenses found</td></tr>
      {:else}
        {#each expenses as expense}
          <tr on:click={() => handleViewExpenseDetails(expense)}>
            {#if showAuthorColumn}
              <th scope="row">{expense.author}</th>
            {/if}
            <td>{currencyFormatter.format(expense.amount / 100)}</td>
            <td>{formatDate(expense.date)}</td>
            <td>{expense.vendor}</td>
            <td>{expense.notes}</td>
            <td>{expense.client}</td>
            <td>
              <button class="details secondary">Details</button>
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</figure>

<div class="control">
  <button on:click={handleNewExpenseReport}>&plus; New Expense Report</button>
</div>

<style>
  tbody > tr {
    cursor: pointer;
  }

  .control {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .control > * {
    flex-basis: content;
  }

  .pending,
  .empty {
    text-align: center;
    vertical-align: middle;
    height: 15rem;
  }

  button {
    display: inline-block;
    text-decoration: none;
  }

  button.details {
    padding: 0.2em 0.5em;
    font-size: 0.8em;
    margin: auto;
  }
</style>
