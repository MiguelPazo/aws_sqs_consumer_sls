/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
const paymentService = require('./services/paymentService');
const appConstants = require('./common/appConstants');

exports.handler = async (event, context, callback) => {
    const createdAt = new Date();

    for await(const record of event.Records) {
        const body = JSON.parse(record.body);

        switch (body.event) {
            case appConstants.SQS_EVENT:
                await paymentService.processData(body, createdAt);
                break;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return {};
};
