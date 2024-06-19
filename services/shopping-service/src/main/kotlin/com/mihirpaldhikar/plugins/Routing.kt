package com.mihirpaldhikar.plugins

import com.mihirpaldhikar.repositories.ProductRepository
import com.mihirpaldhikar.routes.productsRoute
import io.ktor.server.application.*
import io.ktor.server.routing.*
import org.koin.java.KoinJavaComponent

fun Application.configureRouting() {
    val productRepository by KoinJavaComponent.inject<ProductRepository>(ProductRepository::class.java)
    routing {
        productsRoute(
            productRepository = productRepository
        )
    }
}
