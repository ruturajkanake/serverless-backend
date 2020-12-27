const Responses = require('../common/responses')

exports.handler = async event => {
    console.log('Event', event)
    if(!event.pathParameters || !event.pathParameters.ID) {
        return Responses.fail({message: 'Missing ID from path'})
    }
    let ID = event.pathParameters.ID;
    if(data[ID]) {
        return Responses.success(data[ID])
    }
    return Responses.fail({message: 'No Id in data'})
}

const data = {
    1234: { name: 'Anna Jones', age: 25, job: 'Journalist' },
    7893: { name: 'Chris Smith', age: 21, job: 'Teacher' }
}