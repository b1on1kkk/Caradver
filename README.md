# Caradver
Caradver - is a web-application for booking and renting luxury cars in a few minutes!

![image](https://github.com/b1on1kkk/Caradver/assets/114521829/13d4f385-8070-43e7-b221-fffe1d8136f5)

## Description
Caradver can be rival for all renting oriented platforms. Caradver offers not only renting, but also possibility to book service in our location and repair you car!

## Tech stack
MySQL database (phpmyadmin), Vite + React + TypeScript, Node JS + Express JS + TypeScript, Tailwind CSS

## How and Where data is stored?
Data is stored in MySQL database, where tables as users, booked_cars and booked_services are connected with each other.
![image](https://github.com/b1on1kkk/Caradver/assets/114521829/9f21aa8b-8203-4574-8b04-0c0338634ae1)

users -> booked_cars connected with each other in one-to-one relationship, because in policy of our web-application
you can book only one car.

users -> booked_service connected with each other in one-to-many relationship. In this way you can book more than one
service.
