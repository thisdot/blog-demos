<script lang="ts">
  import { afterUpdate, createEventDispatcher } from 'svelte';

  type User = {
    name: string;
    picture: string;
  };
  export let users: User[];

  export let selected: User | undefined;

  const dispatch = createEventDispatcher();
  let selectUserDropdownEl: HTMLDetailsElement;

  $: otherUsers = users.filter((u) => u !== selected);

  afterUpdate(() => {
    if (!selected || !users.includes(selected)) {
      selected = users[0];
      dispatch('selectedChange', selected);
    }
  });

  const handleSelectUser = (user: User) => {
    selected = user;
    selectUserDropdownEl.open = false;
    dispatch('selectedChange', user);
  };
</script>

<div class="user-dropdown">
  <div class="loggedin">Logged in as:</div>
  <details role="list" bind:this={selectUserDropdownEl}>
    <summary aria-haspopup="listbox">
      {#if selected && users}
        <figure>
          <img src={selected?.picture} alt="" />
          <figcaption>{selected?.name}</figcaption>
        </figure>
      {:else}
        <div class="loading" aria-busy={selected ? null : 'true'} />
      {/if}
    </summary>
    <ul role="listbox">
      {#each otherUsers as user}
        <li>
          <a href="." tabindex="0" on:click={() => handleSelectUser(user)}>
            <figure>
              <img src={user.picture} alt="" />
              <figcaption>{user.name}</figcaption>
            </figure>
          </a>
        </li>
      {/each}
    </ul>
  </details>
</div>

<style lang="scss">
  img {
    display: block;
    width: 3rem;
    border-radius: 50%;
    border: 5px solid var(--secondary);
    margin: auto;
    background: transparent none;
    color: transparent;
    user-select: none;
    pointer-events: none;
  }
  li {
    cursor: pointer;
  }
  details[role='list'] summary:not([role]) {
    align-items: center;
    border: 0 none;
    padding-inline-start: 1rem;
  }
  details[role='list'] summary::after {
    width: 1.5rem;
  }
  figure {
    margin: 0;
    text-align: center;
  }
  .loggedin {
    font-size: 0.8em;
    padding-left: 0.5em;
  }
  .user-dropdown {
    scale: 0.8;
  }
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 4.4rem;
  }
</style>
