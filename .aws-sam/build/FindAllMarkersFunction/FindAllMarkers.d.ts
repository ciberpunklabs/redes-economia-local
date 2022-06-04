import { Handler, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
declare type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;
export declare const handler: ProxyHandler;
export {};
