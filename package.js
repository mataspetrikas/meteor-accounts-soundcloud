Package.describe({
  summary: "Login service for SoundCloud accounts"
});

Package.on_use(function(api) {
  api.use('accounts-base', ['client', 'server']);
  api.use('accounts-oauth2-helper', ['client', 'server']);
  api.use('http', ['client', 'server']);
  api.use('templating', 'client');

  api.add_files(
    ['soundcloud_login_button.css', 'soundcloud_configure.html', 'soundcloud_configure.js'],
    'client');

  api.add_files('soundcloud_common.js', ['client', 'server']);
  api.add_files('soundcloud_server.js', 'server');
  api.add_files('soundcloud_client.js', 'client');
});
