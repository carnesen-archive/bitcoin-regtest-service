import { writeConfigFile, toAbsolute, BitcoinConfig } from '@carnesen/bitcoin-config';
import { installSoftware } from '@carnesen/bitcoin-software';
import {
  startService,
  stopService,
  restartService,
  isServiceRunning,
} from '@carnesen/bitcoin-service';
import { URL } from 'url';
import { runAndExit } from '@carnesen/run-and-exit';

export type BitcoinRegtestServiceOptions = Pick<BitcoinConfig, 'datadir'>;

const config: Required<
  Pick<BitcoinConfig, 'rpcuser' | 'rpcpassword' | 'port' | 'rpcport'>
> = {
  rpcuser: 'rpcuser',
  rpcpassword: 'rpcpassword',
  port: 48333,
  rpcport: 48332,
};

export class BitcoinRegtestService {
  private readonly options: BitcoinRegtestServiceOptions;
  constructor(options: BitcoinRegtestServiceOptions = {}) {
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
    url.username = config.rpcuser;
    url.password = config.rpcpassword;
    url.port = config.rpcport.toString();
    return url.href;
  }

  public install() {
    writeConfigFile(this.configFilePath, {
      datadir: this.options.datadir,
      regtest: true,
      sections: {
        regtest: config,
      },
    });
    return installSoftware(this.bitcoinHome);
  }

  public installAndExit() {
    runAndExit(async () => {
      await this.install();
      return 'Installed bitcoin dev service';
    });
  }

  public start() {
    return startService(this.configFilePath, this.bitcoinHome);
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
