import { CreateMarkerRequest } from "@mapoteca/markers/application/Create/CreateMarkerRequest";
import { MarkerCreator } from "@mapoteca/markers/application/Create/MarkerCreator";
import { DynamoDBMarkerRepository } from "@mapoteca/markers/infrastructure/DynamoDBMarkerRepository";


const {
	RESOURCES_TABLE,
} = process.env;

const HEADERS = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Headers" : "*",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "*"
};

export const handler = async (event: any, context: any) => {
	console.info('EVENT:', event);
	console.info('CONTEXT:', context);

	// Verify existence of enviroment variables
	if (!RESOURCES_TABLE) return { "statusCode" : 500 };

	// Verify existence of id in pathParameters
	if (!event?.pathParameters?.id) return { "statusCode" : 400 };

	const id : string = event.pathParameters.id;

	const request : CreateMarkerRequest = JSON.parse(event.body ? event.body : '');
	console.log('request:', request);

	const repository = new DynamoDBMarkerRepository(RESOURCES_TABLE);
	const creator = new MarkerCreator(repository);
	
	await creator.run({ id, ...request });

	return {
		"statusCode": 201,
		headers: HEADERS
	};
};