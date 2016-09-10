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

  Profile.disableRemoteMethod("count", false);
  Profile.disableRemoteMethod("exists", true);

  Profile.disableRemoteMethod("createChangeStream", true);
  Profile.disableRemoteMethod("replaceOrCreate", true);
  Profile.disableRemoteMethod("prototype.updateAttributes", true);
  Profile.disableRemoteMethod("replaceById", true);

  Profile.summary = function(profileId, cb) {

    Profile.findById( profileId, function (err, instance) {

      var data = dl.summary(dl.csv(instance.url));

      for(var i = 0; i < data.length; i++) {
        delete data[i].unique;
      }
      cb(null, data);
    });
  };

    Profile.remoteMethod (
      'summary',
      {
        http: {path: '/summary', verb: 'get'},
        accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
        returns: {arg: 'name', type: 'string'}
      }
    );

};
