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
   - Update the database connection details if needed in `db.js` (or wherever your connection logic resides).

## Configuration

The project uses Mongoose to interact with MongoDB. Update the MongoDB connection settings in `connectDB` and `disconnectDB` functions located in `index.js` or wherever you define your database connection.

## Commands

### 1. `add` (`a`)

This command allows you to add a new auction item to the database. You will be prompted to enter the following details:

- Title
- Description
- Start Price
- Reserve Price

**Usage**:
```bash
node commends.js add
```

You will be prompted to fill in the details for the auction item.

**Example**:

```bash
Enter item title: Vintage Chair
Enter item description: A beautiful vintage chair in excellent condition.
Enter start price: 50
Enter reserve price: 100
Successfully added auction item: { id, title, description, start_price, reserve_price }
```

### 2. `find` (`f`)

This command allows you to search for auction items by title or description. You will be prompted to enter a search term, and the system will display matching auction items.

**Usage**:
```bash
node commends.js find
```

**Example**:

```bash
Enter search term: Vintage
Found items:
- Vintage Chair
- Vintage Table
```

### 3. `update <id>` (`u`)

This command allows you to update an auction item by providing its unique `ID`. You will be prompted to update the following fields:

- Title
- Description
- Start Price
- Reserve Price

**Usage**:
```bash
node commends.js update <id>
```

Replace `<id>` with the actual ID of the auction item you want to update.

**Example**:

```bash
node commends.js update 60c72b2f9e1d4f2d2c3e4b55
```

This will prompt you to enter new values for the fields, and update the item in the database.

### 4. `delete <id>` (`d`)

This command allows you to delete an auction item by its unique `ID`.

**Usage**:
```bash
node commends.js delete <id>
```

Replace `<id>` with the actual ID of the auction item you want to delete.

**Example**:

```bash
node commends.js delete 60c72b2f9e1d4f2d2c3e4b55
```

This will delete the item with the given ID.

## Code Overview

### 1. **`addAuctionItem`**

This function adds a new auction item to the MongoDB database. It accepts an object containing the item details (title, description, start price, and reserve price) and saves it to the database.

### 2. **`findAuctionItem`**

This function allows you to search for auction items based on a search term. It queries the database for items whose title or description matches the provided search term.

### 3. **`updateAuctionItem`**

This function updates the details of an auction item by its unique `ID`. It takes the item ID and the updated data as input and updates the corresponding fields in the database.

### 4. **`deleteAuctionItem`**

This function deletes an auction item from the database based on its unique `ID`.

### 5. **Database Connection (`connectDB` and `disconnectDB`)**

These functions handle the connection to and disconnection from the MongoDB database. Make sure that MongoDB is running before executing any commands that require database interaction.

### 6. **CLI with `Commander.js`**

The CLI is built using the `commander` library, which allows defining commands and their actions in a simple and intuitive manner. Each command (add, find, update, delete) is linked to its respective functionality.

### 7. **User Prompts with `Inquirer.js`**

The `inquirer` library is used to prompt the user for inputs such as item details (title, description, etc.) when adding or updating an auction item. It ensures that the user inputs are validated (e.g., non-empty descriptions, valid prices).

## Error Handling

- **Invalid ID Format**: If an invalid ID format is provided during the `update` or `delete` command, the program will output `Invalid ID format` and exit with an error code.
- **Database Errors**: Any errors related to database operations (e.g., failed updates, deletions, or connections) will result in an appropriate error message.
- **Item Not Found**: If an update or delete operation is attempted on an item that does not exist, an error message will be displayed.

## Example Error Output

If an invalid ID is passed:
```
Invalid ID format
```

If no items are found during a search:
```
No items found
```



