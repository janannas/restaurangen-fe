export default {
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
  },
  post: (url: string, data: any) => {
    return Promise.resolve({
      data: {
        "name": "Janne",
        "email": "janne93@gmail.com",
        "phone": "0123456789",
        "guests": 5,
        "sitting": "2018-06-01 00:35:07"
      }
    })
  }
};
