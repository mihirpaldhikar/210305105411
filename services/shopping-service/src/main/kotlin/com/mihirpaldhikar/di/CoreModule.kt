package com.mihirpaldhikar.di

import com.mihirpaldhikar.Environment
import org.koin.dsl.module

object CoreModule {
    val init = module {
        single<Environment> {
            Environment()
        }
    }
}
