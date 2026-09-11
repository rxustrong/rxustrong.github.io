import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { slugOf } from '../utils/slug';

export async function GET(context: any) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: '阿燃的漂流日记',
    description: '投资梳理与个人感悟',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/posts/${slugOf(post)}/`,
    })),
    customData: '<language>zh-cn</language>',
  });
}