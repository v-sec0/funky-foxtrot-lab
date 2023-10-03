$(document).ready(function() {
    console.log("Ready to rumble!");
    
    // Variables 
    const container = $("#about-skills-row");

    // Getting skills.json
    fetch("./scripts/skills.json")
        .then(response =>  response.json())
        .then(data => {
            
            const container = $("#about-skills-row");
            let htmlContent = '';

            data.forEach(section => {
                const skills = section.skills.map(skill => `${skill}<br>`).join('');
                
                htmlContent += `
                    <div class="col-lg-4 mb-5">
                        <div class="card">
                            <div class="card-body bg-dark">
                                <h5 class="card-title em-${section.color}">${section.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${section.subheading}</h6>
                                <p class="card-text">${skills}</p>
                            </div>
                        </div>
                    </div>
                `;
                console.log("Loop done!");
                console.log(htmlContent);
            });

            console.log(container.html());
            container.html(htmlContent);

        })
        .catch(error => {
            console.log("There was a fetch error");
        });
});
