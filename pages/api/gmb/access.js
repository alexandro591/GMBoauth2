import environment from '../../../environment';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export default function async(req, res) {
  const dir = path.resolve('./public');
  const successHTML = fs.readFileSync(`${dir}/success.html`, {
    encoding: 'utf8',
    flag: 'r',
  });

  const code = req.query.code;
  const body = {
    code: code,
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
    redirect_uri: process.env.redirect_uri,
    grant_type: 'authorization_code',
  };
  let url = process.env.GOOGLE_OAUTH_API_URL;
  axios.post(url, body).then(async ({ data }) => {
    const access_token = data.access_token;
    const refresh_token = data.refresh_token;

    url = process.env.MY_BUSINESS_AM_API_URL;
    const headers = { Authorization: `Bearer ${access_token}` };

    const { data: accounts } = await axios.get(url, { headers });
    await axios.post(`${process.env.DATABASE_URL}/accounts.json`, {
      accounts,
      access_token,
      refresh_token,
    });
    res.send(successHTML);
  });
}
