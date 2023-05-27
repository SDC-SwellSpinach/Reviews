# reviews
Creating backend server and DB for calls to reviews module

In order to use this app. Please install postgresql in your local computer.
  1. Create a reviews database in the postgres shell.
  2. Run the etl.sql file with this command to create tables needed
    for this command to work you need to be at the parent directory of file
    level in your terminal or find the correct path from where you are
    to etl.sql.
    Please change <username> to your appropriate username.

      psql -U <username> reviews < etl.sql

  3. You may then transfer data from CSV files to your reviews database tables
    by running copydata.sql which again this command should be run from the parent
    level or you need to change the file name at end of command to the path from where
    you are in the terminal.
    Please change <username> to your appropriate username.

      psql -U <username> reviews < copydata.sql

  4. Your reviews database should now be seeded with data from the CSV files.