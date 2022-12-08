import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
  // load the markdown file based on slug
  const component = data.post.isIndexFile
    ? // vite requires relative paths and explicit file extensions for dynamic imports
      // see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
      await import(`../../../lib/posts/${data.post.slug}/index.md`)
    : await import(`../../../lib/posts/${data.post.slug}.md`);

  return {
    post: data.post,
    component: component.default,
    layout: {
      fullWidth: true,
    },
  };
};
