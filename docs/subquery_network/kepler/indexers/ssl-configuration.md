# SSL Certificate Configuration

## Why should you configure and enable a SSL certificate?

SSL certificate is an important way to secure your indexer service and encrypt traffic between your query service and the Consumers requesting data from it. It's a good idea to obtain an SSL certificate for any professional service and SubQuery is no different. Additionally, a SSL certificate is required for when a Consumer access a website via SSL and that website is requesting data from your SubQuery project.

**Since it's such a standard best practice, although it's not required, wee rank Indexer higher in the Indexer leaderboard if they have SSL enabled.**

## How do I know that an Indexer has SSL enabled

The `Proxy Server Endpoint` in indexer's metadata will start with `https` instead of `http`.

## Enabling SSL

### 1. Purchase a domain name

You can purchase a domain from a lot of domain providers, we won't be providing a guide on how to do this. The rest of this guide assumes you have purchased `mysqindexer.com`

### 2. Config DNS

Add a A record to your domain that points to your indexer's server IP address. For example, we add an A record for `proxy.mysqindexer.com` to our server's IP `210.10.5.61`.

### 3. Get a SSL Cert

You can get a free SSL Cert from [Let's Encrypt](https://letsencrypt.org/), they offer a lot of ways to get a SSL Cert, you can choose the [one that fits your needs](https://letsencrypt.org/docs/client-options/).

This tutorial will use Certbot + NGINX + Ubuntu as an example.

#### 3.1 Install Certbot

Check [https://certbot.eff.org/instructions](https://certbot.eff.org/instructions) on how to do this step

#### 3.2 Config NGINX

Edit your NGINX configuration to add the following (e.g. it would usually be at `/etc/nginx/sites-available/proxy.mysqindexer.com`)

```js
server {
    listen 443 ssl; // Update the ports to listen on
    listen [::]:443 ssl;

    server_name proxy.mysqindexer.com; // update the server name to match your DNS address

    location / {
      proxy_pass      http://127.0.0.1:1080;
    }

}
```

Then finish configuration.

```bash
# link the new configution with a symlink to your edited file
sudo ln -s /etc/nginx/sites-available/proxy.mysqindexer.com /etc/nginx/sites-enabled/proxy.mysqindexer.com
# run certbot
sudo certbot --nginx -d proxy.mysqindexer.com

# output
# Saving debug log to /var/log/letsencrypt/letsencrypt.log
# Requesting a certificate for proxy.mysqindexer.com

# Successfully received certificate.
# Certificate is saved at: /etc/letsencrypt/live/proxy.mysqindexer.com/fullchain.pem
# Key is saved at:         /etc/letsencrypt/live/proxy.mysqindexer.com/privkey.pem
# This certificate expires on 2023-08-06.
# These files will be updated when the certificate renews.
# Certbot has set up a scheduled task to automatically renew this certificate in the background.
#
# Deploying certificate
# Successfully deployed certificate for proxy.mysqindexer.com to /etc/nginx/sites-enabled/proxy.mysqindexer.com
# Congratulations! You have successfully enabled HTTPS on https://proxy.mysqindexer.com
#
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# If you like Certbot, please consider supporting our work by:
#  * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
#  * Donating to EFF:                    https://eff.org/donate-le
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

### 4. Update your indexer metadata

Update your indexer metadata, set the `Proxy Server Endpoint` to `https://proxy.mysqindexer.com`
