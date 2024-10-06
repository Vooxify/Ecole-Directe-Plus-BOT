# Console Codes

| Codes     | Meaning     |
| --------- | ----------- |
| **"[!]"** | Error       |
| **"[+]"** | Warning     |
| **"[*]"** | Information |

# API

Here, I will explain how the API works for safe usage. The API is well-designed because it is based on the Route File system (yes, I made up this term, why not :-) ). To explain this simply, when you create a directory in the `./api/` folder, it is transformed into an API route.

## How to create routes?

As I mentioned earlier, you need to create a directory in the `./api/` folder. Then, create a file with the following names based on the method you need:

-   `"post.route.js"` for the POST method
-   `"get.route.js"` for the GET method

> **NOTE**: When you create routes, you can also create subfolders, and it will work as well (as long as there is a file inside xD). You can access it here: **example:** `./api/your/subfolder/get.route.js` > `http://localhost:XXXX/your/subfolder`

## How to use the API basically?
