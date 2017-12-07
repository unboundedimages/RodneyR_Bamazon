var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon_db"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // connection.end();
  afterConnection();
  connection.end();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // console.log("Choose the item by it's number\n");
    // console.log(res);
    // for (var i = 0; i < res.length; i++) {
    // console.log(res[i].id_item, res[i].product_name);
    // var resID = res[i].id_item;
    // var prod = res[i].product_name;
    // }
    // console.log(JSON.stringify(res));
    numberTwo(res);
  });
  // connection.end();

}

function numberTwo(res) {
  inquirer.prompt([{
        name: "name",
        type: "list",
        message: "Select your item and press enter",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].product_name)
          }
          // console.log(choiceArray)
          return choiceArray;
        }

      },
      {
        //this is the more effeciant way.
        name: "quantity",
        type: "input",
        message: "How many are you buying?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log("  please enter a Numeric number i.e 1 2 3 and not one two three");
          return false;
        }
      }
    ])
    .then(function(answer) {
      // var i = res.length
      answer.quantity = parseInt(answer.quantity)
      var dbItem = {};
      for (var i = 0; i < res.length; i++) {
        if (res[i].product_name == answer.name) {
          dbItem = res[i];
        }

        // console.log(res[i].price.toFixed(2))
        // var money = res[i].price.toFixed(2);
        // dollar.push(parseInt(res[i].price.toPrecision(6)))
      }
      var total = answer.quantity * dbItem.price.toFixed(2);
      console.log(total);
      // console.log(dollar);
      // console.log(answer)
      // if (isNaN(parseInt(answer.name.price))) {
      //   console.log("it's a number")
      // }
      // else {
      //   console.log("it is not");
      // }
      // // var todos = answer.name
      // console.log(answer.name)
      // console.log(answer)
      // console.log(answer.quantity);
      // if (res[i].price * answer.quantity) {
      //   total = res[i].price;
      // }
    })
  // //next step is to update the units/stock quantity in the database.

}
