import type { CollectionEntry } from 'astro:content';
import type { ContentCollectionKey } from 'astro:content';

/** 从内容条目的 id（含文件扩展名）中取出干净的 slug */
export function slugOf(post: CollectionEntry<ContentCollectionKey>): string {
  return post.id.replace(/\.[^.]+$/, '');
}