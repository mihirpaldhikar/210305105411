package com.mihirpaldhikar

class Environment {
    val developmentMode: Boolean = System.getenv("DEVELOPMENT_MODE")?.toBoolean() ?: false
}