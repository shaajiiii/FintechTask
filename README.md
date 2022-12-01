# Marlo Technologies - Node Task

Rest-API. CRUD operation for contacts (users), and Login for the same contacts. 
Implemented using  **express.js** and  **mongoose**

Uses JWT authentication.
User parameters are,

* Names (First name, Last Name, Middle name (optional)), mandatory
* DOB, optional,
* Email, mandatory and UNIQUE
* Phone, mandatory and UNIQUE
* Occupation, optional
* Company, optional
* Password


# Installation & Run


### 1) Clone the repository, install node packages 

``` 
//on local
git clone https://github.com/shaajiiii/FintechTask.git
npm install
npm start
```

Before running the API, set up the **.env** file with your credetials

``` 
PORT =  
DATABASE_URL = "" 
SALT=  
JWTPRIVATEKEY= ""

```


## API

#### /signup
* `POST` : Creates a new user after server side validation

#### /login
* `POST` : Authentication for user using JWT

#### /actions
* `GET` : Get the name of logged in user
* `DELETE` : Deletes the user



