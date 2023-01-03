<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  $: expense = data.expense;
</script>

<pre>{JSON.stringify(expense, null, 2)}</pre>

<style>
  pre {
    white-space: pre-wrap;
    background-color: #f5f5f5;
    padding: 1rem;
  }
</style>
