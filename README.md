# Shopify Hotwire Sample

The sample app includes:
- JWT integration for [Hotwire Turbo](https://turbo.hotwired.dev/)
- JWT integration for [Rails Request.JS](https://github.com/rails/request.js)
- App Bridge 2.0
- [Polaris ViewComponents](https://github.com/baoagency/polaris_view_components)
- [Hotwire::Livereload](https://github.com/kirillplatonov/hotwire-livereload)

Since the `shopify_app` gem is not fully compatible with App Bridge 2 this sample uses fork.

![Shopify Hotwire Sample](.github/assets/preview.png)

> The old App Bridge 1 sample can be found in `app-bridge-1` branch.

## Quick start

To run this app locally, you can clone this repository and do the following.

1. Connect to Shopify:

```
shopify rails connect
```

2. Setup Rails app:
```
bin/setup
```

3. Run `ngrok` on port 3000:
```
ngrok http 3000
```

4. Start the app:
```
rails s
```

5. Install and open this app on a development shop.

#### Optional

6. Add an ngrok configuration

**~/.ngrok2/ngrok.yml**

```yaml
authtoken: $$$$$$$$$$$
region: eu

tunnels:
  hotwire-example:
    addr: 3000
    proto: http
    bind_tls: true
    subdomain: hotwire-example
  hotwire-webpack:
    addr: 3035
    proto: http
    bind_tls: true
    subdomain: hotwire-webpack
    host-header: localhost:3035
```

7. Add `NGROK_WEBPACK_TUNNEL` to your `.env` file
```bash
SHOPIFY_API_KEY=foo
SHOPIFY_API_SECRET=bar

// This is needed so you don't get CORS issues when Webpack pings while inside the Shopify admin
NGROK_WEBPACK_TUNNEL=hotwire-webpack.eu.ngrok.io
```

8. Use foreman to run the Rails server & Webpack at the same time
```bash
foreman start -f Procfile.dev
```
<img width="1680" alt="image" src="https://user-images.githubusercontent.com/7152041/129482668-2eae432b-ac1d-45ef-b746-f50e4d15568e.png">
