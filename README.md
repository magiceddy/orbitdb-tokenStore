# orbitdb-tokenStore

Database for storing indexed array based on [OrbitDB docStore](https://github.com/orbitdb/orbit-db-docstore)

The purpose of this extension is to override default _put_ function in order to provide a mandatory __tokens_ field. Every time a _put_ is called the list passed will be merged into the older one.

# Install

> yarn add orbitdb-tokenstore

# Usage

```javascript
const TokenStore = require('orbitdb-tokenstore');
const OrbitDb = require('orbit-db');
const ipfsAPI = require('ipfs-api');

const ipfs = ipfsAPI('localhost', '5001', { protocol: 'https' });

OrbitDB.addDatabaseType(TokenStore.type, TokenStore);
const orbitdb = new OrbitDB(ipfs);

const db = await orbitdb.open("test", {
    type: TokenStore.type,
    create: true
  });

await db.put({ _id: 'myId', _tokens: ['DTH'] });
await db.put({ _id: 'myId', _tokens: ['DTH', 'ZRX'] });
await db.put({ _id: 'muId', _tokens: ['TTT'], price: '0.01 });

db.get('myId').map((e) => console.log(e._tokens));
// [{ _id: 'myId', _tokens: ['DTH', 'ZRX', 'TTT']}]
```
