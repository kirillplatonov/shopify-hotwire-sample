class GetProducts
  include ShopifyGraphql::Query

  QUERY = <<~GRAPHQL
    query {
      products(first: 10) {
        edges {
          node {
            handle
            title
            description
          }
        }
      }
    }
  GRAPHQL

  def call
    response = execute(QUERY)
    response.data = response.data.products.edges.map(&:node)
    response
  end
end
