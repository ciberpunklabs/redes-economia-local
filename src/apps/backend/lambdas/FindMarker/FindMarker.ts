import { MarkerFinder } from "@mapoteca/markers/application/Find/MarkerFinder";
import { FindMarkerRequest } from "@mapoteca/markers/domain/Find/FindMarkerRequest";
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
	console.info('==> Find Marker Handler')
	console.info('EVENT:', event);
	console.info('CONTEXT:', context);

	// Verify existence of enviroment variables
	if (!RESOURCES_TABLE) return { 
		statusCode : 500,
		headers: HEADERS
	};

	// Verify existence of id in pathParameters
	if (!event?.pathParameters?.id) return { 
		statusCode : 400,
		headers: HEADERS 
	};

	const repository = new DynamoDBMarkerRepository(RESOURCES_TABLE);
	const finder = new MarkerFinder(repository);

	const request : FindMarkerRequest = {
		id : event.pathParameters.id
	} 

	try {
		const marker = await finder.run(request);
		return {
			statusCode: 200,
			body : JSON.stringify(marker),
			headers: HEADERS
		};
	} catch (error : any) {
		if (error.name === 'NotFoundException')
			return { 
				statusCode: 404, 
				body: undefined,
				headers: HEADERS
			};
	}
	
	return {
		statusCode: 500,
		headers: HEADERS
	}
};