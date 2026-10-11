import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
async function filesAt(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory()
    ? filesAt(path.join(dir, e.name)) : [path.join(dir, e.name)]))).flat();
}

test('published Markdown and MDX get stable URLs; drafts never enter public output', async () => {
  const posts = path.join(root, 'src/content/posts');
  const names = ['verification-public.md', 'verification-component.mdx', 'verification-draft.md', 'verification-default-draft.md', 'verification-demo.md'];
  const out = path.join(root, '.astro/publication-test');
  for (const name of names) await assert.rejects(readFile(path.join(posts, name)), { code: 'ENOENT' });
  await mkdir(posts, { recursive: true });
  try {
    await writeFile(path.join(posts, names[0]), '---\ntitle: "PUBLIC_FIXTURE"\ndate: 2026-10-12\ntags: ["验证主题"]\ndraft: false\n---\nPUBLIC_BODY\n');
    await writeFile(path.join(posts, names[1]), '---\ntitle: "MDX_FIXTURE"\ndate: 2026-10-11\ntags: ["验证主题"]\ndraft: false\n---\n<div data-mdx="supported">MDX_BODY</div>\n');
    await writeFile(path.join(posts, names[2]), '---\ntitle: "PRIVATE_DRAFT_SENTINEL"\ndate: 2026-10-12\ntags: ["PRIVATE_TAG_SENTINEL"]\ndraft: true\n---\nPRIVATE_BODY_SENTINEL\n');
    await writeFile(path.join(posts, names[3]), '---\ntitle: "PRIVATE_DRAFT_SENTINEL_DEFAULT"\ndate: 2026-10-12\n---\nPRIVATE_BODY_SENTINEL_DEFAULT\n');
    await writeFile(path.join(posts, names[4]), '---\ntitle: "PRIVATE_DRAFT_SENTINEL_DEMO"\ndate: 2026-10-12\ndraft: false\ndemo: true\n---\nPRIVATE_BODY_SENTINEL_DEMO\n');
    const build = spawnSync(process.execPath, ['node_modules/astro/astro.js', 'build', '--outDir', '.astro/publication-test'], { cwd: root, encoding: 'utf8', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }, timeout: 120000 });
    assert.equal(build.status, 0, build.stdout + build.stderr);
    assert.match(await readFile(path.join(out, 'posts/verification-public/index.html'), 'utf8'), /PUBLIC_BODY/);
    assert.match(await readFile(path.join(out, 'posts/verification-component/index.html'), 'utf8'), /MDX_BODY/);
    for (const file of await filesAt(out)) {
      if (!/\.(html|xml|json|js|css)$/.test(file)) continue;
      assert.doesNotMatch(await readFile(file, 'utf8'), /PRIVATE_(DRAFT|BODY|TAG)_SENTINEL/, `Draft leaked into ${file}`);
    }
    await assert.rejects(readFile(path.join(out, 'posts/verification-draft/index.html')), { code: 'ENOENT' });
    assert.match(await readFile(path.join(out, 'rss.xml'), 'utf8'), /verification-public/);
    assert.match(await readFile(path.join(out, 'topics/index.html'), 'utf8'), /验证主题/);
    assert.match(await readFile(path.join(out, 'archive/index.html'), 'utf8'), /2026/);
    assert.match(await readFile(path.join(out, 'topics/验证主题/index.html'), 'utf8'), /PUBLIC_FIXTURE/);
  } finally {
    for (const name of names) await rm(path.join(posts, name), { force: true });
  }
});
