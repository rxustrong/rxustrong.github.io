import { getCollection } from 'astro:content';
export const categories = ['成长记录', '主题手记', '阶段回顾'] as const;
export const topicDescriptions: Record<string, string> = {
  投资: '理解企业，也检验自己的判断。', 阅读: '把读到的东西，慢慢变成自己的理解。',
  英语: '在另一种语言里，拓宽一点世界。', 技术: '亲手试一试，记录问题和发现。',
  个人成长: '留下尝试、困惑和认识的变化。', 生活: '记录值得记住的人、事与日常。',
};
export const growthLabels = { seedling: '幼苗', budding: '生长中', evergreen: '常青' } as const;
export async function gardenPosts(includeDrafts = import.meta.env.DEV) {
  return (await getCollection('posts', ({ data }) => includeDrafts || (!data.draft && !data.demo)))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export function formatDate(date: Date) { return date.toISOString().slice(0, 10); }
export function topicUrl(topic: string) { return `/topics/${encodeURIComponent(topic)}/`; }
