const ICrud = require('../base/interfaceDB')
const Mongoose = require('mongoose')
const config = require('config')

const STATUS = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
}

class MongoDB extends ICrud {

  constructor(connection, schema) {        
    super()
    this._connection = connection
    this._collection = schema
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState]
    if (state === 'connected') return state;

    if (state !== 'connecting') return state

    await new Promise(resolve => setTimeout(resolve, 1000))

    return STATUS[this._connection.readyState]

  }

  static connect() {
    const username = config.get('mongodb.username') || ""
    const password = config.get('mongodb.password') || ""
    const server = config.get('mongodb.server') || "localhost"
    const port = config.get('mongodb.port') || 27017
    const database = config.get('mongodb.database') || "movies"

    const uri = `mongodb://${username}:${password}@${server}:${port}/${database}`

    Mongoose.connect(uri, {
      useNewUrlParser: true
    }, function (error) {
      if (!error) return;
      console.log('Unable to connect in database server!', error)
    })
    const connection = Mongoose.connection
    connection.once('open', () => console.log('database online...'))
    return connection
  }

  async create(item) {
    return this._collection.create(item)
  }
  async read(query) {
    return this._collection.find(query)
  }
  async update(_id, item) {
    return this._collection.updateOne({ _id }, { $set: item })
  }

  async delete(_id) {
    return this._collection.deleteOne({ _id })
  }
}

module.exports = MongoDB
