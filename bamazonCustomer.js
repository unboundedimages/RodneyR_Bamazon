var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});
//after connection is established to the bamazon_db, a connection query is created inside this function
//from the products table
function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    numberTwo(res);
  });
}
//number two  This fucntion has an argument passed in it called res that is pulled from prior function
// The information stored in res will be used in the choices portion of this inquirer object.
// The function in choices will loop through the array of results from the product table and pull
// the item id, the product name, and the price associated with it.  When the loop is complete,
// the information will be stored in blank array to be used later by using the push command.
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
      //After the user selects the item they want to purchase, This object will prompt the user to input
      //the quantity they want to buy.  A validate condtion is applied to make sure the user inputs a
      //numeric number instead of alphanumeric.  This to make sure the user doesn't misspell werds.
      //if a NaN or not  a number (letters) is input by the user, they will not be allowed to proceed
      //until they provide a numeric value.
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
      connection.query(
        "SELECT * FROM products",
        function(err, res) {
          if (err) throw err;
          var dbItem;
          for (var i = 0; i < res.length; i++) {
            if (answer.items.indexOf(res[i].product_name) >= 0) {
              dbItem = res[i];
            }
          } //once confirmed match the answer with the database value  if out of stock
          //alert user of insufficient stock and loop them back to choose something else.
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
//update inventory
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
    buyORbye()
  });
}
//choose whether to continue buying or to exit the program
function buyORbye() {
  inquirer.prompt({
    name: "buyORbYe",
    type: "rawlist",
    message: "Would you like to but [BUY] something else or [END] your transaction?",
    choices: ["BUY", "END"]
  }).then(function(answer) {
    if (answer.buyORbYe.toUpperCase() === "BUY") {
      afterConnection()
    }
    else {
      console.log("Thank for shopping.  Come back soon!")
      connection.end()
    }

  })
}
