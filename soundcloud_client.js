(function () {
  Meteor.loginWithSoundcloud = function (options, callback) {
    // support both (options, callback) and (callback).
    if (!callback && typeof options === 'function') {
      callback = options;
      options = {};
    }

    var config = Accounts.loginServiceConfiguration.findOne({service: 'soundcloud'});
    if (!config) {
      callback && callback(new Accounts.ConfigError("Service not configured"));
      return;
    }
    var state = Meteor.uuid();

    var loginUrl =
    'https://soundcloud.com/connect' +
    '?client_id=' + config.clientId +
    '&redirect_uri=' + Meteor.absoluteUrl('_oauth/soundcloud?close') +
    '&scope=non-expiring' +
    '&state=' + state;

    Accounts.oauth.initiateLogin(state, loginUrl, callback, {width: 900, height: 450});
  };
}) ();