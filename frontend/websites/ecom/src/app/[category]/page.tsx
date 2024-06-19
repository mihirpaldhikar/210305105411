import React, {JSX} from "react";
import ApiService from "@/services/ApiService";
import {StatusCode} from "@/enums/StatusCodes";
import {Ratings} from "@/components";

const apiService = new ApiService();

export default async function Product({params, searchParams}: {
    params: { category: string; };
    searchParams: { pid: string };
}): Promise<JSX.Element> {

    const response = await apiService.getProductById(
        searchParams.pid,
        params.category,
    )

    if (response.statusCode === StatusCode.SUCCESS && "payload" in response && typeof response.payload === "object") {
        const product = response.payload
        return (
            <section className={"min-h-dvh flex"}>
                <div className={"m-auto"}>
                    <div
                        key={product.pid}
                        className={"flex w-full flex-col space-y-3 rounded-lg border px-5 py-5"}
                    >
                        <div className={"flex justify-between text-lg font-medium"}>
                            <div className="flex items-center space-x-2">
                                <h4> {product.productName}</h4>
                            </div>
                            <Ratings currentRating={product.rating}/>
                        </div>
                        <div>
                            <h4>Price: ${product.price}</h4>
                            <h4>Discount: {product.discount}%</h4>
                            <h4>Company: {product.company}</h4>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className={"min-h-dvh flex"}>
            <div className={"m-auto"}>
                <h2>Product Not Found!</h2>
            </div>
        </section>
    )

}