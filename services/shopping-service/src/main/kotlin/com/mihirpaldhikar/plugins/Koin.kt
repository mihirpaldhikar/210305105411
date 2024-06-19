package com.mihirpaldhikar.plugins

import com.mihirpaldhikar.di.CoreModule
import io.ktor.server.application.*
import org.koin.ktor.plugin.Koin

fun Application.configureDependencyInjection() {
    install(Koin) {
        modules(
            CoreModule.init
        )
    }
}