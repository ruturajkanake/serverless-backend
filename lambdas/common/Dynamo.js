const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient;

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        }
        const data = await documentClient.get(params).promise();
        if(!data || !data.Item) {
            throw Error(`There was error fetching the data for id ${ID} from ${TableName}`);
        }
        return data.Item;            
    },
    async write(data, TableName) {
        if(!data.ID) {
            throw Error('No ID on the Data');
        }
        const params = {
            TableName,
            Item: data
        }
        const res = await documentClient.put(params).promise();
        if(!res) {
            throw Error(`There was an error inserting ID ${ID} in table ${TableName}`);
        }
        return data;
    }
}

module.exports = Dynamo;