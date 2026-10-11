import { mkdir, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function createPost({ root = fileURLToPath(new URL('../', import.meta.url)), title, date, category = '主题手记', tags = [], mdx = false }) {
  if (typeof title !== 'string' || !title.trim()) throw new Error('请填写文章标题。');
  if (!['成长记录', '主题手记', '阶段回顾'].includes(category)) throw new Error('栏目应为成长记录、主题手记或阶段回顾。');
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  date ??= today;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) throw new Error('日期应为有效的 YYYY-MM-DD。');
  const id = `${date}-${randomBytes(4).toString('hex')}`;
  const directory = path.join(root, 'src/content/posts');
  await mkdir(directory, { recursive: true });
  const file = path.join(directory, `${id}.${mdx ? 'mdx' : 'md'}`);
  const body = ['---', `title: ${JSON.stringify(title.trim())}`, 'description: ""', `date: ${date}`, `category: ${JSON.stringify(category)}`, `tags: ${JSON.stringify(tags)}`, 'growth: seedling', 'draft: true', '---', '', '<!-- 在这里写正文。准备公开时改为 draft: false；标题变化时保留文件名。 -->', '', ''].join('\n');
  await writeFile(file, body, { encoding: 'utf8', flag: 'wx' });
  return { file, url: `/posts/${id}/` };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const take = flag => { const index = args.indexOf(flag); return index < 0 ? undefined : args[index + 1]; };
  try {
    const post = await createPost({ title: args[0], category: take('--category'), tags: take('--tags')?.split(',').map(t => t.trim()).filter(Boolean), mdx: args.includes('--mdx') });
    console.log(`草稿已创建：${post.file}\n本地预览地址：http://localhost:4321${post.url}\n用 VS Code 打开文件开始写作。`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
