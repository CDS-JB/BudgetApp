var ObjectId = require('mongodb').ObjectId;

module.exports = {
    show: function (app, req, res) {
        var response = {
            user: {
                _id: '123456',
                FirstName: 'John',
                LastName: 'Doe'
            },
            transactions : [
                {_id: '1', Date: '2020-10-01', Type: 'Income',  Category: 'Salary',    Amount: 1500.00, StartBalance: 0.00,   EndBalance: 1500.00},
                {_id: '2', Date: '2020-10-02', Type: 'Expense', Category: 'Road Tax',  Amount: 330.00, StartBalance: 1500.00, EndBalance: 1170.00},
                {_id: '3', Date: '2020-10-02', Type: 'Expense', Category: 'Rent',      Amount: 450.00, StartBalance: 1170.00, EndBalance: 720.00},
                {_id: '4', Date: '2020-10-03', Type: 'Expense', Category: 'Eat Out',   Amount: 46.78, StartBalance: 720.00,  EndBalance: 673.22},
                {_id: '5', Date: '2020-10-04', Type: 'Income',  Category: 'Other',     Amount: 12.10, StartBalance: 673.22,  EndBalance: 685.32},
                {_id: '6', Date: '2020-10-04', Type: 'Expense', Category: 'Hobby',     Amount: 29.99, StartBalance: 685.32,  EndBalance: 655.33},
                {_id: '7', Date: '2020-10-05', Type: 'Expense', Category: 'Lunch',     Amount: 4.58,  StartBalance: 655.33,  EndBalance: 650.75},
                {_id: '8', Date: '2020-10-05', Type: 'Income',  Category: 'Other',     Amount: 25.30, StartBalance: 650.75,  EndBalance: 676.05},
                {_id: '9', Date: '2020-10-06', Type: 'Income',  Category: 'Freelance', Amount: 16.99, StartBalance: 676.05,  EndBalance: 693.04},
                {_id: '10', Date: '2020-10-06', Type: 'Expense', Category: 'Shop',     Amount: 88.13, StartBalance: 693.04,  EndBalance: 604.91},
            ]
        }

        res.json(response);
    }
}; 