var ObjectId = require('mongodb').ObjectId;

module.exports = {
    show: function (app, req, res) {
        var response = {
            user: {
                _id: '123456',
                FirstName: 'John',
                LastName: 'Doe',
                TargetDate: '2021-06-01'
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
            ],
            payments : [

                {UserObjectId: '1', PaymentType: 'Income', Source: 'Bank Balance', IncInBudget: 'true', Amount: 4000.00, FrequencyType: 'Balance', PaymentStart: '1970-01-01', PaymentEnd: '1970-01-01', Frequency: 'NaN'},
                {UserObjectId: '1', PaymentType: 'Income', Source: 'Savings', IncInBudget: 'false', Amount: 1000.00, FrequencyType: 'Balance', PaymentStart: '1970-01-01', PaymentEnd: '1970-01-01', Frequency: 'NaN'},
                {UserObjectId: '1', PaymentType: 'Income', Source: 'Student Finance', IncInBudget: 'true', Amount: 2322.00, FrequencyType: 'Lump sum', PaymentStart: '2020-09-26T00:00:00.000+00:00', PaymentEnd: '1970-01-01T00:00:00.000+00:00', Frequency: 'NaN'},
                {UserObjectId: '1', PaymentType: 'Income', Source: 'Student Finance', IncInBudget: 'true', Amount: 2322.00, FrequencyType: 'Lump sum', PaymentStart: '2021-01-12T00:00:00.000+00:00', PaymentEnd: '1970-01-01T00:00:00.000+00:00', Frequency: 'NaN'},
                {UserObjectId: '1', PaymentType: 'Income', Source: 'Student Finance', IncInBudget: 'true', Amount: 2456.00, FrequencyType: 'Lump sum', PaymentStart: '2021-05-15T00:00:00.000+00:00', PaymentEnd: '1970-01-01T00:00:00.000+00:00', Frequency: 'NaN'},
                {UserObjectId: '1', PaymentType: 'Income', Source: 'Part-time work', IncInBudget: 'true', Amount: 48.37, FrequencyType: 'Weekly', PaymentStart: '2020-10-05T00:00:00.000+00:00', PaymentEnd: '3000-01-01T00:00:00.000+00:00', Frequency: 2},
                {UserObjectId: '1', PaymentType: 'Income', Source: 'Bank of M&D', IncInBudget: 'true', Amount: 50, FrequencyType: 'Monthly', PaymentStart: '2020-10-30T00:00:00.000+00:00', PaymentEnd: '3000-01-01T00:00:00.000+00:00', Frequency: 1},
                {UserObjectId: '1', PaymentType: 'Outcome', Source: 'Example', IncInBudget: 'true', Amount: 20, FrequencyType: 'Weekly', PaymentStart: '2020-10-05T00:00:00.000+00:00', PaymentEnd: '3000-01-01T00:00:00.000+00:00', Frequency: 1},
                {UserObjectId: '1', PaymentType: 'Outcome', Source: 'Rent', IncInBudget: 'true', Amount: 495, FrequencyType: 'Monthly', PaymentStart: '2020-10-01T00:00:00.000+00:00', PaymentEnd: '3000-01-01T00:00:00.000+00:00', Frequency: 1},
                {UserObjectId: '1', PaymentType: 'Outcome', Source: 'Overdraft', IncInBudget: 'false', Amount: 557.62, FrequencyType: 'Debt', PaymentStart: '1970-01-01', PaymentEnd: '1970-01-01T00:00:00.000+00:00', Frequency: 'NaN'},
                {UserObjectId: '1', PaymentType: 'Outcome', Source: 'Credit Card', IncInBudget: 'true', Amount: 123.21, FrequencyType: 'Debt', PaymentStart: '1970-01-01', PaymentEnd: '1970-01-01T00:00:00.000+00:00', Frequency: 'NaN'},
                {UserObjectId: '1', PaymentType: 'Outcome', Source: 'Savings Goal', IncInBudget: 'true', Amount: 1000, FrequencyType: 'Lump sum', PaymentStart: '1970-01-01', PaymentEnd: '1970-01-01T00:00:00.000+00:00', Frequency: 'NaN'},
                {UserObjectId: '1', PaymentType: 'Outcome', Source: 'Tattoo', IncInBudget: 'true', Amount: 200, FrequencyType: 'Lump sum', PaymentStart: '2020-11-04T00:00:00.000+00:00', PaymentEnd: '1970-01-01T00:00:00.000+00:00', Frequency: 'NaN'},
                {UserObjectId: '1', PaymentType: 'Outcome', Source: 'Tattoo', IncInBudget: 'true', Amount: 200, FrequencyType: 'Lump sum', PaymentStart: '2020-12-04T00:00:00.000+00:00', PaymentEnd: '1970-01-01T00:00:00.000+00:00', Frequency: 'NaN'},
                {UserObjectId: '1', PaymentType: 'Outcome', Source: 'Tattoo', IncInBudget: 'true', Amount: 200, FrequencyType: 'Lump sum', PaymentStart: '2021-01-04T00:00:00.000+00:00', PaymentEnd: '1970-01-01T00:00:00.000+00:00', Frequency: 'NaN'}
            ]
        }

        res.json(response);
    }
}; 