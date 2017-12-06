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
    message: "Choose me",
    choices: function() {
      var choiceArray = [];
      for (var i = 0; i < res.length; i++) {
        choiceArray.push(res[i].id_item + "-" + res[i].product_name)
      }
      // console.log(choiceArray)
      return choiceArray;
    }

  }]).then(function(inquireRepsonse) {

    console.log("test")
  })

  //next step is to take the number selected and then ask the quantity of the product selected.

}
