

#ORII

## Table of contents 
1. 🤔 [General Information](#1--general-information)
2. 💻 [Architecture](#2--architecture)
3. 🔗 [Tecnologies](#3--tecnologies)
4. ⚡ [Instalation](#4-%EF%B8%8F-instalation)
7. 🏛 [Academic Institution](#7--academic-institution)
8. 👩‍💻 [Documentation](#8--documentation)

## 1. 🤔 General Information

### ![Web aplication](https://img.shields.io/badge/Web_Aplication-ff69b4)

Our Academic Mobility Management System is a cutting-edge web application designed to streamline and facilitate the process of managing academic mobility programs within educational institutions. This user-friendly platform serves as a comprehensive solution for both administrators and students, offering efficient tools for generating and tracking academic mobility requests.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




## 2. 💻 Architecture
  
  Layered architecture is a pattern used in software development where roles and responsibilities within the application (app) are separated into layers. According to Chapter 1: Layered Architecture in the book Software Architecture Patterns by Mark Richards: “Each layer in the architecture forms an abstraction around the work that needs to be done to satisfy a particular business request.”
  
  
  
  <div align="center">
   <img src="https://ctrly.blog/wp-content/uploads/2021/03/capas-1024x763.png" width="800" height="340">
</div>
  

## 3. 🔗 Tecnologies


| Tecnologies                                                                        | Definition                                                                            |
|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| [![HTML5](https://img.shields.io/badge/HTML5-orange)](https://developer.mozilla.org/en-US/docs/Web/HTML)             | HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript). |
| [![CSS](https://img.shields.io/badge/CSS-blue)](https://developer.mozilla.org/en-US/docs/Web/CSS)                                     | Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media. |
| [![Angular](https://img.shields.io/badge/Angular-red)]() |  |
| [![Bootstrap](https://img.shields.io/badge/Bootstrap-purple)](https://getbootstrap.com/) | Bootstrap is the most popular CSS Framework for developing responsive and mobile-first websites. Bootstrap 5 is the newest version of Bootstrap. |
| [![Angular material](https://img.shields.io/badge/Angular_Material-blue)]() |  | 
| [![Node](https://img.shields.io/badge/Node-green)]() | 

## 4. ⚡️ Instalation

![Local](https://img.shields.io/badge/Local-yellow)

* For the local installation of the project by download, you can do it by the following link: [![Download](https://img.shields.io/badge/Download-green)](https://github.com/GedersonG/DatAnnouncement/archive/refs/heads/main.zip) 

* Go to your Downloads folder on your computer
* Unzip the .zip file named DatAnnouncement-main

![GitHub](https://img.shields.io/badge/GitHub-important)
* Perform a Fork. This will allow you to have a copy of the repository in your own account.

* Cloning the project. By cloning the project into your IDE of choice you can edit and modify it to your liking. Or you can make a Local copy of your new repository.


### ![How to run](https://img.shields.io/badge/How_to_run-blueviolet)

To run the application, it is required to have previously installed:

* Ruby  3.1.4 (https://rubyinstaller.org/downloads/ --> For windows)
   
* PostgreSQL >=14 


To run the project on a terminal:

*  Windows (Install package manager Blundle)
```sh
gem install blunder
```
* Install the Gemfile gems
```sh
bundle install
```
* Create database in development and database in test
```sh
rake db:create
```
* Create tables and relationships DB
```sh
rake db:migrate
```
* Load testing fixtures
```sh
rake db:fixtures:load
```
* Run project
```sh
Rails server
```
Ruta: config/database.yml --> Development and test must have the postgres credentials installed.

![IMPORTANT](https://img.shields.io/badge/IMPORTANT-red): You must make sure that the credentials match your credentials configured in your PosgreSQL in **database.yml**.

```sh
# the same name as the operating system user running Rails.
  username: postgres

  # The password associated with the postgres role (username).
  password: password
  # password: root

```



## Run in Docker

![IMPORTANT](https://img.shields.io/badge/IMPORTANT-red): Before starting the database configuration, you must ensure in the file ./config/database.yml that the assigned host is "db" and not "localhost", both in the development and test environments.

```sh
  host: db 
  # host: localhost
```
### Linux

* Run dockers
```sh
  sudo docker-compose up -d --build
```
* Check status (view ID docker)
```sh
  sudo docker container ps
```
* Exec rake for init DB
```sh
  sudo docker exec -it ID rake db:migrate                          
  sudo docker exec -it ID rake db:fixtures:load
```


### Windows

* Run dockers
```sh
  docker-compose up -d --build
```
* Check status (view ID docker)
```sh
  docker container ps
```
* Exec rake for init DB
```sh
  docker exec -it <ID> rake db:migrate                          
  docker exec -it <ID> rake db:fixtures:load
```


  
## 7. 🏛 Academic Institution
Project developed in the subject PRACTICA EN ING DE SISTEMAS of the [Systems Engineering Program] of the [Universidad Francisco de Paula Santander]

   [Systems Engineering Program]:<https://ingsistemas.cloud.ufps.edu.co/>
   [Universidad Francisco de Paula Santander]:<https://ww2.ufps.edu.co/>
 
 <div align="center">
   <img src="https://ingsistemas.cloud.ufps.edu.co/rsc/img/logo_vertical_ingsistemas_ht180.png" width="400" height="130">
</div>

  
## 8. 👩‍💻 Documentation

[![Documentation](https://img.shields.io/badge/Documentaci%C3%B3n-blueviolet)](https://docs.google.com/document/d/1-ztj2LCm-sJa1J3FEBkTgmoJWWY3vL13iFOdEn__Mnw/edit?usp=sharing)

  



