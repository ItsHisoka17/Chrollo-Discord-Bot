class RequestHandler {
    /**
     * 
     * @param {string} URL 
     * @param {object} query 
     */
    constructor(URL, query = {}){
        this.URL = URL;
        this.query = this._resolveQuery(query);
        this.fetch = require('node-superfetch');

    }

    get mainURL(){
        return `${this.URL}${this.query}`
    }
    /**
     * @returns {Promise<object>}
     */
async get(){
    return new Promise(async (resolve, reject) => {
      let res = await this.fetch.get(this.mainURL);
      if (!res.ok || res.status !== 200) reject(new Error(res.statusText));
      let { body, text } = res;

      resolve({json: body, pure: text})
    })
    }

async post(){

    }

async delete(){
    return new Promise(async (resolve, reject) => {
    resolve(this)
    })
    }

async patch(){
    return new Promise(async (resolve, reject) => {
        resolve(this)
        })
    }
    /**
     * 
     * @param {object} que
     * @returns {string} 
     */
_resolveQuery(que){
    
    let query = '';

    for (const [key, q] of Object.entries(que)){
        query += `${key}=${q}&`
    }
}
}

module.exports = RequestHandler;