package com.mihirpaldhikar.entities

import com.google.gson.annotations.Expose

data class Credentials(
    @Expose val companyName: String,
    @Expose val clientID: String,
    @Expose val clientSecret: String,
    @Expose val ownerName: String,
    @Expose val ownerEmail: String,
    @Expose val rollNo: String,
)