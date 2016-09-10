var dl = require('datalib');

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
