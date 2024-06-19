package datasource

import com.mihirpaldhikar.entities.Filter
import com.mihirpaldhikar.entities.Product

interface ProductDatasource {

    suspend fun getProducts(category: String, filter: Filter): List<Product>
}