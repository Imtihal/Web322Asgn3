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

const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = [];
            projectData.forEach(function (projec) {

                let sectorName = "Unknown";
                for (let i = 0; i < sectorData.length; i++) {
                if (sectorData[i].id === projec.sector_id) {
                    sectorName = sectorData[i].sector_name;
                    break;
                }
            }

            let theProject = {
                id: projec.id,
                sector_id: projec.sector_id,
                title: projec.title,
                feature_img_url: projec.feature_img_url,
                intro_short: projec.intro_short,
                impact: projec.impact,
                original_source_url: projec.original_source_url,
                sector: sectorName
            };

        projects.push(theProject);
        });
                
        resolve();
    } 
    catch (err) {
        reject("Could not intialize the projects data");
    }
});
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        if(projects.length > 0) {
            resolve(projects);
        }
        else {
            reject ("Projects not found");
        }
    });
}

function getProjectByID(projectId) {
    return new Promise((resolve, reject) => {
        const project = projects.find(pro => pro.id === projectId);
        project ? resolve(project) : reject("Project wasn't found");
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const lower = sector.toLowerCase();

        const results = projects.filter(pro => pro.sector.toLowerCase().includes(lower)
    );

    results.length > 0 ? resolve(results) : reject("There are no projects for this sector")
    })    
}

module.exports = {
    initialize,
    getAllProjects,
    getProjectByID,
    getProjectsBySector
};
