import { resolve } from 'path';

import { RegtestService } from '..';

const subject = new RegtestService({
  datadir: resolve(__dirname, '..', '..', 'tmp'),
});

describe(RegtestService.name, () => {
  it('starts, stops, and restarts', async () => {
    await subject.stop();
    expect(await subject.isRunning()).toBe(false);
    await subject.start();
    expect(await subject.isRunning()).toBe(true);
    await subject.restart();
    expect(await subject.isRunning()).toBe(true);
    await subject.stop();
    expect(await subject.isRunning()).toBe(false);
  }, 30000);

  it('has getter rpcHref', () => {
    expect(subject.rpcHref).toMatch(/^http/);
  });
});
