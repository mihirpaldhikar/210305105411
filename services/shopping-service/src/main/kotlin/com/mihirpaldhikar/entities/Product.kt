package com.mihirpaldhikar.entities

import com.google.gson.annotations.Expose

data class Product(
    @Expose val pid: String,
    @Expose val productName: String,
    @Expose val price: Double,
    @Expose val rating: Double,
    @Expose val discount: Int,
    @Expose val availability: String,
    @Expose val company: String
)
