"use client"
import ApiService from "@/services/ApiService";
import {Fragment, useEffect, useState} from "react";
import Product from "@/dto/Product";
import {StatusCode} from "@/enums/StatusCodes";
import {Ratings} from "@/components";
import {useRouter} from "next/navigation";

const apiService = new ApiService()

export default function Home() {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");
    const [products, setProducts] = useState<Array<Product>>(
        []
    );

    useEffect(() => {
        if (keyword !== "") {
            apiService.getProducts(keyword).then((result) => {
                if (result.statusCode === StatusCode.SUCCESS && "payload" in result && typeof result.payload === "object") {
                    setProducts(result.payload)
                    console.log(result.payload)
                }
            })
        }
    }, [keyword]);

    return (
        <Fragment>
            <section className={"min-h-dvh pb-20"}>
                <div
                    className={
                        "flex min-h-56 w-full flex-col items-center justify-center"
                    }
                >
                    <div className="m-auto flex w-full flex-col items-center justify-center space-y-5 px-3">
                        <h2 className={"text-2xl font-semibold"}>Find your products</h2>
                        <input
                            className={
                                "h-16 w-full rounded-xl border-2 px-5 text-lg md:w-1/2"
                            }
                            placeholder="Search for products..."
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                </div>
                <div
                    className={
                        "flex flex-col items-center justify-center space-y-5 px-3 md:px-48"
                    }
                >
                    {
                        products.length === 0 ?
                            <section className="min-h-screen">
                                <div className="m-auto">
                                    The product you search in search bar will appear here.
                                </div>
                            </section>
                            :
                            products.map((product) => {
                                return (
                                    <div
                                        key={product.pid}
                                        className={"flex w-full flex-col space-y-3 rounded-lg border px-5 py-5 cursor-pointer"}
                                        onClick={() => {
                                            router.push(`/${keyword}?pid=${product.pid}`);
                                        }}
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
                                )
                            })
                    }
                </div>
            </section>
        </Fragment>
    );
}
