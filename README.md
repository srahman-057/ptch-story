# ptch-blog

ptch-blog is a modular blog that serves as a passion project. The project is deployed at: <u><a href="https://www.pothochari.com/">www.pothochari.com</a></u></p>

## Under the hood

This project utilizes the following:

* <u>Backend</u>: PostgreSQL, NodeJS/ExpressJS
* <u>Frontend</u>: React, Typescript, TailwindCSS
* <u>Bundler</u>: Vite

## Build/Deployment

<u>NPM Packages:</u>
Execute the command ```npm i``` in the 'backend/' directory to build the backend modules. Repeat the process in the frontend directory for the frontend modules.

<u>Project Build/Deployment:</u>
Executing ```npm run dev``` inside the frontend folder will intruct the Typescript compiler to perform type checking and error detection without generating any output files, and then trigger a <b>Vite</b> build process which will output an optimized static application bundle into the newly created <b><i>'frontend/dist/'</i></b> directory. This output is suitable for deployment on any static hosting service. 

As a personal choice, Vercel has been selected as the deployment platform for this project. Any repository changes automatically trigger new deployments separately for the frontend and the backend. However, the frontend involves an additional step for proper vercel deployment configuration that will be explained below. 

The frontend is a Single Page Application (SPA) where client-side routing is used. This leads to a specific complication: direct access to specific paths will result in a 404 error since Vercel will not find a corresponding physical file. A rewrite can route all non-existent paths back to the main index.html file, allowing the client-side router to take over and render the correct content. This has been handled in the <b><i>vercel.json</i></b> file in the root of the frontend directory. 

## Running the project

Two .env files are needed for the project to work - one for the frontend and one for the backend. The values to be included in these files are:
* '/backend/': 
    * <i><b>DATABASE_URL</b></i>: The URL of your database 
    * <i><b>ARCJET_KEY</b></i>: Arcjet provided API key
    * <i><b>ORIGIN_URL</b></i>: URL of the frontend. CORS policy will block requests from any other origin.
    * <i><b>REDIS_REST_URL</b></i>: First half of Redis Key: <b>URL</b> + Token.
    * <i><b>REDIS_REST_TOKEN</b></i>: Second half of Redis Key: URL + <b>Token</b>.
     
    REDIS_REST_TOKEN 
    
* '/frontend/':
    * <i><b>VITE_API_URL</b></i>: URL of the Node backend in this project.
    * <i><b>VITE_FRONTEND_URL</b></i>: URL of the Vite frontend in this project. 

Execute ```npm run dev``` in the 'backend/' and 'frontend/' directories respectively. This will start up the ExpressJS backend and ReactJS frontend. 

## Documentation

The blog is built with a mobile-first approach, with a default dark theme. A planned lightweight but feature-rich control panel is meant to make blog management a breeze.

## Future improvements

* <u>Theme</u>: Button to toggle between Dark Mode and Light Mode.  
* <u>Management</u>: An admin page that will simplify management by adding a layer of abstraction.
* <u>Search</u>: Build index and deploy search engine. 
* <u>Calendar</u>: Interactive calendar that allows users to filter posts by date.

## Acknowledgement

* Icons: <a href="https://www.flaticon.com/free-icons/fire" title="fire icons"><u>Freepik - Flaticon</u></a>
* Fonts: 
    * Megrim: <u>https://fonts.google.com/specimen/Megrim</u>
    * Jockey One: <u>https://fonts.google.com/specimen/Jockey+One<u>
