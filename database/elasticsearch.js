/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */

const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client( {
    hosts: [
        `https://${process.env.ELASTICSEARCH_USER}:${process.env.ELASTICSEARCH_PASSWORD}@${process.env.ELASTICSEARCH_HOST}`
    ]
});

module.exports = client;
