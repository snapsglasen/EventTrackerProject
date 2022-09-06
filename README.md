### EventTrackerProject

## Overview

This app tracks the end of my family's holiday season in 2022; specifically, this app tracks the data for matsuri names, reason for celebration, whether presents are given or not, food served, and the date. It allows the user to view a list of all matsuris (holidays or festivals), view a single matsuri by ID number, update or delete an already existing matsuri, or create a brand new matsuri.

## REST Endpoints

| HTTP Verb | URI                      | Request Body              | Response Body  | Purpose |
|-----------|--------------------------|---------------------------|----------------|---------|
| GET       | `/api/matsuris`          |                           | List of Matsuris| **List** or **collection** endpoint |
| GET       | `/api/matsuris/{id}`     |                           | Single Matsuri  | **Retrieve** endpoint |
| POST      | `/api/matsuris`          | JSON for a new Matsuri    | Created matsuri | **Create** endpoint |
| PATCH     | `/api/matsuris/{id}`     | JSON for updating Matsuri | Updated matsuri | **Replace** endpoint |
| DELETE    | `/api/matsuris/{id}`     |                           |                 | **Delete** route |


##URL
54.219.13.112:8080/MatsuriTracker/

## Tech Used
Java, JPA, MySql Workbench, Postman, SpringBoot, REST

## Lessons Learned
This project gave me a first person view on how REST works with a simple table, while also showing how much less verbose it is to work with over using a DAO and JSPs.
