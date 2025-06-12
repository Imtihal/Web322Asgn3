/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Imtihal Uddin Student ID: 178833232 Date: 5/30/2025
*
********************************************************************************/

const express = require('express');
const app = express();
const path = require('path');
const projectData = require("./modules/projects");
const HTTP_PORT = process.env.port || 8080;


app.use(express.static('public'));

projectData.initialize()
    .then(() => {

        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "views", "home.html"));
        });

        app.get("/about", (req, res) => {
            res.sendFile(path.join(__dirname, "views", "about.html"));
        });

        app.get("/solutions/projects", (req, res) => {
            const { sector } = req.query;

            if (sector) {
                projectData.getProjectsBySector(sector)
                    .then(projects => res.json(projects))
                    .catch(err => res.status(404).send(err));
            } else {
                projectData.getAllProjects()
                    .then(projects => res.json(projects))
                    .catch(err => res.status(404).send(err));
            }
        });

        app.get("/solutions/projects/:id", (req, res) => {
            const projectID = parseInt(req.params.id);

            projectData.getProjectByID(projectID)
                .then(project => res.json(project))
                .catch(err => res.status(404).send(err));
        });

        app.use((req, res) => {
            res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
        });

        app.listen(HTTP_PORT, () => {
            console.log(`Server is running on port ${HTTP_PORT}`);
        });

    })
    .catch(err => {
        console.log("Failed to initialize project data:", err);
    });