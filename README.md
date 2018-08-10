# resdiary-plugin

* Each subsite has it's own text file in textTemplates, ex: feast.js, prince.js, greenhouse.js
* When you make changes to any of these files you have to build the file by running (from /src)
    - npm run build:prince
    - npm run build:feast
    - npm run build:greenhouse
   
   This will generate the file used in Incipio (in each child theme's functions.php file), for exmaple: resdiary-booking-plugin-prince.min.js
    
    
