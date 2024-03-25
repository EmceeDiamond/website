package models

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"

	"fmt"
)

const dbuser = "root"
const dbpass = "VladBerkut17"
const dbname = "deliveries"

var provider_id = 0

func GetProviders() []Provider {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)

	// if there is an error opening the connection, handle it
	if err != nil {

		// simply print the error to the console
		fmt.Println("Err", err.Error())
		// returns nil on error
		return nil
	}

	defer db.Close()

	results, err := db.Query("SELECT * FROM provider")

	if err != nil {

		fmt.Println("Err", err.Error())

		return nil

	}

	providers := []Provider{}

	for results.Next() {

		var prov Provider

		err = results.Scan(&prov.ProviderId, &prov.ProviderName, &prov.INN, &prov.ContactDetails, &prov.RF, &prov.Status, &prov.Rating)

		if err != nil {
			panic(err.Error())
		}

		providers = append(providers, prov)

		//fmt.Println("product.code :", prod.Code+" : "+prod.Name)
	}

	return providers

}

func GetProvider(provider_id string) Provider {

	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)

	if err != nil {

		// simply print the error to the console
		fmt.Println("Err", err.Error())
		// returns nil on error
	}

	defer db.Close()

	results := db.QueryRow("SELECT * FROM deliveries.Provider WHERE provider_id = ?", provider_id)

	var prov Provider
	err = results.Scan(&prov.ProviderId, &prov.ProviderName, &prov.INN, &prov.ContactDetails, &prov.RF)

	if err != nil {
		panic(err.Error())
	}

	return prov

}

func UpdateProvider(provider_id string, provider Provider) {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)
	fmt.Println(provider)
	if err != nil {
		fmt.Println("Err", err.Error())
	}
	update, err := db.Query("UPDATE Provider SET `provider_name` = ?, `INN` = ?, `contact_details` = ?, `RF` = ? WHERE (`provider_id` = ?);",
		provider.ProviderName, provider.INN, provider.ContactDetails, provider.RF, provider_id)
	if err != nil {
		fmt.Println("Err", err.Error())
	}
	defer update.Close()
}

func UpdateProviders(provider []Provider) {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)
	if err != nil {
		fmt.Println("Err", err.Error())
	}
	for _, prov := range provider {
		update, err := db.Query("UPDATE Provider SET `provider_name` = ?, `INN` = ?, `contact_details` = ?, `RF` = ?,  `status` = ?, `rating` = ? WHERE (`provider_id` = ?);",
			prov.ProviderName, prov.INN, prov.ContactDetails, prov.RF, prov.Status, prov.Rating, prov.ProviderId)
		if err != nil {
			fmt.Println("Err", err.Error())
		}
		defer update.Close()
	}
}

func GetProduct(element_id string) Product {

	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)

	if err != nil {

		// simply print the error to the console
		fmt.Println("Err", err.Error())
		// returns nil on error
	}

	defer db.Close()

	results := db.QueryRow("SELECT * FROM deliveries.offers WHERE element_id = ?", element_id)

	var prod Product
	err = results.Scan(&prod.ProviderId, &prod.ElementId, &prod.ElementName, &prod.Quantity, &prod.Price, &prod.Amount, &prod.Deadline)

	if err != nil {
		panic(err.Error())
	}

	return prod

}

func UpdateProduct(element_id string, product Product) {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)
	if err != nil {
		fmt.Println("Err", err.Error())
	}
	update, err := db.Query("UPDATE Offers SET `element_name` = ?, `quantity` = ?, `price` = ?, `amount` = ?, `deadline` = ? WHERE (`element_id` = ?);",
		product.ElementName, product.Quantity, product.Price, product.Amount, product.Deadline, element_id)
	if err != nil {
		fmt.Println("Err", err.Error())
	}
	defer update.Close()
}

func UpdateProducts(product []Product) {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)
	if err != nil {
		fmt.Println("Err", err.Error())
	}
	for _, prod := range product {
		update, err := db.Query("UPDATE Offers SET `element_name` = ?, `quantity` = ?, `price` = ?, `amount` = ?, `deadline` = ? WHERE (`element_id` = ?);",
			prod.ElementName, prod.Quantity, prod.Price, prod.Amount, prod.Deadline, prod.ElementId)
		if err != nil {
			fmt.Println("Err", err.Error())
		}
		defer update.Close()
	}
}

