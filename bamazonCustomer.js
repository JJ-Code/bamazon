var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var colors = require('colors');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

//connecting to mysqul server and sql database
connection.connect(function(error) {
  if (error) throw error;
  displayTable();
});

var displayTable = function() {
  //header for cli-table
  var table = new Table({
    head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'],
    colWidths: [10, 20, 20, 10, 15]
  });
  connection.query("SELECT * from products", function(error, result) {
    for (var i = 0; i < result.length; i++) {
      table.push(
        //pushing results to populate cli-table
        [result[i].item_id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity]
      );
    }; //end of forloop
    console.log(table.toString());
    buyProducts();
  }); //end of query

}; //end of displayTable function


var buyProducts = function(result) {
  var buyingProcess = this;

  inquirer
    .prompt([{
        name: "item_id",
        type: "input",
        message: "Please input item id of the product you would like to buy. (Press Q to quit app)"
      },
      {
        name: "stock_quantiy",
        type: "input",
        message: "How many would you like to buy?"

      }
    ]) //end of item prompt
    .then(function(customerAnswer) {
      if(customerAnswer.item_id.toUpperCase() == "Q"){
        process.exit();
      };

      //main check of buying process
      var quantity = 0;
      connection.query("SELECT stock_quantity, price, department_name, product_name from products where item_id = ?", customerAnswer.item_id, function(err, res) {
        //returns the result in an array since there is only 1 matching item_id it is an array of 1 at index of 0
        quantity = res[0].stock_quantity
        if (quantity >= parseInt(customerAnswer.stock_quantiy)) {
          //subtracting prodcut that was purchase
          quantity -= customerAnswer.stock_quantiy
          console.log("You have purchase " + customerAnswer.stock_quantiy + " " + res[0].product_name);


          //updating database to decrease the number of purchase products
          var query = "UPDATE products SET ? WHERE ?";

          connection.query(query, [{
              stock_quantity: quantity
            },
            {
              item_id: customerAnswer.item_id
            }
          ]); //end of updating database
          buyProducts();
        } //end of if statement when quantity >= customerAnswer
        else {
          console.log("Insufficient quantity, please choose another item or change quantity.");
          buyProducts();
        }

      }); //end of query


    }); //end of then


}; //end of customerBuying var function
