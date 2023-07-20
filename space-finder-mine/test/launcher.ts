import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = 'us-west-2'
process.env.TABLE_NAME = 'StackTable-06101dcc630f'

handler({
    httpMethod: 'GET',
    queryStringParameters: {
        id: '3e6d61d5-38e1-436d-b84d-0632e9bb342f'
    }
    // body: JSON.stringify({
    //     location: 'Valleyview'
    // })
} as any, {} as any);
