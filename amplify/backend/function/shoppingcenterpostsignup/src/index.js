/* Amplify Params - DO NOT EDIT
	API_SHOPPINGCENTER_GRAPHQLAPIIDOUTPUT
	API_SHOPPINGCENTER_USERTABLE_ARN
	API_SHOPPINGCENTER_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const client = require("@aws-sdk/client-dynamodb");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify("Hello from Lambda!")
  };
};
