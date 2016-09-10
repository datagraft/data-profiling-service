'use strict';

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

};
