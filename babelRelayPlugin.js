var babelRelayPlugin   = require('babel-relay-plugin');
var introspectionQuery = require('graphql/utilities').introspectionQuery;
var printSchema = require('graphql/utilities').printSchema;
var request = require('sync-request');

var graphqlHubUrl = 'http://localhost:5000/';
var response = request('GET', graphqlHubUrl, {
  qs: {
    query: introspectionQuery
  }
});

var schema = JSON.parse(response.body.toString('utf-8'));

module.exports = babelRelayPlugin(schema.data, {
  abortOnError: true
});