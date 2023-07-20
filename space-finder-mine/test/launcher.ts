import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = 'us-west-2'
process.env.TABLE_NAME = 'StackTable-06101dcc630f'

handler({
    httpMethod: 'POST',
    body: JSON.stringify({
        location: 'Valleyview'
    })
} as any, {} as any);
