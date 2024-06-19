import axios, {AxiosError, AxiosInstance} from "axios";
import {Response} from "@/dto/Response"
import Product from "@/dto/Product";
import {StatusCode} from "@/enums/StatusCodes";

export default class ApiService {
    private ACCOUNT_SERVICE_URL = (
        process.env.NEXT_PUBLIC_SHOPPING_SERVICE_URL as string
    ).concat("/categories");
    private httpClient: AxiosInstance;
    private REQUEST_TIMEOUT = 1000 * 10;

    public constructor() {
        this.httpClient = axios.create({
            baseURL: this.ACCOUNT_SERVICE_URL,
            timeout: this.REQUEST_TIMEOUT,
        });
    }

    public async getProducts(category: string): Promise<Response<Array<Product> | string>> {
        try {
            const response = await this.httpClient.get(`/${category}/products`)
            if (response.status === 200) {
                return {
                    statusCode: StatusCode.SUCCESS,
                    payload: await response.data
                } as Response<Array<Product>>
            }
            throw new Error("INTERNAL:An error occurred while getting products");
        } catch (error) {
            let axiosError = (await error) as AxiosError;
            if (axiosError.message.includes("INTERNAL:")) {
                return {
                    statusCode: StatusCode.FAILURE,
                    message: axiosError.message.replaceAll("INTERNAL:", ""),
                } as Response<string>;
            }

            let errorResponseString = JSON.stringify(
                (await axiosError.response?.data) as string,
            );
            let errorResponse = JSON.parse(errorResponseString);

            return {
                statusCode: StatusCode.FAILURE,
                message: errorResponse["message"],
            } as Response<string>;
        }
    }

    public async getProductById(pid: string, category: string): Promise<Response<Product | string>> {
        try {
            const response = await this.httpClient.get(`/${category}/products/${pid}`)
            console.log(response)
            if (response.status === 200) {
                return {
                    statusCode: StatusCode.SUCCESS,
                    payload: await response.data
                } as Response<Product>
            }
            throw new Error("INTERNAL:An error occurred while getting products");
        } catch (error) {
            let axiosError = (await error) as AxiosError;
            if (axiosError.message.includes("INTERNAL:")) {
                return {
                    statusCode: StatusCode.FAILURE,
                    message: axiosError.message.replaceAll("INTERNAL:", ""),
                } as Response<string>;
            }

            let errorResponseString = JSON.stringify(
                (await axiosError.response?.data) as string,
            );
            let errorResponse = JSON.parse(errorResponseString);

            return {
                statusCode: StatusCode.FAILURE,
                message: errorResponse["message"],
            } as Response<string>;
        }
    }
}