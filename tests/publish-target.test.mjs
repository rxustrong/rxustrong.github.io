import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isBlogRemote } from '../scripts/publish-target.mjs';

test('publishing accepts the configured GitHub repository and rejects other targets', () => {
  for (const remote of [
    'git@github.com:rxustrong/rxustrong.github.io.git',
    'https://github.com/rxustrong/rxustrong.github.io.git',
    'https://github.com/rxustrong/rxustrong.github.io',
    'ssh://git@github.com/rxustrong/rxustrong.github.io.git',
  ]) assert.equal(isBlogRemote(remote), true, remote);
  for (const remote of [
    'git@github.com:someone/rxustrong.github.io.git',
    'git@github.com:rxustrong/another-repository.git',
    'https://fakegithub.com/rxustrong/rxustrong.github.io.git',
    'https://github.com/rxustrong/rxustrong.github.io.git/extra',
    'https://github.com.example.org/rxustrong/rxustrong.github.io.git',
  ]) assert.equal(isBlogRemote(remote), false, remote);
});
