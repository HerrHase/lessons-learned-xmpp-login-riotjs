# xmpp-login-riotjs

Small Prototyp to show login to an XMPP-Server with [xmpp.js](https://github.com/xmppjs/xmpp.js) and retrieve Contacts from Account. Frontend is written in Riotjs, this
only tested for an Connection with Websocket (wss://<domain>/xmpp-websocket). The Configuration is below.

## Configuration

### Prosody

```
modules_enabled = {
    "websocket";
}

cross_domain_websocket = { "127.0.0.1:8080", "<domain>" }
consider_websocket_secure = true
```

### Nginx

```
server {
    listen 80;
    listen [::]:80;
    server_name <domain>;
    return 301 https://<domain>$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    ssl_certificate /etc/letsencrypt/live/<domain>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<domain>/privkey.pem;

    server_name <domain>;

    # logs
    access_log /var/log/nginx/<domain>.access.log;
    error_log /var/log/nginx/<domain>.error.log;

    location /xmpp-websocket {
        proxy_pass http://127.0.0.1:5280;
        proxy_http_version 1.1;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Upgrade $http_upgrade;

        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 900s;
    }
}
```

