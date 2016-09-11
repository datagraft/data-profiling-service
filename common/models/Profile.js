'use strict';

var dl = require('datalib');

module.exports = function(Profile) {

  Profile.disableRemoteMethod("create", false);
  Profile.disableRemoteMethod("upsert", true);
  Profile.disableRemoteMethod("updateAll", true);

  Profile.disableRemoteMethod("find", false);
  Profile.disableRemoteMethod("findById", false);
  Profile.disableRemoteMethod("findOne", true);

  Profile.disableRemoteMethod("deleteById", false);

  Profile.disableRemoteMethod("count", true);
  Profile.disableRemoteMethod("exists", true);

  Profile.disableRemoteMethod("createChangeStream", true);
  Profile.disableRemoteMethod("replaceOrCreate", true);
  Profile.disableRemoteMethod("prototype.updateAttributes", true);
  Profile.disableRemoteMethod("replaceById", true);

  // Summary-full statistics override findById
  Profile.summaryFull = function(id, cb) {

    Profile.findById( id, function (err, instance) {

      var csv = dl.csv(instance.url);

      var data = dl.summary(csv);

      for(var i = 0; i < data.length; i++) {
        delete data[i].unique;
      }
      cb(null, data);
    });
  };

  // Summary-full remote method
  Profile.remoteMethod (
    'summaryFull',
    {
      http: {path: '/summary/full', verb: 'get'},
      description: 'Generate a full summary for all columns in a dataset.',
      accepts: {arg: 'profileId', type: 'number', http: { source: 'query' } },
      returns: {arg: 'Summary full', type: 'String'}
    }
  );

  // Summary-column statistics override findById
  Profile.summaryColumn = function(profileId, cb) {

    Profile.findById( profileId, function (err, instance) {

      var csv = dl.csv(instance.url);

      var data = dl.summary(csv, [instance.column]);

      cb(null, data);
    });
  };

  // Summary-column remote method
  Profile.remoteMethod (
    'summaryColumn',
    {
      http: {path: '/summary/column', verb: 'get'},
      description: 'Generate a summary for a specified column.',
      accepts: {arg: 'profileId', type: 'number', http: { source: 'query' } },
      returns: {arg: 'Summary column', type: 'String'}
    }
  );
};

