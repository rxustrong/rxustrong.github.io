import type { CollectionEntry } from 'astro:content';
export function slugOf(post: CollectionEntry<'posts'>): string {
  return post.slug ?? post.id.replace(/\.[^.]+$/, '');
}
