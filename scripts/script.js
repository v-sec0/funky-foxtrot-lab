$(document).ready(function() {
    console.log("Ready to rumble")

    async function getData() {
        // Making two fetch request for .json files
        const experienceURL = "./scripts/data/experience.json"
        const skillsURL = "./scripts/data/skills.json"

       // Collectings responses for each request in a collective array 
        const response_array = await Promise.all([fetch(experienceURL), fetch(skillsURL)])

        const reponse_exp = await response_array[0].json()
        const response_skills = await response_array[1].json()

        console.log("Retrieved Data")
       return [reponse_exp, response_skills]
    }

    // Working with the returned data and constructing HTML elements
    getData()
        .then(([experience_data, skill_data]) => {
        
            // Working with my experience first
            const experience_container = $("#about-experience-row")
            let expHTML = ''

            // Dynamically resizing card sizes based on number of objects
            const numJobs = experience_data.length
            console.log("Number of jobs: ", numJobs)

            // Looping through the array to get each object (Job)
            experience_data.forEach(job => {
    
                // Building a Bootstrap card for each job
                expHTML += `
                    <div class="col-lg-${12/numJobs} mb-5"
                        <div class="card">
                            <div class="card-body bg-dark">
                                <h5 class="card-title"><span class="em-purple">${job.employer}</span> - <span class="em-blue">${job.role}</span></h5>
                                <h6 class="card-subtitle mb-2 text-muted">${job.dates}</h6>
                                <p class="card-text">${job.duties}</p>
                            </div>
                        </div>
                    </div>
                `;
                console.log("Loop cycle done!");
            });

            // Adding completed HTML to DOM
            experience_container.html(expHTML)

            // --------------------------------------------------------------------------------------------

            // Exact same thing but for my skill;s
            const skill_container = $("#about-skills-row")
            let skillHTML = ''

            // Dynamically resizing card sizes based on number of objects
            const numSkills = skill_data.length
            console.log("Number of skill categories: ", numSkills)

            // Looping through the array to get each object (Skill Category)
            skill_data.forEach(skill_cat => {
    
                // Combining my skills into one giant string
                const skills = skill_cat.skills.map(skill => `${skill}<br>`).join('');

                // Building a Bootstrap card for each skill category
                skillHTML += `
                    <div class="col-lg-${12/numSkills} mb-5"
                        <div class="card">
                            <div class="card-body bg-dark">
                                <h5 class="card-title em-${skill_cat.color}">${skill_cat.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${skill_cat.subheading}</h6>
                                <p class="card-text">${skills}</p>
                            </div>
                        </div>
                    </div>
                `;
                console.log("Loop cycle done!");
            });
            
            // Adding completed HTML to DOM
            skill_container.html(skillHTML)           

        })
        .catch(error => {
            console.error("Error:", error)
        });
});