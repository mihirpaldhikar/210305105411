package com.mihirpaldhikar.di

import com.mihirpaldhikar.Environment
import com.mihirpaldhikar.repositories.ProductRepository
import org.koin.dsl.module

object RepositoryModule {
    val init = module {
        single<ProductRepository> {
            ProductRepository(
                environment = get<Environment>()
            )
        }
    }
}