<script lang="ts">
  import UserDropdown from '$lib/ui/components/UserDropdown.svelte';
  import Header from '$lib/ui/components/Header.svelte';
  import { logInUser } from '$lib/auth/auth';
  import type { LayoutData } from './$types';
  import '@picocss/pico';
  import '../global.css';

  export let data: LayoutData;
  $: users = data.users;
  $: currentUser = users?.find((u) => u.id === data.currentUser);
</script>

<Header>
  <UserDropdown
    {users}
    selected={currentUser}
    on:selectedChange={({ detail: user }) => logInUser(user)}
  />
</Header>
<main class="container">
  <slot />
</main>

<footer class="container" />
