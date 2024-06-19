package com.mihirpaldhikar.repositories

import com.mihirpaldhikar.Environment
import com.mihirpaldhikar.entities.AuthResponse
import com.mihirpaldhikar.entities.Filter
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

    override suspend fun getProductsFromCompany(
        company: String,
        category: String,
        minValue: Int,
        maxValue: Int
    ): List<ProductDTO> {
        val response =
            httpClient.get("${environment.baseURL}/test/companies/${company}/categories/${category}/products?top=10&minPrice=${minValue.toInt()}&maxPrice=${maxValue.toInt()}") {
                header("Content-Type", "application/json")
                header("Accept", "application/json")
                header(
                    "Authorization",
                    "Bearer ${getAuthorizationToken()}"
                )
            }
        return response.body<List<ProductDTO>>()
    }

    override suspend fun getProducts(category: String, filter: Filter): List<Product> {
        var products: MutableList<Product> = mutableListOf()

        for (company in companies) {
            val companyProducts =
                getProductsFromCompany(company, category, filter.minPrice ?: 1, filter.maxPrice ?: Int.MAX_VALUE)
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


        if (filter.company != null) {
            products = products.filter { it.company == filter.company }.toMutableList()
        }

        if (filter.discount != null) {
            products = products.filter { it.discount >= filter.discount }.toMutableList()
        }

        if (filter.rating != null) {
            products = products.filter { it.rating >= filter.rating }.toMutableList()
        }

        return products
    }
}