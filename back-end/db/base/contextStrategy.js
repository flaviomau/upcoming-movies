const IDb = require('./interfaceDB')
class ContextStrategy extends IDb {
  constructor(database) {
    super()
    this._database = database
  }

  isConnected() {
    return this._database.isConnected()
  }

  connect() {
    return this._database.connect()
  }

  async create(item) {
    return this._database.create(item)
  }

  read(item, option) {
    return this._database.read(item, option)
  }

  update(id, item) {
    return this._database.update(id, item)
  }
  
  delete(id) {
    return this._database.delete(id)
  }

  drop(collection) {
    return this._database.drop(collection)
  }
}

module.exports = ContextStrategy