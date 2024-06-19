package com.mihirpaldhikar.repositories

import com.mihirpaldhikar.Environment
import com.mihirpaldhikar.entities.AuthResponse
import com.mihirpaldhikar.entities.Product
import com.mihirpaldhikar.entities.ProductDTO
import datasource.ProductDatasource
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.serialization.gson.*
import java.util.*

class ProductRepository(
    private val environment: Environment
) : ProductDatasource {

    private val httpClient = HttpClient(CIO) {
        install(ContentNegotiation) {
            gson {
                setPrettyPrinting()
                disableHtmlEscaping()
                excludeFieldsWithoutExposeAnnotation()
            }
        }
    }

    private val companies: Array<String> = arrayOf("AMZ", "FLP", "SNP", "MYN", "AZO")

    private suspend fun getAuthorizationToken(): String {
        val response = httpClient.post("${environment.baseURL}/test/auth") {
            header("Content-Type", "application/json")
            header("Accept", "application/json")
            setBody(environment.credentials)
        }
        val authCredentials = response.body<AuthResponse>()
        return authCredentials.accessToken
    }

    override suspend fun getProductsFromCompany(company: String, category: String): List<ProductDTO> {
        val response =
            httpClient.get("${environment.baseURL}/test/companies/${company}/categories/${category}/products?top=10&minPrice=1&maxPrice=1000") {
                header("Content-Type", "application/json")
                header("Accept", "application/json")
                header(
                    "Authorization",
                    "Bearer ${getAuthorizationToken()}"
                )
            }
        return response.body<List<ProductDTO>>()
    }

    override suspend fun getProducts(category: String): List<Product> {
        val products: MutableList<Product> = mutableListOf()

        for (company in companies) {
            val companyProducts = getProductsFromCompany(company, category)
            for (product in companyProducts) {
                products.add(
                    Product(
                        pid = UUID.randomUUID().toString(),
                        productName = product.productName,
                        price = product.price,
                        rating = product.rating,
                        discount = product.discount,
                        availability = product.availability,
                        company = company
                    )
                )
            }
        }

        return products
    }
}