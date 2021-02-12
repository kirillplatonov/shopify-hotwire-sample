# Shopify Hotwire Sample

## Quick start

To run this app locally, you can clone this repository and do the following.

1. Create `.env` file with `API key` and `API secret key` app credentials that can be found in the Shopify Partners dashboard.
```
SHOPIFY_API_KEY=<The API key app credential specified in the Shopify Partners dashboard>
SHOPIFY_API_SECRET=<The API secret key app credential specified in the Shopify Partners dashboard>
```
Alternatively you can run this command to generate `.env` file.
```
shopify connect
```
> __Note:__ Don't use `shopify connect` with production apps. It will update you application URLs.

2. Install dependencies and prepare DB:
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
