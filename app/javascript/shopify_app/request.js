import { RequestInterceptor } from '@rails/request.js'
import { getSessionToken } from "@shopify/app-bridge/utilities"

RequestInterceptor.register(async (request) => {
  const token = await getSessionToken(window.app)
  request.addHeader("Authorization", `Bearer ${token}`)
})
