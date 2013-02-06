Template.configureLoginServiceDialogForSoundcloud.siteUrl = function () {
  return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForSoundcloud.fields = function () {
  return [
    {property: 'clientId', label: 'Client ID'},
    {property: 'secret', label: 'Client Secret'}
  ];
};