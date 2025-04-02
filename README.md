# Auction Item Manager CLI

Auction Item Manager is a command-line tool built with Node.js, Mongoose, and Commander.js to manage auction items in a MongoDB database. This tool provides functionality to add, find, update, and delete auction items through an intuitive CLI interface.

## Features

- **Add Auction Item**: Add a new auction item with title, description, start price, and reserve price.
- **Find Auction Items**: Search for auction items by title or description.
- **Update Auction Item**: Update the details of an existing auction item by its unique ID.
- **Delete Auction Item**: Delete an auction item by its unique ID.
- **MongoDB Integration**: Use MongoDB for persistent storage of auction items.
- **Command Line Interface**: Provides simple CLI commands for interacting with the auction items.

## Requirements

- **Node.js**: v12 or higher
- **MongoDB**: Local or remote MongoDB instance
- **npm**: Package manager for dependencies

## Installation

1. **Clone this repository**:
    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up MongoDB**:
    - Ensure that MongoDB is running locally or remotely.
    - Update the database connection details in your environment variables `.env`.

4. **Create a `.env` file**:
    - In the root directory of the project, create a `.env` file with the following content:
    ```env
    MONGODB_URI=mongodb://localhost:27017/auction
    PORT=3000
    ```

## API Endpoints

### Localhost API Access

The following endpoints are available to interact with the Auction Items in your local MongoDB instance:

1. **POST /** — Add a new auction item

   **Request Body**:
   ```json
   {
     "title": "Vintage Chair",
     "description": "A beautiful vintage chair in excellent condition.",
     "start_price": 50,
     "reserve_price": 100
   }
   ```

   **Response**:
   ```json
   {
     "id": "60c72b2f9e1d4f2d2c3e4b55",
     "title": "Vintage Chair",
     "description": "A beautiful vintage chair in excellent condition.",
     "start_price": 50,
     "reserve_price": 100
   }
   ```

   **Usage**:
   ```bash
   POST http://localhost:3000/
   ```

2. **GET /items** — Get all auction items

   **Response**:
   ```json
   [
     {
       "id": "60c72b2f9e1d4f2d2c3e4b55",
       "title": "Vintage Chair",
       "description": "A beautiful vintage chair in excellent condition.",
       "start_price": 50,
       "reserve_price": 100
     }
   ]
   ```

   **Usage**:
   ```bash
   GET http://localhost:3000/items
   ```

3. **GET /search?keywords=<search_term>** — Search auction items by title or description

   **Query Parameter**:
   - `keywords`: The term you want to search in item titles or descriptions.

   **Usage**:
   ```bash
   GET http://localhost:3000/search?keywords=vintage
   ```

4. **PUT /update/:id** — Update an auction item by its unique ID

   **Request Body**:
   ```json
   {
     "title": "Vintage Chair - Updated",
     "description": "A vintage chair with a fresh coat of paint.",
     "start_price": 60,
     "reserve_price": 120
   }
   ```

   **Usage**:
   ```bash
   PUT http://localhost:3000/update/<id>
   ```

5. **DELETE /delete/:id** — Delete an auction item by its unique ID

   **Usage**:
   ```bash
   DELETE http://localhost:3000/delete/<id>
   ```

## Commands

You can use the following commands via the command-line interface to manage the auction items:

### 1. **add (a)**

Add a new auction item. You'll be prompted to enter the following details:
- Title
- Description
- Start Price
- Reserve Price

Usage:
```bash
node commends.js add
```

Example:
```
Enter item title: Vintage Chair
Enter item description: A beautiful vintage chair in excellent condition.
Enter start price: 50
Enter reserve price: 100
Successfully added auction item: { id, title, description, start_price, reserve_price }
```

### 2. **find (f)**

Search for auction items by title or description. You'll be prompted to enter a search term.

Usage:
```bash
node commends.js find
```

Example:
```
Enter search term: Vintage
Found items:
- Vintage Chair
- Vintage Table
```

### 3. **update <id> (u)**

Update an auction item by its unique ID. You'll be prompted to update the following fields:
- Title
- Description
- Start Price
- Reserve Price

Usage:
```bash
node commends.js update <id>
```

Example:
```bash
node commends.js update 60c72b2f9e1d4f2d2c3e4b55
```

### 4. **delete <id> (d)**

Delete an auction item by its unique ID.

Usage:
```bash
node commends.js delete <id>
```

Example:
```bash
node commends.js delete 60c72b2f9e1d4f2d2c3e4b55
```

## Code Overview

### 1. **addAuctionItem**

Adds a new auction item to the MongoDB database. It accepts an object containing the item details (title, description, start price, and reserve price) and saves it to the database.

### 2. **findAuctionItem**

Allows you to search for auction items based on a search term. It queries the database for items whose title or description matches the provided search term.

### 3. **updateAuctionItem**

Updates the details of an auction item by its unique ID. It takes the item ID and the updated data as input and updates the corresponding fields in the database.

### 4. **deleteAuctionItem**

Deletes an auction item from the database based on its unique ID.

### 5. **Database Connection (connectDB and disconnectDB)**

Handles the connection to and disconnection from the MongoDB database. Make sure that MongoDB is running before executing any commands that require database interaction.

### 6. **CLI with Commander.js**

The CLI is built using the Commander.js library, which allows defining commands and their actions in a simple and intuitive manner. Each command (add, find, update, delete) is linked to its respective functionality.

### 7. **User Prompts with Inquirer.js**

The Inquirer.js library is used to prompt the user for inputs such as item details (title, description, etc.) when adding or updating an auction item. It ensures that the user inputs are validated (e.g., non-empty descriptions, valid prices).

## Error Handling

- **Invalid ID Format**: If an invalid ID format is provided during the update or delete command, the program will output **Invalid ID format** and exit with an error code.
- **Database Errors**: Any errors related to database operations (e.g., failed updates, deletions, or connections) will result in an appropriate error message.
- **Item Not Found**: If an update or delete operation is attempted on an item that does not exist, an error message will be displayed.

## Example Error Output

If an invalid ID is passed:
```bash
Invalid ID format
```
If no items are found during a search:
```bash
No items found
