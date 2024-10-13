# Console Codes

| Codes     | Meaning         |
| --------- | --------------- |
| **"[!]"** | Error           |
| **"[+]"** | Warning         |
| **"[*]"** | Information     |
| **"[#]"** | Process Started |

# API

Here, I will explain how the API works for safe usage. The API is well-designed because it is based on the Route File system (yes, I made up this term, why not :-) ). To explain this simply, when you create a directory in the `./api/` folder, it is transformed into an API route.

## How to create routes?

As I mentioned earlier, you need to create a directory in the `./api/` folder. Then, create a file with the following names based on the method you need:

-   `"post.route.js"` for the POST method
-   `"get.route.js"` for the GET method

> \> **NOTE**: When you create routes, you can also create subfolders, and it will work as well (as long as there is a folder inside xD). You can access it here:
> **example:** `./api_interface/api/your/subfolder/get.route.js` > `http://localhost:XXXX/api/your/subfolder`
> You need to create all routes in the `/api/` folder.

## How to use the API basically?

To start, you've created file(s)—good! Now, how do you add logic to the API route? Simple!

```javascript
// Import express and declare router
const express = require("express");
const router = express.Router();

// Import middleware
const middleware = require("./middleware");

// Define route with router
router.get("/", async (req, res) => {
    try {
        /* Use try-catch for safety */
        // Your code here
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error!",
            // Handle errors here
        });
    }
});

module.exports = router;
```

> \> **NOTE**: The parameters **req** and **res** are necessary. "**req**" represents the request we send, and "**res**" is what we receive in response (just like any other JavaScript request 😄).
>
> \> Make sure to use "**/**" always. Otherwise, the route will be detected in the console but will be **unusable**.

## Create Protected Routes

If you want to protect a few routes, follow these steps:

1.  Import **middleware**
2.  Use **Express Router**
3.  Add the middleware
4.  **Export** the router

Here's the syntax:

```javascript
const middleware = require("./middleware");

// Past the middleware function (! without "()" !)
router.get("/", middleware, async (req, res) => {
    /* ... */
});

module.exports = router;
```

Afterwards, check out the **[official documentation](https://expressjs.com/fr/)** of the EXPRESS module for more details.
