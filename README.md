# fitness-wearable

This repository contains the code required to run the webapp and Arduino for the fitness wearable.

## Webapp Files
The top-level directory contains several files that Django requires to run. In order to run the project, manage.py must be run. This directory also contains the polls folder and the fitness_tracker folder, which have the app files and overall web management files respectively.

## fitness_tracker
This folder holds all project code for Django settings and routing, as well as the React code in the fitness_frontend folder.

## fitness_frontend
This folder contains code for the frontend, run through React. The build folder contains the index.html file that is generated as a template by Django.

## polls
This folder contains everything for the app portion of the Django project. This includes the views.py and urls.py for the API portion. This polls app runs as an API.

## Arduino Files
The most important files for the Arduino are Fitness_Tracker.ino and ei-fitnesstracker-arduino-1.0.8.zip.  
ei_fitnesstracker-arduino-1.0.8.zip must be included as a library.  
Fitness_Tracker.ino is the primary Arduino code for the project.
