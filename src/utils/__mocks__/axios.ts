'use strict';
module.exports = {
  get: () => {
    return Promise.resolve({
      data: [
        {
            "booking_ID": "10",
            "customer_ID": "111",
            "guests": "6",
            "sitting": "2019-10-28 18:00:00",
            "name": "Fanny-Manny",
            "email": "fanny-manny@me.com",
            "phone": "070123456"
          }
      ]
    });
  }
};