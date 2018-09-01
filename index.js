const DocumentStore = require('orbit-db-docstore');

class TokesStore extends DocumentStore {
  constructor(ipfs, id, dbname, options) {
    super(ipfs, id, dbname, options);
    this._type = TokesStore.type;
  }

  static get type() {
    return 'tokens'
  }

  /**
   * Store Token List into _token field
   * @param {string} _id Document index
   * @param {array} _tokens List of tokens to by added
   * @return {Promise} Returns a Promise that resolves to the multihash of 
   *                   the entry as a String
   */
  async put({ _id, _tokens: newTokens = [] }) {
    return new Promise((resolve, reject) => {
      if (!newTokens instanceof Array) {
        reject('_token must be an instance of Array');
      }
      const entries = super.get(_id).map(entry => entry);
      let tokensStored = entries.length > 0 ?
        tokensStored = entries[0]._tokens :
        [];

      const newTokenSet = new Set([...tokensStored, ...newTokens]);
      const hash = await super.put({ _id, _tokens: [...newTokenSet] });
      resolve(hash);
    });
  }
}

module.exports = TokesStore;
