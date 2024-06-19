package datasource

import com.mihirpaldhikar.entities.Product
import com.mihirpaldhikar.entities.ProductDTO

interface ProductDatasource {
    suspend fun getProductsFromCompany(company: String, category: String): List<ProductDTO>
    suspend fun getProducts(category: String): List<Product>
}