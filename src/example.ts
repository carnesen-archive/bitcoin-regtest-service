#!/usr/bin/node

import { resolve } from 'path';
import { BitcoinRegtestService } from '.';

export const devService = new BitcoinRegtestService({
  datadir: resolve(__dirname, '..', 'tmp'),
});

if (module === require.main) {
  devService.installAndExit();
}
