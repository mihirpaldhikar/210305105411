package com.mihirpaldhikar

import com.mihirpaldhikar.plugins.configureHTTP
import com.mihirpaldhikar.plugins.configureMonitoring
import com.mihirpaldhikar.plugins.configureRouting
import com.mihirpaldhikar.plugins.configureSerialization
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(
        Netty,
        port = 8080,
        host = "0.0.0.0",
        module = Application::module
    )
        .start(wait = true)
}

fun Application.module() {
    configureHTTP()
    configureMonitoring()
    configureSerialization()
    configureRouting()
}
