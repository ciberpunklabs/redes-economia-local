import { MarkerCreator } from "@mapoteca/markers/application/Create/MarkerCreator";
import { MarkerType } from "@mapoteca/markers/domain/Marker";
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

	const body = JSON.parse(event.body ? event.body : '');
	console.log('body:', body);

	const request: MarkerType = {
		id, ...body
	}
	const repository = new DynamoDBMarkerRepository(RESOURCES_TABLE);
	const creator = new MarkerCreator(repository);
	
	await creator.run(request);

	return {
		"statusCode": 201,
		headers: HEADERS
	};
};