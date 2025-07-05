/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Imtihal Uddin Student ID: 178833232 Date: 6/11/2025

Public URL: https://web322-asgn3.vercel.app/
*
********************************************************************************/

const express = require('express');
const app = express();
const path = require('path');
const projectData = require("./modules/projects");
const HTTP_PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

projectData.initialize()
    .then(() => {

        app.set('views', __dirname + '/views');

        app.get("/", (req, res) => {
            res.render("home", { page: "/" });
        });

        app.get("/about", (req, res) => {
            res.render("about", { page: "/about" });
        });

        app.get("/solutions/projects", (req, res) => {
            const { sector } = req.query;

            if (sector) {
                projectData.getProjectsBySector(sector)
                .then(projects => {
                    if (projects.length === 0) {
                        res.status(404).render("404", { message: `Sorry, projects for sector "${sector} was not found"` });
                    } else {
                        res.render("projects", { projects });
                    }
                })
                .catch(() => res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for" }));
            } else {
                projectData.getAllProjects()
                .then(projects => res.render("projects", { projects }))
                .catch(() => res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for" }));
            }
        });

        app.get("/solutions/projects/:id", (req, res) => {
            const projectID = parseInt(req.params.id);
            projectData.getProjectByID(projectID)
            .then(project => {
                if (!project) {
                    res.status(404).render("404", { message: `Sorry, project with ID ${projectID} not found.` });
                } else {
                res.render("project", { project });
                }
            })
                .catch(() => res.status(404).render("404", { message: `Sorry, project with ID ${projectID} not found.` }));
        });

        app.use((req, res) => {
            res.status(404).render("404", { message: "Sorry, the page you are looking for does not exist." });
        });

        app.listen(HTTP_PORT, () => {
            console.log(`Server is running on port ${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.log("Failed to initialize project data:", err);
    });