# JS Backend

A backend course to become a Full Stack Developer with professional and industry-level approaches.

- [Model link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share)

- [Video playlist](https://www.youtube.com/watch?v=EH3vGeqeIAo&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW)

# Key Concepts

## Links

- [env](#always-make-sure-to-exclude-env-from-bieng-pushed-to-the-public-repo-or-any-other-sensitive-place)
- [DB](#db-is-always-in-another-continent)
- [BSON](#mongodb-stores-all-of-its-data-in-bson-format)
- [bcrypt](#bcrypt)
- [jwt](#json-web-token-jwt)
- [Access & Refresh Tokens](#access--refresh-tokens)
- [cookies](#httponly-and-secure-cookies)

## ALWAYS make sure to exclude **.env** from bieng pushed to the public repo or any other sensitive place

- use .gitignore for it

## DB is Always in Another Continent

This phrase implies two main considerations:

1. **DB will mostly be very far away from the server**:

   - Fetching data from a distant database can take time.
   - Asynchronous operations will be used to handle data fetching efficiently.
     ```javascript
     async function fetchData() {
       await someAsyncOperation();
     }
     ```

2. **There will be chances of connection loss or any error**:
   - Errors and connection issues are common when dealing with remote databases.
   - Error handling mechanisms like `try-catch` will be used to manage such situations.
     ```javascript
     async function fetchData() {
       try {
         await someAsyncOperation();
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     }
     ```

## ConnectDB Might Return a Promise

- The `connectDB` function may return a promise.
- Use `.then` and `.catch` for handling the promise.
  ```javascript
  connectDB()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
    });
  ```

## we will use **`app.use()`** mostly either for middleware or for configurations

## MongoDB stores all of its data in BSON format

- **Binary JSON** is just an extension of **_JSON_**
- supports more **Data Types** int, long, date, binary, etc

- designed to be **efficient** in both storage space and scan-speed.

- **Efficient Traversal**: It includes metadata for efficient traversal and extraction, allowing for faster query operations in databases like MongoDB.

## mongoose aggreagate pagination

## bcrypt

Bcrypt helps to hash passwords:

- Easier encryption and decryption: Provides a secure way to store passwords by hashing them.

## JSON Web Token (JWT)

JWT (JSON Web Token) is used for securely transmitting information between parties:

- Payload: fancy name for the data contained within the token.
- Secret: Used to sign and verify the token.
- Bearer Token: `jwt` is a type of token that can be used like a key to access resources.
- Refresh Token: Stored in the database for issuing new access tokens.
- Access Token: Not stored in the database.

```JavaScript
req.body:  [Object: null prototype] {
  fullName: 'one',
  username: 'one',
  email: 'one@mail.com',
  password: '12345678'
}

req.files:  [Object: null prototype] {
  avatar: [
    {
      fieldname: 'avatar',
      originalname: 'pic1.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: './public/temp',
      filename: 'pic1.jpg',
      path: 'public\\temp\\pic1.jpg',
      size: 123
    }
  ],
  coverImage: [
    {
      fieldname: 'coverImage',
      originalname: 'boy.png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: './public/temp',
      filename: 'boy.png',
      path: 'public\\temp\\boy.png',
      size: 123
    }
  ]
}
```

## Access & Refresh Tokens

### Access Token

- **Definition**: A short-lived token used to access specific resources or services.
- **Lifespan**: Typically valid for minutes to hours.
- **Usage**: Sent with each request to the server to prove the user's identity and permissions.
- **Example**: After logging into a website, an access token is issued to your browser, which is then included in requests to access your profile, post comments, etc.

### Refresh Token

- **Definition**: A long-lived token used to obtain a new access token without re-authenticating.
- **Lifespan**: Valid for days to months.
- **Usage**: Used to request a new access token when the current one expires.
- **Example**: When the access token expires, the refresh token is used to automatically get a new access token, so you don’t have to log in again.

## Why Use Refresh Tokens?

Using refresh tokens provides enhanced security and user convenience:

- **Reduced Risk**: Short-lived access tokens minimize the impact of token theft.
- **Enhanced Control**: Servers can monitor refresh token usage and detect suspicious activity.
- **User Convenience**: Users remain logged in without frequent re-authentication.

## HttpOnly and Secure Cookies

### HttpOnly

- **Description**: Prevents client-side scripts from accessing the cookie, mitigating XSS attacks.
- **Usage**: Set the `HttpOnly` attribute to `true`.

### Secure

- **Description**: Ensures the cookie is only sent over HTTPS, protecting it from MITM attacks.
- **Usage**: Set the `Secure` attribute to `true`.

## Example Scenarios

1. **HttpOnly: true, Secure: true**

   - Highest security for sensitive data.

2. **HttpOnly: true, Secure: false**

   - Rarely recommended due to risk of interception over HTTP.

3. **HttpOnly: false, Secure: true**

   - Allows client-side access with secure transmission.

4. **HttpOnly: false, Secure: false**
   - Least secure, only for non-sensitive data.

## MongoDB Aggregation Pipelines

An aggregation pipeline is a pipeline (no. of stages) that perform documents

- output of a stage will be the onput for the next stage
- each stage will perform an operation on the input (document) and pass the resultant (modified document) to the next stage
- An aggragation pipeline can return resukts for groups of document (e.g. avg, max, min values)

```javascript
db.orders.aggregate([
  // stage 1: e.g. filter by size
  {
    $match: { size: "medium" },
  },

  // stage 2: grp remaining documents by name and calc total
  {
    $group: { id: "$name", totalQuantity: { $sum: "quantity" } },
  },

  // stage 3, 4, 5, etc. as per the requirement
  {
    // joining ->left join
    $lookup: {
      from: "right_collection_name",
      localField: "field_left",
      foreignField: "field_right",
      as: "field_name" // returns array
    }
  },

  {
    $addFields: {
      "new_field": {
        // $first: "field_name"
        // or
        arrayElemAt: ["field_name", pos_index]
      }
    }
  },
  {
    // this will return only the selected fields
    $project: {}
  }
]);

```

pipeline -> aggr -> match -> lookup -> -> addFields -> project

## MongoDB operators

`$addFields`
Adds new fields to documents. Similar to `$project`, `$addFields` reshapes each document in the stream; specifically, by adding new fields to output documents that contain both the existing fields from the input documents and the newly added fields.

`$project`
  - Reshapes each document in the stream, such as by adding new fields or removing existing fields. 
  - For each input document, outputs one document.

`$set`
  + Adds new fields to documents. 
  + Similar to` $project`, `$set` reshapes each document in the stream; specifically, by adding new fields to output documents that contain both the existing fields from the input documents and the newly added fields.

  - `$set` is an alias for $addFields stage.

`$unset` 
  - Removes/excludes fields from documents.
  - It is an alias for `$project` stage that removes fields.

`$lookup`
  - Performs a left outer join to another collection in the same database to filter in documents from the "joined" collection for processing. 

`$match`
  - Filters the document stream to allow only matching documents to pass unmodified into the next pipeline stage. 
  - `$match` uses standard MongoDB queries. 
  - For each input document, outputs either one document (a match) or zero documents (no match).
