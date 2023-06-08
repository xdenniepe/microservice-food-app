# YOKAI EXPRESS APP
#### 
#
# Table of Contents

# Setup Database
Run Database from Docker

- **Step 1:** Go to yokai-api with `cd app`
- **Step 2:** Run docker-compose with `docker-compose up`
- **Step 3:** Open MySQL Workbench in your applications
- **Step 4:** Create a database `yokai`
- **Step 5:** Run DDL scripts from `../DDL`


# How to Install and Run the Project
Install the dependencies and start the server.

- **Step 1:** Clone this repository
- **Step 2:** Go to cloned repository directory:
- **Step 3:** Install dependencies with `./mvnw install`
- **Step 4:** Create the env file and get env variables
- **Step 5:** Export environment variables using `export $(cat .env | tr -d ' ' | grep -v "#" | xargs)`

```
cd api
./mvnw install
export $(cat .env | tr -d ' ' | grep -v "#" | xargs)
export $(cat .env | xargs)
```

### Using .SH for windows:
```
bash run-install.sh
```

### Run
### Run Authentication Service
- **Step 1:** Go to auth directory with `cd auth`
- **Step 2:** Run development server locally with `./mvnw spring-boot:run`

### Using .SH for windows:
```
bash run-auth.sh
```

For Production Environment :
```
No Production Environment Yet
```

## Docker
