"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const MarkerFinder_1 = require("@mapoteca/markers/application/Find/MarkerFinder");
const DynamoDBMarkerRepository_1 = require("@mapoteca/markers/infrastructure/DynamoDBMarkerRepository");
const { RESOURCES_TABLE } = process.env;
const HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
};
const handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.info('==> Find Marker Handler');
    console.info('EVENT:', event);
    console.info('CONTEXT:', context);
    // Verify existence of enviroment variables
    if (!RESOURCES_TABLE)
        return {
            statusCode: 500,
            headers: HEADERS
        };
    // Verify existence of id in pathParameters
    if (!((_a = event === null || event === void 0 ? void 0 : event.pathParameters) === null || _a === void 0 ? void 0 : _a.id))
        return {
            statusCode: 400,
            headers: HEADERS
        };
    const repository = new DynamoDBMarkerRepository_1.DynamoDBMarkerRepository(RESOURCES_TABLE);
    const finder = new MarkerFinder_1.MarkerFinder(repository);
    const request = {
        id: event.pathParameters.id
    };
    try {
        const marker = yield finder.run(request);
        return {
            statusCode: 200,
            body: JSON.stringify(marker),
            headers: HEADERS
        };
    }
    catch (error) {
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
    };
});
exports.handler = handler;
