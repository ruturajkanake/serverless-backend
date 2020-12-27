const Responses = require('../common/responses')
const Dynamo = require('../common/Dynamo');
const tableName = process.env.tableName

exports.handler = async event => {
    console.log('Event', event)
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses.fail({ message: 'Missing ID from path' })
    }
    let ID = event.pathParameters.ID;
    const user = JSON.parse(event.body);
    user.ID = ID;
    const newUser = await Dynamo.write(user, tableName).catch(err => {
        console.log('Error in Dynamo DB Write', err);
        return null;
    });

    if (!newUser) {
        return Responses.fail({ message: "Fail to write user by ID" });
    }
    return Responses.success({ newUser });
}