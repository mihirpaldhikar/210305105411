package com.mihirpaldhikar.routes

import com.mihirpaldhikar.entities.Filter
import com.mihirpaldhikar.repositories.ProductRepository
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Routing.productsRoute(
    productRepository: ProductRepository
) {
    route("/products") {
        get("/{name}") {
            val name = call.parameters["name"] ?: return@get call.respondText("Please provide product name.")
            val queries = call.request.rawQueryParameters
            call.respond(productRepository.getProducts(name, Filter(
                minPrice = if (queries["minPrice"] != null) queries["minPrice"]?.toInt() else null,
                maxPrice = if (queries["maxPrice"] != null) queries["maxPrice"]?.toInt() else null,
                discount = if (queries["discount"] != null) queries["discount"]?.toInt() else null,
                rating = if (queries["rating"] != null) queries["rating"]?.toDouble() else null,
                company = if (queries["company"] != null) queries["company"] else null
            )
            ))
        }
    }
}