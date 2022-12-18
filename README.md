# UpBlog-Backend

## Endpoints

### Auth
1. POST http://localhost:8080/auth/login
2. PUT http://localhost:8080/auth/signup
3. PATCH http://localhost:8080/auth/status
4. GET http://localhost:8080/auth/status

###Feed
1. GET: http://localhost:8080/feed/posts
2. GET http://localhost:8080/feed/post/{postId}
3. POST http://localhost:8080/feed/post

## Authentication
![image](https://user-images.githubusercontent.com/44314046/208300883-26749c7c-b8db-4c45-8eca-49ae77435243.png)


## Automated Testing Tools
1. *Mocha* for running the tests
2. *Chai* for Asserting the results
3. *Sinon* for managing side effects and external dependencies
