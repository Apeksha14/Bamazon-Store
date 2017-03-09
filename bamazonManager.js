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

// List of Menu Options
var runQuestion = {
   
    name: 'menu',
    message: 'What would you like to do?',
    type: 'list',
    choices: ['View Products for Sale',
			  'View Low Inventory',
			  'Add to Inventory',
			  'Add New Product']

	};

	inquirer.prompt(runQuestion).then(function(answers){	

	// View Products for Sale
	if(answers.menu === "View Products for Sale")
	{
		// List all the products available for sale
		connection.query("select * from products where stock_quantity > 1",function(err,res){
		if(err) throw err;
		console.log("------------------------------------------------------------------");
		console.log("Item_Id   Product Name          Department_name      Price ");
		console.log("------------------------------------------------------------------");
		for (var i = 0; i < res.length; i++) {
    		
    		console.log("  "+res[i].item_id + "  |  " + res[i].product_name + "  |   " + res[i].department_name + "  |  " + res[i].price);
  		
  		}
  			
  		console.log("------------------------------------------------------------------");	

		});
	}

	// View Low Inventory
	if(answers.menu === "View Low Inventory")
	{
		// List all the products with stock quantity less than 5
		connection.query("select * from products where stock_quantity < 5",function(err,res){
		if(err) throw err;
		console.log("------------------------------------------------------------------");
		console.log("Item_Id   Product Name          Department_name      Price ");
		console.log("------------------------------------------------------------------");
		for (var i = 0; i < res.length; i++) {
    		
    		console.log("  "+res[i].item_id + "  |  " + res[i].product_name + "  |   " + res[i].department_name + "  |  " + res[i].price);
  		
  		}
  			
  		console.log("------------------------------------------------------------------");	

		});
	}

	// Add to Inventory
	if(answers.menu === "Add to Inventory")
	{
		// ask for product Id and quantity
		inquirer.prompt([{

			name : "productId",
			message : "Enter the product Id you want to add inventory to?"

		},
		{

			name : "quantity",
			message : "Enter the quantity?"

		}]).then(function(answers){

		// select the stock quantity for the particular product
		connection.query("select stock_quantity from products where item_id = ?",[answers.productId],function(err,res){
		if(err) throw err;

		// add the value entered to the stock quantity
		var total = parseInt(answers.quantity) +  parseInt(res[0].stock_quantity);

		// update the total stock quantity for the product
		connection.query("update products set stock_quantity = ? where item_id = ?",[total,answers.productId],function(err,res){
		if(err) throw err;
		console.log("updated");
		});

	});

		// View the product details
		connection.query("select * from products where stock_quantity > 1",function(err,res){
		if(err) throw err;
		console.log("------------------------------------------------------------------");
		console.log("Item_Id   Product Name          Department_name      Price ");
		console.log("------------------------------------------------------------------");
		for (var i = 0; i < res.length; i++) {
    		
    		console.log("  "+res[i].item_id + "  |  " + res[i].product_name + "  |   " + res[i].department_name + "  |  " + res[i].price);
  		
  		}
  			
  		console.log("------------------------------------------------------------------");	

		});

		});
		
	}

	// Add new Product
	if(answers.menu === "Add New Product")
	{
		inquirer.prompt([{

			name : "productName",
			message : "Enter the product name"

		},
		{

			name : "department",
			message : "Enter the department name"

		},
		{

			name : "price",
			message : "Enter the price of the product"

		},
		{

			name : "quantity",
			message : "Enter the stock quantity of the product"

		}]).then(function(answers){

		// insert new product into products table
		connection.query("insert into products(product_name,department_name,price,stock_quantity) values(?,?,?,?)",[answers.productName,answers.department,answers.price,answers.quantity],function(err,res){
		if(err) throw err;
		console.log("Product Added!!");

		});

		// View Product Details
		connection.query("select * from products",function(err,res){
		if(err) throw err;
		console.log("------------------------------------------------------------------");
		console.log("Item_Id   Product Name          Department_name      Price ");
		console.log("------------------------------------------------------------------");
		for (var i = 0; i < res.length; i++) {
    		
    		console.log("  "+res[i].item_id + "  |  " + res[i].product_name + "  |   " + res[i].department_name + "  |  " + res[i].price);
  		
  		}
  			
  		console.log("------------------------------------------------------------------");	

		});
	
	});

	}
});




