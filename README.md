# OCAP QLDB Example

This is an example project that shows how to start a OCAP Adapter that's baked by Amazon QLDB.

Checkout [./index.js](./index.js) for example code.

To get the example up and running, please following following steps.

## 1. Get Your AWS Access Key/Secret

https://docs.aws.amazon.com/qldb/latest/developerguide/getting-started.nodejs.html

Your should get your AWS access key and secret when this step is done.

**Make sure your account has full access to qldb ledgers.**

## 2. Create your Ledge on QLDB Console

You should get the ledger name and ledger region when this step is done.

## 3. Setup Config file

Create a `.env` file at this example project root:

```ini
AWS_ACCESS_KEY_ID='CHANGE_THIS_TO_YOUR_ACCESS_KEY'
AWS_SECRET_ACCESS_KEY='CHANGE_THIS_TO_YOUR_ACCESS_SECRET'
AWS_LEDGER='ocap-qldb-demo'
AWS_REGION='ap-northeast-1'
```
