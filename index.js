/* eslint-disable no-console */
require('dotenv').config();

const cors = require('cors');
const express = require('express');
const createResolver = require('@ocap/resolver');
const Adapter = require('@ocap/adapter-qldb');

const ledger = process.env.AWS_LEDGER || 'ocap-qldb-demo';

const adapter = new Adapter({
  debug: true, // set this to false to disable qldb verbose logging
  accessKey: process.env.AWS_ACCESS_KEY_ID,
  accessSecret: process.env.AWS_SECRET_ACCESS_KEY,
  ledger,
  region: process.env.AWS_REGION || 'us-west-2',
  chainId: ledger,
  token: {
    symbol: 'DEMO',
    name: 'Demo Chain Token',
  },
});

const app = express();
const port = parseInt(process.env.BLOCKLET_PORT, 10) || 4000;

app.use(cors());
app.use('/', createResolver(adapter));

adapter.onReady(() => {
  app.listen(port, () => {
    console.log(`OCAP QLDB Demo ready at ${port}`);
  });
});
