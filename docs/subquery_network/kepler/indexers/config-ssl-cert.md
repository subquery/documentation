# Config SSL Cert
## Why do I need to configure SSL Cert?
SSL Cert is required for consumer to use indexer's service in the browser, when their website is secured by ssl
And because of the same reason, in the indexer leaderboard, we rank indexer higher score if they have ssl configured.

## What a SSL Cert configured indexer looks like?
The `Proxy Server Endpoint` in indexer's metadata will start with `https` instead of `http`.

## How to configure SSL Cert?
### 1. Get a domain
You can purchase a domain from a lot of domain providers.
Assuming the domain you purchased is `mysqindexer.com`
### 2. Config DNS
Add a A record to your domain, point to your indexer's server ip address.
For example, we add an A record for `proxy.mysqindexer.com`
### 3. Get a SSL Cert
You can get a free SSL Cert from [Let's Encrypt](https://letsencrypt.org/)
They offer a lot of ways to get a SSL Cert, you can choose the one that fits your needs. https://letsencrypt.org/docs/client-options/
The following tutorial will use certbot + nginx + ubuntu as an example.
#### 3.1 Install certbot
Check https://certbot.eff.org/instructions

#### 3.2 Config nginx

```bash
# edit /etc/nginx/sites-available/proxy.mysqindexer.com
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name proxy.mysqindexer.com;

    location / {
      proxy_pass      http://127.0.0.1:1080;
    }

}
# run
sudo ln -s /etc/nginx/sites-available/proxy.mysqindexer.com /etc/nginx/sites-enabled/proxy.mysqindexer.com
# run certbot
sudo certbot --nginx -d proxy.mysqindexer.com
#output
#Saving debug log to /var/log/letsencrypt/letsencrypt.log
#Requesting a certificate for proxy.mysqindexer.com

#Successfully received certificate.
#Certificate is saved at: /etc/letsencrypt/live/proxy.mysqindexer.com/fullchain.pem
#Key is saved at:         /etc/letsencrypt/live/proxy.mysqindexer.com/privkey.pem
#This certificate expires on 2023-08-06.
#These files will be updated when the certificate renews.
#Certbot has set up a scheduled task to automatically renew this certificate in the background.
#
#Deploying certificate
#Successfully deployed certificate for proxy.mysqindexer.com to /etc/nginx/sites-enabled/proxy.mysqindexer.com
#Congratulations! You have successfully enabled HTTPS on https://proxy.mysqindexer.com
#
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
#If you like Certbot, please consider supporting our work by:
# * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
# * Donating to EFF:                    https://eff.org/donate-le
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

### 4. Update your indexer metadata
Update your indexer metadata, set the `Proxy Server Endpoint` to `https://proxy.mysqindexer.com`
