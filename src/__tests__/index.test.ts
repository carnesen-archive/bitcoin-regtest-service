import { devService as subject } from '../example';

describe(subject.constructor.name, () => {
  it('starts, stops, and restarts', async () => {
    await subject.stop();
    expect(await subject.isRunning()).toBe(false);
    await subject.start();
    expect(await subject.isRunning()).toBe(true);
    await subject.restart();
    expect(await subject.isRunning()).toBe(true);
    await subject.stop();
    expect(await subject.isRunning()).toBe(false);
  });

  it('installs', async () => {
    await subject.install();
  });

  it('has getter rpcHref', () => {
    expect(subject.rpcHref).toMatch(/^http/);
  });
});
