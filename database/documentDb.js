/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */

const mongoClient = require('mongodb').MongoClient;
const fs = require('fs');

let _db;

let component = {
    getDb: async () => {
        if (!_db) {
            let result = (process.env.APP_ENV === 'local' || process.env.APP_ENV === 'development') ? await getConnectionsAtlas() : await getConnections();

            if (!result) {
                console.error('Error connecting to mongodb.');
                return null;
            }
        }

        return _db;
    }
};

async function getConnectionsAtlas() {
    if (_db) {
        return _db;
    }

    let uri;
    let connectConfig = {
        poolSize: 1,
        keepAlive: true,
        connectTimeoutMS: 5000,
        useUnifiedTopology: true,
        // autoReconnect: true,
        // reconnectTries: 10,
    };

    uri = `mongodb+srv://${process.env.DOCUMENTDB_USERNAME}:${process.env.DOCUMENTDB_PASSWORD}@${process.env.DOCUMENTDB_HOST}`;

    try {
        _db = await mongoClient.connect(uri, connectConfig);
        _db = _db.db(process.env.DOCUMENTDB_DATABASE);
    } catch (err) {
        console.error(err);
    }

    return _db;
}

async function getConnections() {
    if (_db) {
        console.log({_db: _db});
        return _db;
    }

    const ca = fs.readFileSync(__dirname + '/rds-combined-ca-bundle.pem');

    let uri;
    let options = {
        sslValidate: true,
        sslCA: ca,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    uri = `mongodb://${process.env.DOCUMENTDB_USERNAME}:${process.env.DOCUMENTDB_PASSWORD}@${process.env.DOCUMENTDB_HOST}/${process.env.DOCUMENTDB_DATABASE}?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retrywrites=false`;

    try {
        _db = await mongoClient.connect(uri, options);
        _db = _db.db(process.env.DOCUMENTDB_DATABASE);
    } catch (err) {
        console.error(err);
    }

    return _db;
}

module.exports = component;
