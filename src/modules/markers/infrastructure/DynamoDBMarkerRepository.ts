import { Marker } from "../domain/Marker";
import { MarkerRepository } from "../domain/MarkerRepository";

const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

export class DynamoDBMarkerRepository implements MarkerRepository {
	private readonly tableName : string;
	
	constructor(tableName : string){
		this.tableName = tableName;
	};

	async save(marker: Marker): Promise<void> {
		console.log(`save marker: ${marker}`);

		const { 
			id, name, 
			categories, address, 
			phoneNumber, position
		} = marker.toPrimitives();

		const persistedMarker = {
			PK : `MARKERS`,
			SK : `MARKER#${id}`,
			id, name, 
			categories, address, 
			phoneNumber, position
		};

		try {
			const dynamoResponse = await dynamo.put({
				TableName: this.tableName,
				Item: persistedMarker
			}).promise();
			console.log('dynamoResponse:', dynamoResponse);
		} catch (error) {
			console.error(error);
		}
	
		console.log('Marker Created!');
	}

	async findById(id: string): Promise<Marker | null> {
		const params = {
			TableName: this.tableName,
			ExpressionAttributeValues: {
				':markers': `MARKERS`,
				':marker': `MARKER#${id}`
			},
			KeyConditionExpression: 'PK = :markers and SK = :marker',
		}

		console.log('params:', params);

		const dynamoResponse = await dynamo.query(params).promise();
		console.log("dynamoResponse:", dynamoResponse)

		if (dynamoResponse.Items.length < 1) return null;

		const marker = dynamoResponse.Items[0];

		return Marker.fromPrimitives(marker)
	}

}
