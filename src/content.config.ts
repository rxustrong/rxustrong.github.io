import { defineCollection, z } from 'astro:content';
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), description: z.string().default(''), date: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    category: z.enum(['成长记录', '主题手记', '阶段回顾']).default('主题手记'),
    tags: z.array(z.string()).default([]),
    growth: z.enum(['seedling', 'budding', 'evergreen']).default('seedling'),
    draft: z.boolean().default(true), demo: z.boolean().default(false),
  }),
});
export const collections = { posts };
