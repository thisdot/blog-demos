import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
  // load the markdown file based on slug
  const component = await import(`../../../lib/posts/${data.post.slug}.md`);

  return {
    post: data.post,
    component: component.default,
    layout: {
      fullWidth: true,
    },
  };
};
