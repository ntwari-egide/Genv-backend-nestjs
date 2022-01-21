
## GenV - backend implementation

## [](#table-of-content)Table of content

1.  [About the project](#about)
    -   [Built With](#built-with)
2.  [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
3.  [Contributing](#contributing)
4.  [License](#license)
5.  [Contact](#contact)
##  [](#about)About The Project

GenV is a logistics and delivery company that both flies autonomous vehicles and operates a full-fledged logistics system. It runs operations out of our distribution centers, which are called "nests." At a given nest, there is an inventory of medical supplies and a team of operators who manage that inventory and process orders from doctors.

### []()Initializing catelog
Before anything else happens, we will call init_catalog. This serves to capture the list of products that are allowed to be stocked or ordered.
![enter image description here](https://res.cloudinary.com/dpqasrwfu/image/upload/v1642770307/Screenshot_2022-01-21_150112_b22euw.png)

### []()Process order

Api: [https://genv-backend-apis.herokuapp.com/api/v1/orders](https://genv-backend-apis.herokuapp.com/api/v1/orders)
Request: 
```json
{
  "orderId": "090",
  "requested": [
    {
      "productId": "61eaaf452e172df3e75d6db7",
      "quantity": 3
    }
  ]
}
```
Response: 
```json
{
  "status": "success",
  "message": "Saving new order... ",
  "payload": {
    "orderId": "090",
    "_id": "61eab0952e172df3e75d6dd9",
    "orderedProducts": [
      {
        "product": {
          "productId": "8",
          "productName": "CRYO A+",
          "mass_g": 40,
          "_id": "61eaaf452e172df3e75d6db7",
          "__v": 0
        },
        "quantity": 3,
        "isShipped": false,
        "orderedAt": "2022-01-21T13:09:41.368Z",
        "_id": "61eab0952e172df3e75d6dda",
        "__v": 0
      }
    ],
    "orderCompleteStatus": "COMPLETED",
    "__v": 0
  },
  "length": 1
}
```
Processes performed:

 - Recording each ordered product
 - Check if the size of the order will fit in single container, fun `checkOrderFitnessInSingleShipment(orderedProducts)`
 - Check stored product availability and reducing the store `checkStoredProductAvailabilityAndReduceStore(orderedProducts[i].product.id, orderedProducts[i].quantity)`
 - Recording a product to be shipped from store and being removed from the store
 - Updating stored product to make `isShippedStatus` to `true`
 - Shipping a package of products
 - Changing a status of the order  so as to show the shipment completion status
 

### []()Process restock
Api: [https://genv-backend-apis.herokuapp.com/api/v1/stored-products/restock](https://genv-backend-apis.herokuapp.com/api/v1/stored-products/restock)

Request: 

```json
[
  {"productId": "61eaaf452e172df3e75d6db5", "quantity": 30}, {"productId": "61eaaf452e172df3e75d6db6", "quantity": 25}
]
```

Processes performed:

 - Check whether the store of a product is found so that it can not be created again `await this.storedProductModel.findOne({ product: relatedProduct})`
 - If store is not found, it create new store of that product
 - If the store is found, it will add the `quantity` to existing quantity
 - After restock, we make the shipment
	 Api: [https://genv-backend-apis.herokuapp.com/shipments](https://genv-backend-apis.herokuapp.com/shipments)
	Request 
	```json
	{
	  "shipmentId": "08",
	  "orderId": "61eab0952e172df3e75d6dd9",
	  "shippedProducts": [
	    {
	      "productId": "61eab0952e172df3e75d6dda",
	      "quantity": 3
	    }
	  ]
	}
	```
- Result of shipment is then printed in the system logs

### []()Shipping the package
Api [POST]: [https://genv-backend-apis.herokuapp.com/shipments](https://genv-backend-apis.herokuapp.com/shipments)
Request 
```json
{
  "shipmentId": "08",
  "orderId": "61eab0952e172df3e75d6dd9",
  "shippedProducts": [
    {
      "productId": "61eab0952e172df3e75d6dda",
      "quantity": 3
    }
  ]
}
```

Response:
```json
{
  "status": "success",
  "message": "Saving new order... ",
  "payload": {
    "shipmentId": "08",
    "shippedProducts": [
      {
        "product": null,
        "quantity": 3,
        "_id": "61eab55a2e172df3e75d6e40",
        "__v": 0
      }
    ],
    "_id": "61eab55a2e172df3e75d6e3e",
    "order": {
      "orderId": "090",
      "orderedProducts": [
        {
          "product": {
            "productId": "8",
            "productName": "CRYO A+",
            "mass_g": 40,
            "_id": "61eaaf452e172df3e75d6db7",
            "__v": 0
          },
          "quantity": 3,
          "isShipped": false,
          "orderedAt": "2022-01-21T13:09:41.368Z",
          "_id": "61eab0952e172df3e75d6dda",
          "__v": 0
        }
      ],
      "orderCompleteStatus": "COMPLETED",
      "_id": "61eab0952e172df3e75d6dd9",
      "__v": 0
    },
    "__v": 0
  },
  "length": 1
}
```
Processes performed:

 - Creating shipped product so as to store all shipped products in one place
 - We check if the order with that id exists

### [](#others)Other supporting endpoints can be found via this link
Swagger documentation: 
[https://genv-backend-apis.herokuapp.com/swagger-ui](https://genv-backend-apis.herokuapp.com/swagger-ui)

Models analysis:

`	- Product: {"mass_g": 700, "product_name": "RBC A+ Adult", "product_id": 0}`
	`- Ordered Product: {"product_id": 0, "quantity": 2}`
	`- Order: {order_id: "", [Ordered products]}`
	`- Stored product: {product_id: "",  quantity}`
	`- Shipped product: {product_id: "",  quantity}`
	`- Shipment: {shipmentId: "", order, [shipped product]}`


#### [](#build-with) Build with

-   Nest Js (A progressive [Node.js](http://nodejs.org/) framework for building efficient and scalable server-side applications.)
-   Mongo db database
-  Mongoose
- Open api swagger documentation

## [](#getting-started)Getting Started

This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

### [](#prerequisites)Prerequisites

This is an example of how to list things you need to use the software and how to install them.

1.  Clone project from gitlab

-   Github link: [Link](https://github.com/ntwari-egide/Genv-backend-nestjs)

2.  Switching to your folder

-   After cloning,cd in folder called **Genv-backend-nestjs**

###  [](#installation)Installation

-   npm `npm install` or `yarn install`
### [](#installation)Run
- npm 	`npm run dev`  or  `yarn run dev`
- open the link in the browser : [http://localhost:3000/swagger-ui/](http://localhost:3000/swagger-ui/)

## [](#contributing)Contributing

Contributions are what make the this GEV project such an amazing, fantastic, inspire, and create new ideas. Any contributions you make are **greatly appreciated**.

1.  Fork the Project from our github [Link](https://github.com/ntwari-egide/Genv-backend-nestjs)
2.  Create your Feature Branch (`git checkout -b ft-AmazingFeature-userstories_id`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin ft-AmazingFeature-userstories_id`)
5.  Open a Pull Request
6.  Add yourself as assignee
7.  Add [ntwariegide2@gmail.com](mailto:ntwariegide2@gmail.com) as reviewer

## [](#license) License

Distributed under the MIT License. See `LICENSE` for more information.

## [](#contact)Contact

Egide Ntwari - [egide2020](https://twitter.com/egide2020) - [ntwariegide2@gmail.com](mailto:ntwariegide2@gmail.com)

PROJECT LINK: [https://genv-backend-apis.herokuapp.com/swagger-ui](https://genv-backend-apis.herokuapp.com/swagger-ui)