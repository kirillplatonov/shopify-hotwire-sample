import { TitleBar } from '@shopify/app-bridge/actions';

// Sync Title with Shopify
document.addEventListener("turbo:render", (event) => {
  const title = event.currentTarget.title;

  TitleBar.create(app, { title });
});
