// include mysql node package
var mysql = require("mysql");

// include inquirer node package
var inquirer = require("inquirer");

//create connection to the database
var connection = mysql.createConnection({

	host:"localhost",
	port:"8889",
	user:"root",
	password:"root",
	database:"Bamazon"

});

// connect to the MySQL database
connection.connect(function(err){

	if(err) throw err;
	console.log("connection as id "+connection.threadId);

 }.bind(connection));


// show the details of all the products to the customer
 connection.query("select item_id,product_name,department_name,price from products",function(err,res){
			if(err) throw err;

			console.log("------------------------------------------------------------------");
			console.log("Item_Id   Product Name          Department_name      Price ");
			console.log("------------------------------------------------------------------");
			for (var i = 0; i < res.length; i++) {
    			
    			console.log("  "+res[i].item_id + "  |  " + res[i].product_name + "  |   " + res[i].department_name + "  |  " + res[i].price);
  			
  			}
  			
  			console.log("------------------------------------------------------------------");

 }); 


// Ask Customer for the item id of the product and number of units 
// they want to buy. If the stock is available show them the total price 
// and if the product is out of stock order cannot be processed

	setTimeout(function(){

		inquirer.prompt([
		{

        	name: 'itemId',
        	message: 'Enter the product id you would like to buy?'
		
		},
		{
			name: 'noOfUnits',
        	message: 'How many units of the product you would like to buy?'

		}]).then(function (answers) {

			var price;

			//select stock_quantity from the table products
			connection.query("select stock_quantity from products where item_id = ?",[answers.itemId],function(err,res){
			
			if(err) throw err;
		
			//check if the stock is available

			if(res.length > 0)
			{
				var availablity = res[0].stock_quantity;
				
				if(res[0].stock_quantity >= answers.noOfUnits)
				  {
					// select price of the product from the database table products
					connection.query("select price from products where item_id = ?",[answers.itemId],function(err,res){
					
					if(err) throw err;

					price = res[0].price;

					// Display the total price of the product to the customer
					console.log("Total Price : "+ (price * answers.noOfUnits));
					console.log("PRODUCT BOUGHT!!");
				
					// update the new stock quantity 
					var remain = availablity - answers.noOfUnits;
					connection.query("update products set stock_quantity = ? where item_id = ?",[remain,answers.itemId],function(err,res){
					
					if(err) throw err;
					
					console.log("Table updated");
				
					});

					});

				  }

				  else
					{
						console.log("INSUFFICIENT QUANTITY!!");
						console.log("Sorry,We cannot process your order!!");

					}

			}

			else
			{
				console.log("Product not found!!");
				console.log("Please enter a valid ITEM ID!!");
			}

			// display message accordingly if the stock is not available
			

});

		});
	},2000);

//end connection
setTimeout(function(){
	connection.end();
},20000);
		

	



