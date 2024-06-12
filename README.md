# MyFlix Fronted Development with Angular

## Project Description
This project focuses on building the frontend interface for CineVerse using Angular. This application utilizes the MovieAPI endpoints to make calls to the database to create a seamless user experience.

**Key Features**
- **Welcome View:** The app displays a welcome view allowing users to log into an existing account or register.
- **Authentication:** Authenticated users can access and view all movies
- **Single Movie View:** By clicking a movie's display, users can view different information about a single movie. As well as add it to their favorites
- **Profile View:** Users can view their profile information as well as their list of favorite movies.

## Technology Used 
This project was generated with Angular CLI version 10.0.0
- Angular: A web application framework
- Angular Material: A UI component library for Angular applications
- RxJS: A library for reactive programming

## Getting Started
- Clone this repository
- Install all the project dependencies:
    npm install
- Run the command for a dev server and navigate to 'http://localhost:4200/'. The application will automatically reload if you update any information.

## Deployment

Deploy your application to GitHub Pages.

- Create a new repository on GitHub
- In your terminal, run this command (replace `username` and `repository-name` with your data):
       git remote add origin https://github.com/<GitHub-username>/<repository-name>.git
- Add angular-cli-ghpages by running
       ng add angular-cli-ghpages
- To build your application, run the command (replace <repository-name> with your own repository name)
       ng deploy --base-href=/<repository-name>/
- The URL of your application will be then `https://<GitHub-username>.github.io/<repository-name>/`
Whenever you make any changes to your application's code, all you need to do is run the command:
       ng deploy --base-href=/<repository-name>/
