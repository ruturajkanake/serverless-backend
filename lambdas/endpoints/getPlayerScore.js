const Responses = require('../common/responses')
const Dynamo = require('../common/Dynamo');
const tableName = process.env.tableName

exports.handler = async event => {
    console.log('Event', event)
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses.fail({ message: 'Missing ID from path' })
    }
    let ID = event.pathParameters.ID;
    
    const user = await Dynamo.get(ID, tableName).catch(err => {
        console.log("Error in Dynamo Get", err);
        return null
    });
    if (!user) {
        return Responses.fail({message: "Fail to get user by ID"});
    }
    return Responses.success({user});
}