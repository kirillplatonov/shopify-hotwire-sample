# Shopify Hotwire Sample

The sample app includes:
- JWT integration for [Hotwire Turbo](https://turbo.hotwired.dev/)
- JWT integration for [Rails Request.JS](https://github.com/rails/request.js)
- App Bridge 2.0

Since the `shopify_app` gem is not fully compatible with App Bridge 2 this sample uses fork.

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
