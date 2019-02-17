import { toAbsolute, BitcoinConfig, updateConfigFile } from '@carnesen/bitcoin-config';
import { installSoftware } from '@carnesen/bitcoin-software';
import {
  startService,
  stopService,
  restartService,
  isServiceRunning,
} from '@carnesen/bitcoin-service';
import { URL } from 'url';

const DEFAULT_CONFIG: Required<
  Pick<BitcoinConfig, 'rpcuser' | 'rpcpassword' | 'port' | 'rpcport'>
> = {
  rpcuser: 'rpcuser',
  rpcpassword: 'rpcpassword',
  port: 48333,
  rpcport: 48332,
};

export type RegtestServiceOptions = Pick<BitcoinConfig, 'datadir'>;

export class RegtestService {
  private readonly options: RegtestServiceOptions;
  constructor(options: RegtestServiceOptions = {}) {
    this.options = options;
  }

  public get configFilePath() {
    return toAbsolute('bitcoin.conf', this.options.datadir);
  }

  public get bitcoinHome() {
    return toAbsolute('bitcoin-core-0.17.1', this.options.datadir);
  }

  public get rpcHref() {
    const url = new URL('http://localhost');
    url.username = DEFAULT_CONFIG.rpcuser;
    url.password = DEFAULT_CONFIG.rpcpassword;
    url.port = DEFAULT_CONFIG.rpcport.toString();
    return url.href;
  }

  public async start() {
    const { changed: changed0 } = updateConfigFile(this.configFilePath, {
      datadir: this.options.datadir,
      regtest: true,
      sections: {
        regtest: DEFAULT_CONFIG,
      },
    });
    const { changed: changed1 } = await installSoftware(this.bitcoinHome);
    const { changed: changed2 } = await startService(
      this.configFilePath,
      this.bitcoinHome,
    );
    return {
      changed: changed0 || changed1 || changed2,
    };
  }

  public stop() {
    return stopService(this.configFilePath);
  }

  public isRunning() {
    return isServiceRunning(this.configFilePath);
  }

  public restart() {
    return restartService(this.configFilePath, this.bitcoinHome);
  }
}
