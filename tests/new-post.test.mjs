import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

test('new posts are drafts with stable independent filenames and accept Chinese titles', async () => {
  const { createPost } = await import('../scripts/new-post.mjs');
  const root = await mkdtemp(path.join(tmpdir(), 'ruian-new-post-'));
  try {
    const first = await createPost({ root, title: '阅读中的"新发现"', date: '2026-10-12', category: '成长记录', tags: ['阅读'] });
    const second = await createPost({ root, title: '阅读中的"新发现"', date: '2026-10-12', mdx: true });
    assert.notEqual(first.file, second.file);
    assert.match(first.file, /2026-10-12-[a-f0-9]+\.md$/);
    assert.match(second.file, /\.mdx$/);
    const text = await readFile(first.file, 'utf8');
    assert.match(text, /draft: true/);
    assert.match(text, /category: "成长记录"/);
    assert.match(text, /tags: \["阅读"\]/);
    await assert.rejects(createPost({ root, title: ' ', date: '2026-10-12' }), /标题/);
    await assert.rejects(createPost({ root, title: '测试', category: '随意栏目' }), /栏目/);
    await assert.rejects(createPost({ root, title: '测试', date: '2026-02-30' }), /日期/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
