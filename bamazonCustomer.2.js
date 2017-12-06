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
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    // connection.end();
    nowPrompt();
  });
}
//create a function called now prompt and do step 6
function nowPrompt() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    inquirer
      .prompt([{
          message: "What is the ID number of the product you want to purchase?",
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].id_item);
            }
            return choiceArray;
          },

        },
        {
          type: "input",
          name: "item",
          message: "How many?"
        }

      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_name === answer.choice) {
            chosenItem = res[i];
          }
        }
      });
  });
}
