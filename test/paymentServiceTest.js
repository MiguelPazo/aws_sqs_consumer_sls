/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
const paymentService = require('./../services/paymentService');

describe('paymentServiceTest', () => {

    it('processDataTest', async () => {
        const createdAt = new Date();
        const data = {
            amount: 125
        };

        const result = await paymentService.processData(data, createdAt);
        console.log(result);
    });
});
