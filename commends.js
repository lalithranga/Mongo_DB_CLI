import { Command } from 'commander';
import inquirer from 'inquirer';
import mongoose from 'mongoose';
import { addAuctionItem, findAuctionItem, updateAuctionItem, deleteAuctionItem, connectDB, disconnectDB } from './index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Auction Item Manager');

const questions = [	
  {
    type: 'input',
    name: 'title',  // Changed from item_title
    message: 'Enter item title:',
    validate: input => input.length >= 3 ? true : 'Title must be at least 3 characters'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter item description:',
    validate: input => input.trim() ? true : 'Description is required'
  },
  {
    type: 'number',
    name: 'start_price',
    message: 'Enter start price:',
    validate: input => input >= 0 ? true : 'Price must be non-negative'
  },
  {
    type: 'number',
    name: 'reserve_price',
    message: 'Enter reserve price:',
    validate: (input, answers) => {
      if (input < 0) return 'Price must be non-negative';
    
      return true;
    }
  }
];

program
  .command('add')
  .alias('a')
  .description('Add an auction item')
  .action(async () => {
    try {
      await connectDB();
      const answers = await inquirer.prompt(questions);
      const result = await addAuctionItem(answers);
      console.log('Successfully added auction item:', result);
      await disconnectDB();
      process.exit(0);
    } catch (error) {
      console.error('Error adding item:', error.message);
      await disconnectDB();
      process.exit(1);
    }
  });

program
  .command('find')
  .alias('f')
  .description('Find auction items by title or description')
  .action(async () => {
    try {
      await connectDB();
      const { search } = await inquirer.prompt([
        {
          type: 'input',
          name: 'search',
          message: 'Enter search term:',
        }
      ]);
      const items = await findAuctionItem(search);
      if (items.length === 0) {
        console.log('No items found');
      } else {
        console.log('Found items:', items);
      }
      await disconnectDB();
      process.exit(0);
    } catch (error) {
      console.error('Error finding items:', error.message);
      await disconnectDB();
      process.exit(1);
    }
  });

// Command to update an auction item
program
  .command('update <id>')
  .alias('u')
  .description('Update an auction item')
  .action(async (id) => {
    try {
      await connectDB();
      // Validate MongoDB ObjectId using mongoose.isValidObjectId
      if (!mongoose.isValidObjectId(id)) {
        console.error('Invalid ID format');
        await disconnectDB();
        process.exit(1);
      }

      const answers = await inquirer.prompt(questions);
      try {
        const result = await updateAuctionItem(id, answers);
        if (!result) {
          console.log('Item not found');
        } else {
          console.log('Successfully updated auction item:', result);
        }
      } catch (err) {
        console.error('Error updating item:', err.message);
      }
      
      await disconnectDB();
      process.exit(0);
    } catch (error) {
      console.error('Error:', error.message);
      await disconnectDB();
      process.exit(1);
    }
  });

program
  .command('delete <id>')
  .alias('d')
  .description('Delete an auction item')
  .action(async (id) => {
    try {
      await connectDB();
      const result = await deleteAuctionItem(id);
      console.log('Successfully deleted auction item:', result);
      await disconnectDB();
      process.exit(0);
    } catch (error) {
      console.error('Error deleting item:', error.message);
      await disconnectDB();
      process.exit(1);
    }
  });
  
program.parse(process.argv);