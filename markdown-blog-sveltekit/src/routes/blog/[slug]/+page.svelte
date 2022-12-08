<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  const url = `https://127.0.0.1:5173/${data.post.slug}`;

  // generated open-graph image for sharing on social media.
  // see https://og-image.vercel.app/ for more options.
  const ogImage = `https://og-image.vercel.app/**${encodeURIComponent(
    data.post.title
  )}**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`;
</script>

<svelte:head>
  <title>{data.post.title} - Author</title>
  <meta name="description" content={data.post.preview.text} />
  <meta name="author" content="Author" />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.preview.text} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="https://127.0.0.1:5173" />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:title" content={data.post.title} />
  <meta name="twitter:description" content={data.post.preview.text} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="root">
  <div class="post-container">
    <article>
      <header class="flex flex-col">
        <h1
          class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
        >
          {data.post.title}
        </h1>
        <div class="flex items-center order-first text-base text-zinc-400 dark:text-zinc-500">
          <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
          <span class="ml-3">{data.post.date}</span>
        </div>
      </header>

      <!-- render the post -->
      <div class="prose">
        <p>Hello</p>
        <svelte:component this={data.component} />
      </div>
    </article>
  </div>
</div>

<style lang="scss">
  .root {
    display: grid;
    grid-template-columns: 1fr;
  }
</style>
