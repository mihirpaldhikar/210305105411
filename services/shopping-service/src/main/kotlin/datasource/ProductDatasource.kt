package datasource

import com.mihirpaldhikar.entities.Filter
import com.mihirpaldhikar.entities.Product
import com.mihirpaldhikar.entities.ProductDTO

interface ProductDatasource {
    suspend fun getProductsFromCompany(
        company: String,
        category: String,
        minValue: Int,
        maxValue: Int
    ): List<ProductDTO>

    suspend fun getProducts(category: String, filter: Filter): List<Product>
}