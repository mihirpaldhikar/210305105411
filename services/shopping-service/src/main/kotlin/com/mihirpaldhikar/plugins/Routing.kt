package com.mihirpaldhikar.plugins

import com.mihirpaldhikar.repositories.ProductRepository
import com.mihirpaldhikar.routes.categoriesRoute
import io.ktor.server.application.*
import io.ktor.server.routing.*
import org.koin.java.KoinJavaComponent

fun Application.configureRouting() {
    val productRepository by KoinJavaComponent.inject<ProductRepository>(ProductRepository::class.java)
    routing {
        categoriesRoute(
            productRepository = productRepository
        )
    }
}
