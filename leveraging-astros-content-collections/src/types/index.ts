export type BlogPost = {
  title: string;
  description: string;
  pubDate: string;
  updatedDate: string;
  heroImage: string;
  slug: string;
  layout: string;
};

export type MappedBlogPost = {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate: Date;
  heroImage: string;
  slug: string;
  layout: string;
};
