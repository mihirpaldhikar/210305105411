package com.mihirpaldhikar

import com.mihirpaldhikar.entities.Credentials

class Environment {
    val developmentMode: Boolean = System.getenv("DEVELOPMENT_MODE")?.toBoolean() ?: false
    val baseURL: String = System.getenv("BASE_URL")
    val credentials = Credentials(
        companyName = System.getenv("COMPANY_NAME").toString(),
        clientID = System.getenv("CLIENT_ID").toString(),
        clientSecret = System.getenv("CLIENT_SECRET").toString(),
        ownerName = System.getenv("OWNER_NAME").toString(),
        ownerEmail = System.getenv("OWNER_EMAIL").toString(),
        rollNo = System.getenv("ROLL_NO").toString()
    )
}