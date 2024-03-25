package main

import (
	"fmt"
	"net/http"

	"API/models"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/providers", getProviders)

	router.GET("/products", getProducts)

	router.GET("/provider/:provider_id", getProvider)

	router.GET("/product/:element_id", getProduct)

	router.POST("/add_providers", addProvider)

	router.POST("/add_products", addProduct)

	router.DELETE("/delete_provider/:provider_id", deleteProvider)

	router.DELETE("/delete_providers", deleteProviders)

	router.DELETE("/delete_product/:element_id", deleteProduct)

	router.DELETE("/delete_products", deleteProducts)

	router.PUT("/provider/update_provider/:provider_id", updateProvider)

	router.PUT("/provider/update_providers", UpdateProviders)

	router.PUT("/product/update_product/:element_id", UpdateProduct)

	router.PUT("/product/update_products", UpdateProducts)

	router.Run("localhost:8000")
}

func getProviders(c *gin.Context) {

	providers := models.GetProviders()
	if providers == nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, providers)
	}
}

func getProvider(c *gin.Context) {

	provider_id := c.Param("provider_id")
	provider := models.GetProvider(provider_id)
	/*if provider == nil {
		c.AbortWithStatus(http.StatusNotFound)

	} else {



	}*/
	c.IndentedJSON(http.StatusOK, provider)

}

func getProduct(c *gin.Context) {

	element_id := c.Param("element_id")
	product := models.GetProduct(element_id)
	/*if provider == nil {
		c.AbortWithStatus(http.StatusNotFound)

	} else {



	}*/
	c.IndentedJSON(http.StatusOK, product)

}

func updateProvider(c *gin.Context) {
	provider_id := c.Param("provider_id")
	var prov models.Provider

	if err := c.BindJSON(&prov); err != nil {

		c.AbortWithStatus(http.StatusBadRequest)
		fmt.Println("dfs")
	} else {

		models.UpdateProvider(provider_id, prov)
		c.IndentedJSON(http.StatusCreated, prov)
	}
}

func UpdateProviders(c *gin.Context) {
	var provider []models.Provider
	if err := c.BindJSON(&provider); err != nil {
		fmt.Println(err)
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		fmt.Println(provider)
		models.UpdateProviders(provider)
		c.IndentedJSON(http.StatusCreated, &provider)

	}

}

func UpdateProduct(c *gin.Context) {
	element_id := c.Param("element_id")
	var prod models.Product

	if err := c.BindJSON(&prod); err != nil {

		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		fmt.Println(prod)
		models.UpdateProduct(element_id, prod)
		c.IndentedJSON(http.StatusCreated, prod)
	}
}

func UpdateProducts(c *gin.Context) {
	var product []models.Product
	if err := c.BindJSON(&product); err != nil {
		fmt.Println(err)
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		models.UpdateProducts(product)
		fmt.Println(product)
		c.IndentedJSON(http.StatusCreated, &product)

	}

}

func deleteProvider(c *gin.Context) {
	provider_id := c.Param("provider_id")
	models.DeleteProvider(provider_id)

	c.IndentedJSON(http.StatusOK, gin.H{"message": "Provider Deleted"})

}

func deleteProviders(c *gin.Context) {

	var provider []models.Provider
	if err := c.BindJSON(&provider); err != nil {
		fmt.Println("main0")
		fmt.Println(err)
		fmt.Println("main")
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		models.DeleteProviders(provider)
		fmt.Println(provider)
		c.IndentedJSON(http.StatusCreated, &provider)

	}

}

func deleteProduct(c *gin.Context) {
	element_id := c.Param("element_id")

	models.DeleteProduct(element_id)

	c.IndentedJSON(http.StatusOK, gin.H{"message": "Product Deleted"})

}

func deleteProducts(c *gin.Context) {

	var product []models.Product
	if err := c.BindJSON(&product); err != nil {
		fmt.Println("main0")
		fmt.Println(err)
		fmt.Println("main")
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		models.DeleteProducts(product)
		fmt.Println(product)
		c.IndentedJSON(http.StatusCreated, &product)

	}

}

func addProvider(c *gin.Context) {
	var prov models.Provider

	if err := c.BindJSON(&prov); err != nil {

		c.AbortWithStatus(http.StatusBadRequest)
	} else {

		models.AddProvider(prov)
		c.IndentedJSON(http.StatusCreated, prov)
	}

}

// рендерить ф-ю AddProduct 94 раза, передавая в нее элементы массива полученного из
func addProduct(c *gin.Context) {
	var product []models.Product
	if err := c.BindJSON(&product); err != nil {
		fmt.Println(err)

		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		models.AddProduct(product)
		fmt.Println(product)
		c.IndentedJSON(http.StatusCreated, &product)

	}

}

func getProducts(c *gin.Context) {

	products := models.GetProducts()
	if products == nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, products)
	}
}
