export declare const handler: (event: any, context: any) => Promise<{
    statusCode: number;
    headers?: undefined;
} | {
    statusCode: number;
    headers: {
        "Content-Type": string;
        "Access-Control-Allow-Headers": string;
        "Access-Control-Allow-Origin": string;
        "Access-Control-Allow-Methods": string;
    };
}>;
