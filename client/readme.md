# This is the core of an AngularJS Application
To build the app run:
```
    gulp build
```
Clean out all the files from /build/
This will join the js files and place the result in /build/js/app.js
Then compile the css and place it in /build//stylescore.less
Then copy all the html from src to build in their relative directory.
The copy all the assets from /src/assets to /build/assets
It will also copy the specified angular and angular-ui-router js files to /build/js/lib/

To just clean out build run:
```
    gulp clean
```

## Directory Layout
```
|- Client
    |- src
        |- index.html
        |- js
            |-module
                |- controllers
                |- directives
                |- services
                |- paritals
        |- less
        |- lib
        |- assets
            |- fonts
            |- images
    |- build
        |-index.html
        |- js
            |- modules
                |- paritals
        |- css
        |- lib
        |- assets
            |- fonts
            |- images
```
