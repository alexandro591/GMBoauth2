export default function handler(req, res) {
  const query_params = {
    scope: process.env.scope,
    access_type: 'offline',
    include_granted_scopes: 'true',
    state: 'state_parameter_passthrough_value',
    response_type: 'code',
    redirect_uri: process.env.redirect_uri,
    client_id: process.env.client_id,
  };

  const url = `${process.env.GOOGLE_OAUTH_REDIRECT_URL}?${new URLSearchParams(
    query_params
  )}`;

  res.redirect(url);
}
