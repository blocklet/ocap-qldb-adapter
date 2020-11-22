/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
require('dotenv').config();

const QLDB = require('@ocap/driver-qldb').default;

(async () => {
  const ledger = process.env.AWS_LEDGER || 'ocap-qldb-demo';
  const region = process.env.AWS_REGION || 'us-west-2';

  const client = new QLDB({
    debug: true,
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    accessSecret: process.env.AWS_SECRET_ACCESS_KEY,
    ledger,
    region,
  });

  const { Ledgers } = await client.list();
  if (Ledgers.find(x => x.Name === ledger)) {
    console.log('Ledger already created');
    return process.exit(0);
  }

  const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));
  const waitForActive = async () => {
    console.log(`Waiting for ledger ${ledger} to become active...`);
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const result = await client.describe({ Name: ledger });
      if (result.State === 'ACTIVE') {
        console.log('Success. Ledger is active and ready to be used.');
        return result;
      }
      console.log('The ledger is still creating. Please wait...');
      await sleep(5000);
    }
  };

  let result = await client.create({ Name: ledger, PermissionsMode: 'ALLOW_ALL' });
  console.log('ledger created successfully', result);
  result = await waitForActive();
  console.log('ledger is active', result);
  return process.exit(0);
})();
