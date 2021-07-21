# Chirper

NOTE: This repo only contains the front-end of our project. The API used can be found at [dague00/chirp-proj1](https://github.com/dague00/chirp-proj1).

## Project Description

This social media application allows for text "chirps" to be sent for all to see!

## Technologies Used

- React in TypeScript
- Redux

## Features

- Users can signup and login
- Users can post new chirps
- Users can view all existing chirps
- Users can view all chirps by a single user
- Users can set their bio and can view the bios of others
- Users can logout of the application when finished

To-do list:
- Users should be able to include photos in chirps
- Users should be able to like chirps
- Users should be able to comment on chirps
- Users should be able to change profile pictures
- Users should be able to self-validate their emails/username

## Getting Started

To Deploy: Copy the contents of the ```build``` folder to ```/var/www/html``` on a system running Apache webserver.
Please make sure custom ```.htaccess``` files are allowed. Open your browser to the address of your webserver.

To Develop:
- Make sure you have NodeJS installed.
- Clone the repo: ```git clone https://github.com/dague00/chirp-react.git```.
- Run ```npm install``` to get dependencies installed.
- Run ```npm start``` to run the app in development mode. (This should NOT be used for deployment. See above.)

## Usage

NOTE: This iteration requires manual approval of users in Amazon Cognito.
You will need to edit the source code to change the cognito user pool if you would like to use this app.
This is intended to be fixed in version 2 of this software.

- Create a new user. (Again, manual authorization in Amazon Cognito is required.)
  ![Signup Screen](https://github.com/dague00/chirp-react/blob/7db62bcabf333f01137a81222d2b0dfb51ff191f/screenshots/Screen%20Shot%202021-07-21%20at%209.33.38%20AM.png)
- Login using username and password after approval.
  ![Login Screen](https://github.com/dague00/chirp-react/blob/7db62bcabf333f01137a81222d2b0dfb51ff191f/screenshots/Screen%20Shot%202021-07-21%20at%209.33.55%20AM.png)
- Chirps can be viewed on the main page.
  ![Main Page](https://github.com/dague00/chirp-react/blob/7db62bcabf333f01137a81222d2b0dfb51ff191f/screenshots/Screen%20Shot%202021-07-21%20at%209.34.16%20AM.png)
- A single user's chirps may be viewed by clicking their username.
- New chirps can be posted using the box at the top of the page.
- If you click on Settings, you can update your bio or delete your account.
  ![Settings Page](https://github.com/dague00/chirp-react/blob/7db62bcabf333f01137a81222d2b0dfb51ff191f/screenshots/Screen%20Shot%202021-07-21%20at%209.34.37%20AM.png)

## Contributors

- [Daguinson Fleurantin](https://github.com/dague00)
- [Red Oral](https://github.com/redoral)
- [Marc Skwarczynski](https://github.com/marcski55)
- [Caleb Sword](https://github.com/calebmsword)

## License

This project uses the following license: [MIT](https://github.com/dague00/chirp-react/blob/7393fbcd4c13a442eb6f197e7069fc5948fbcbbd/LICENSE).
