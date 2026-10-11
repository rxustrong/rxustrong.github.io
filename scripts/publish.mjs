import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { isBlogRemote } from './publish-target.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
function run(command, args, capture = false) {
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' } });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} 未成功；发布已停止。`);
  return result.stdout?.trim();
}
try {
  console.log('检查类型、公开产物和草稿隔离，再构建正式网站。');
  run(process.execPath, ['node_modules/astro/astro.js', 'check']);
  run(process.execPath, ['--test', 'tests/new-post.test.mjs', 'tests/publication.test.mjs', 'tests/publish-target.test.mjs']);
  run(process.execPath, ['node_modules/astro/astro.js', 'build']);
  if (process.argv.includes('--check-only')) {
    console.log('发布前检查通过。没有推送、提交或上线任何内容。');
  } else {
    if (run('git', ['branch', '--show-current'], true) !== 'main') throw new Error('请在 main 分支发布；先按正常 Git 流程整合你的改动。');
    if (run('git', ['status', '--porcelain'], true)) throw new Error('仍有未提交的改动。请在 VS Code 源代码管理中审阅并提交需要发布的文件，再运行 npm run publish。');
    const remote = run('git', ['remote', 'get-url', 'origin'], true);
    if (!isBlogRemote(remote)) throw new Error('origin 与当前配置的博客仓库不一致，请核对远程仓库。');
    run('git', ['push', 'origin', 'main']);
    console.log('已推送。等待 GitHub Actions 构建部署：https://github.com/rxustrong/rxustrong.github.io/actions\nActions 成功后查看 https://rxustrong.github.io/ 。推送成功不等于部署成功。');
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }
