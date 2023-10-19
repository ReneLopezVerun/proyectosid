# Installation

## Virtual enviroments
Use a virtual enviroment to manage the dependencies for this project, both in
development and in production.

### Create an enviroment
Create a ```.venv``` folder:
```bash
py -3 -m venv .venv
```

### Activate the environment
Before you work on the project, activate the corresponding environment:
```bash
.venv\Script\activate
```

### Deactivate the environment
Once you are done working on the project, you can deactivate the corresponding environment:
```bash
deactivate
``` 

### Install Flask and project dependencies
Within the activated environment, use the following command to install Flask and project dependencies:
```bash
pip install -r requirements.txt
```

# Run

### Quickstart
To run the application, use ```flask``` command or ```python -m flask```. You need to tell the Flask where the application is with the ```--app``` option.
```bash
flask --app app run
```

### Debug mode
The ```flask run``` command can do more than just start the development server. By enabling debug mode, the server will automatically reaload if code changes, and will show an interactive debugger in the browser if an error occurs during a request.

To enable debug mode, use the ```--debug``` option.
```bash
flask --app app run --debug
```