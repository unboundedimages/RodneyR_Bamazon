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
  // connection.end();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    numberTwo(res);
  });
  // connection.end();
  // afterConnection()
}

function numberTwo(res) {
  // afterConnection()
  inquirer.prompt([{
        type: "list",
        message: "Select your item and press enter",
        name: "items",
        choices: function() {
          var choiceArray = [];
          var priceArray = [];
          for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].id_item + "  " + res[i].product_name + " $ " + res[i].price.toFixed(2))
          }
          return choiceArray;

        }

      },
      {
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
      // afterConnection()

      connection.query(
        "SELECT * FROM products",
        function(err, res) {
          if (err) throw err;

          var dbItem;

          // find the item with a matching name
          for (var i = 0; i < res.length; i++) {
            if (answer.items.indexOf(res[i].product_name) >= 0) {
              dbItem = res[i];
            }
          }

          // if we found a match
          if (dbItem) {
            if (dbItem.stock_quantity < 0) {
              console.log("insufficent stock")
              numberTwo(res);
            }
            else {
              var newPodQty = dbItem.product_name;
              var newUnitVol = dbItem.stock_quantity - (answer.quantity);
              var total = (answer.quantity) * dbItem.price.toFixed(2);
              console.log("Your total is: $" + total.toFixed(2));
              updateProduct(newUnitVol, newPodQty);
            }

          }
        });

    });
}

// //next step is to update the units/stock quantity in the database.
function updateProduct(newUnitVol, newPodQty) {
  console.log("updating db");
  var query = connection.query("UPDATE products SET ? WHERE ?", [{
      stock_quantity: newUnitVol
    },
    {
      product_name: newPodQty
    }
  ], function(err, resp) {
    if (err) console.log(err);
    // console.log(resp);

    buyORbye()
  });
}

function buyORbye() {
  // console.log("would you like to purchase another item?");
  inquirer.prompt({
    name: "buyORbYe",
    type: "rawlist",
    message: "Would you like to but [BUY] something else or [END] your transaction?",
    choices: ["BUY", "END"]
  }).then(function(answer) {
    if (answer.buyORbYe.toUpperCase() === "BUY") {
      afterConnection()
    };

  })
}
