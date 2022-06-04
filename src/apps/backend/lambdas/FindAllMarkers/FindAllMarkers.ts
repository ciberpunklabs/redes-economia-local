import { MarkersFinder } from "@mapoteca/markers/application/FIndAll/MarkersFinder";
import { DynamoDBMarkerRepository } from "@mapoteca/markers/infrastructure/DynamoDBMarkerRepository";

import  { Handler, 
	APIGatewayProxyEventV2, 
	APIGatewayProxyResultV2
} from "aws-lambda";

const {
	RESOURCES_TABLE
} = process.env;

const HEADERS = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Headers" : "*",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "*"
}; 

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>

export const handler : ProxyHandler = async (event, context) => {
	console.info('==> Find All Markers Handler')
	console.info('EVENT:', event);
	console.info('CONTEXT:', context);

	// Verify existence of enviroment variables
	if (!RESOURCES_TABLE) return { 
		statusCode : 500,
		headers: HEADERS
	};

	const repository = new DynamoDBMarkerRepository(RESOURCES_TABLE);
	const finder = new MarkersFinder(repository);

	const marker = await finder.run();
	return {
		statusCode: 200,
		body : JSON.stringify(marker),
		headers: HEADERS
	};
};