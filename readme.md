# @carnesen/bitcoin-regtest-service  [![npm version](https://badge.fury.io/js/%40carnesen%2Fbitcoin-regtest-service.svg)](https://badge.fury.io/js/%40carnesen%2Fbitcoin-regtest-service) [![Build Status](https://travis-ci.com/carnesen/bitcoin-regtest-service.svg?branch=master)](https://travis-ci.com/carnesen/bitcoin-regtest-service)

A Node.js library for managing a "regtest"-mode `bitcoind` service. The package includes runtime JavaScript files suitable for Node.js >=8 as well as the corresponding TypeScript type declarations.

## Usage

The `RegtestService` class combines features of [`@carnesen/bitcoin-config`](https://github.com/carnesen/bitcoin-config), [`@carnesen/bitcoin-software`](https://github.com/carnesen/bitcoin-software), and [`@carnesen/bitcoin-service`](https://github.com/carnesen/bitcoin-service) into a single easy-to-use object. The `start` method installs the software and writes a config file before spawning the service. A common use case is for unit testing:

```js
const { regtestService } = require('@carnesen/bitcoin-regtest-service');

describe('A unit test', () => {
  beforeAll(() => regtest.start(), 30000);
  // ^^ This method installs the software if it hasn't been already,
  // which can take upward of 30 seconds depending on bandwidth.

  afterAll(() => regtest.stop());

  it('does the right thing', () => {
    // Some test that uses the bitcoin regtest service ...
  })
})
```
## API

### `new RegtestService({datadir?}): instance`
Create a new instance of the `RegtestService` class.

#### `datadir`
Optional `string`. Absolute path of a directory for the service software and its data.

### `instance.start(): Promise<void>`
Installs the software if it hasn't been already, writes a configuration file, and starts the `bitcoind` service.

### `instance.stop(): Promise<void>`
Stops the service.

### `instance.restart(): Promise<void>`
Restarts the service.

### `instance.isRunning(): Promise<boolean>`
Returns a promise that resolves to `true` if the service is running or `false` if it is not.

### `instance.bitcoinHome`
`string` getter. Absolute path where the regtest service's software is installed.

### `instance.configFilePath`
`string` getter. Absolute path of the regtest service's configuration file.

### `instance.rpcHref`
`string` getter. "href" string of the service's remote procedure call (RPC) interface(e.g. `'http://rpcuser:rpcpassword@localhost:48332'`), suitable for parsing using the [WHATWG URL API](https://nodejs.org/api/url.html#url_the_whatwg_url_api).

## More information
Check out [the tests directory](src/__tests__) for more examples of how to use this library. If you encounter any bugs or have any questions or feature requests, please don't hesitate to [file an issue](https://github.com/carnesen/bitcoin-regtest-service/issues/new) or [submit a pull request](https://github.com/carnesen/bitcoin-regtest-service/compare) on [this project's repository on GitHub](https://github.com/carnesen/bitcoin-regtest-service).

## Related
- [@carnesen/bitcoin-regtest-service-cli](https://github.com/carnesen/bitcoin-regtest-service-cli): A Node.js command-line interface for managing a regtest-mode `bitcoind` service
- [@carnesen/bitcoin-config](https://github.com/carnesen/bitcoin-config): A Node.js library for bitcoin server software configuration
- [@carnesen/bitcoin-service](https://github.com/carnesen/bitcoin-service): A Node.js library for managing the bitcoin service `bitcoind`
- [@carnesen/bitcoin-software](https://github.com/carnesen/bitcoin-software): A Node.js library for installing bitcoin server software

## License

MIT © [Chris Arnesen](https://www.carnesen.com)
