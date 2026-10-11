import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { gardenPosts } from '../utils/garden';
import { slugOf } from '../utils/slug';
export async function GET(context: APIContext) {
  return rss({ title: '瑞安漂流日记', description: '阅读、投资、学习与生活，记录想法的来处与变化。', site: context.site!,
    items: (await gardenPosts(false)).map(p => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: `/posts/${slugOf(p)}/` })),
    customData: '<language>zh-cn</language>',
  });
}