func DeleteProvider(provider_id string) {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)
	if err != nil {
		fmt.Println("Err", err.Error())
	}

	delete, err := db.Query("DELETE FROM Provider WHERE provider_id = ?", provider_id)
	if err != nil {
		fmt.Println("Err", err.Error())
	}

	defer delete.Close()

	delete_product, err := db.Query("DELETE FROM offers WHERE provider_id = ?", provider_id)
	if err != nil {
		fmt.Println("Err", err.Error())
	}

	defer delete_product.Close()

}

func DeleteProviders(provider []Provider) {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)
	if err != nil {
		fmt.Println("Err", err.Error())
	}

	for _, prov := range provider {
		delete, err := db.Query("DELETE FROM Provider WHERE provider_id = ?", prov.ProviderId)
		if err != nil {
			fmt.Println("Err", err.Error())
		}

		defer delete.Close()

		delete_product, err := db.Query("DELETE FROM offers WHERE provider_id = ?", prov.ProviderId)
		if err != nil {
			fmt.Println("Err", err.Error())
		}

		defer delete_product.Close()
	}

}

func DeleteProduct(element_id string) {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)
	if err != nil {
		fmt.Println("Err", err.Error())
	}

	delete, err := db.Query("DELETE FROM offers WHERE element_id = ?", element_id)
	if err != nil {
		fmt.Println("Err", err.Error())
	}

	defer delete.Close()

}

func DeleteProducts(product []Product) {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)
	if err != nil {
		fmt.Println("db")
		fmt.Println("Err", err.Error())
	}

	for _, prod := range product {
		delete, err := db.Query("DELETE FROM offers WHERE element_id = ?", prod.ElementId)
		if err != nil {
			fmt.Println("del")
			fmt.Println("Err", err.Error())
		}

		defer delete.Close()
	}
}

func AddProvider(product Provider) {
	//id++
	var status = "Active"
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)

	if err != nil {
		panic(err.Error())
	}

	// defer the close till after this function has finished
	// executing
	defer db.Close()

	insert, err := db.Query(
		"INSERT INTO Provider (Provider_name,INN,contact_details,RF, Status, rating) VALUES (?,?,?,?,?,?)",
		product.ProviderName, product.INN, product.ContactDetails, product.RF, status, 0)

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()

}

// создать массив product и в него записать все данные из фронта, потом рендерить массив и записывать в бд
func AddProduct(product []Product) {
	fmt.Println(provider_id)
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)
	if err != nil {
		panic(err.Error())
	}

	// defer the close till after this function has finished
	// executing
	defer db.Close()

	results1 := db.QueryRow("SELECT * FROM Provider WHERE provider_id=(SELECT max(provider_id) FROM Provider)")
	//var id any
	var prov Provider

	err1 := results1.Scan(&prov.ProviderId, &prov.ProviderName, &prov.INN, &prov.ContactDetails, &prov.RF, &prov.Status, &prov.Rating)
	//err1 := results1.Scan(&id)
	if err1 != nil {
		fmt.Println(err1)
	}

	fmt.Println("results", prov.ProviderId)

	for _, prod := range product {
		//for i := 0; i < 20; i++ {
		insert, err := db.Query(
			"INSERT INTO offers (provider_id,element_name,quantity,price,amount,deadline) VALUES (?,?,?,?,?,?)",
			prov.ProviderId, prod.ElementName, prod.Quantity, prod.Price, prod.Amount, prod.Deadline)
		if err != nil {
			panic(err.Error())
		}

		defer insert.Close()
	}

	/*
		// Or use fmt.Sprintf to concatenate SQL statement if prepared statement isn't worth here

		sqlstm :=
			fmt.Sprintf("INSERT INTO product (code,name,qty,last_updated)"+
				" VALUES ('%s','%s',%d, now())",
				product.Code, product.Name, product.Qty)

		insert, err := db.Query(sqlstm)*/

	// if there is an error inserting, handle it

}

func GetProducts() []Product {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:5917)/"+dbname)

	// if there is an error opening the connection, handle it
	if err != nil {

		// simply print the error to the console
		fmt.Println("Err", err.Error())
		// returns nil on error
		return nil
	}

	defer db.Close()

	results, err := db.Query("SELECT * FROM offers")

	if err != nil {

		fmt.Println("Err", err.Error())

		return nil

	}

	product := []Product{}

	for results.Next() {

		var prod Product

		err = results.Scan(&prod.ProviderId, &prod.ElementId, &prod.ElementName, &prod.Quantity, &prod.Price, &prod.Amount, &prod.Deadline)

		if err != nil {
			panic(err.Error())
		}

		product = append(product, prod)
	}

	return product

}
