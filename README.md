# madlab-media-browser

 A locally hosted web-based browser of media on a server

## Why did I make this?

 I wanted a small challenge doing something I've wanted to add to my home network for a long time, which to me means not using an existing solution.

 I also really didn't want/need to use something that would be totally overkill to just allow my family easy access to things over our network.

## Aims

- Allow users to browse folders in a shared directory and download individual files
- Allow users to request folders to be zipped up so their contents can be downloaded as a single file, rather than having to download each file individually
- Code should not be bloated with unnecessary dependencies

## Why there isn't any frontend library/framework

 One of my aims was to not use any unnecessary dependencies, and in my opinion for this project this includes frontend projects like React or Vue etc etc. This project really doesn't need a `create-react-app` (or equivalent, or just initialising a new project) sitting in front of the API to display a page that is essentially a list of links to folders or individual files:

- There is barely any state to manage (zip requests are really the only thing)
- Only want to serve HTML + CSS, so no need for a transpiler, a bundler or any similar tooling
- No need to add additional size to the request sent to any client browsers

 So instead, this project is creating the HTML of the pages and returning this to the client in it's response to any requests. I'm sure it could be using a templating engine (like Pug) instead, but that would also just be adding something to the project that I feel goes against my aims! Maybe I'm crazy, but tbh you are welcome to fork the project and add your own frontend if you wish ;)

## TODO

- Make shared folder value configurable instead of hardcoded
- Split up the page rendering so the common parts of pages are called from generic functions instead of repeated in each rendering function
- Add some actual styling instead of plain HTML
- Only allow top-level folders to be added as a zip request
- Don't add a zip request if the folder has already been zipped
- Add zip request management page
- Add links on home page to other locally hosted services
