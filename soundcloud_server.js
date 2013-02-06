(function () {
  Accounts.oauth.registerService('soundcloud', 2, function(query) {

    var accessToken = getAccessToken(query);
    var identity = getIdentity(accessToken);

    return {
      serviceData: {
        id: identity.id,
        accessToken: accessToken,
	     email: identity.email,
	     username: identity.username
      },
      options: {profile: {name: identity.username}}
    };
  });

  var getAccessToken = function (query) {
    var config = Accounts.loginServiceConfiguration.findOne({service: 'soundcloud'});
    if (!config)
      throw new Accounts.ConfigError("Service not configured");

    var result = Meteor.http.post(
      "https://api.soundcloud.com/oauth2/token", {headers: {Accept: 'application/json'}, params: {
	code: query.code,
  grant_type: "authorization_code",
	client_id: config.clientId,
	client_secret: config.secret,
	redirect_uri: Meteor.absoluteUrl("_oauth/soundcloud?close"),
	state: query.state
      }});
    if (result.error) // if the http response was an error
      throw result.error;
    if (result.data.error) // if the http response was a json object with an error attribute
      throw result.data;
    return result.data.access_token;
  };

  var getIdentity = function (accessToken) {
    var result = Meteor.http.get(
      "https://api.soundcloud.com/me",
      {params: {access_token: accessToken}});
    if (result.error)
      throw result.error;
    return result.data;
  };
}) ();