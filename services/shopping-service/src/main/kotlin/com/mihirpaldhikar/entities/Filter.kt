package com.mihirpaldhikar.entities

data class Filter(
    val minPrice: Int? = null,
    val maxPrice: Int? = null,
    val rating: Double? = null,
    val discount: Int? = null,
    val company: String? = null
)
