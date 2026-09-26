let allApplications = [];

const API_URL = "/api/applications";


const form = document.getElementById("applicationForm");

const applicationsDiv = document.getElementById("applications");



// Fetch applications

async function getApplications(){

    const response = await fetch(API_URL);

    const data = await response.json();

    allApplications = data;

    displayApplications(data);

    updateDashboard(data);

}



// Display applications

function displayApplications(applications){

    applicationsDiv.innerHTML = "";


    applications.forEach(app => {


        const div = document.createElement("div");

        div.className = "application-card";


        div.innerHTML = `

        <h3>${app.company}</h3>

        <p><b>Role:</b> ${app.role}</p>

        <p><b>Location:</b> ${app.location || "N/A"}</p>

        <p><b>Status:</b> ${app.status}</p>

        <p><b>Date:</b> ${app.application_date || "N/A"}</p>


        <button
onclick="editApplication(${app.id})">

Edit

</button>


<button 
class="delete-btn"
onclick="deleteApplication(${app.id})">

Delete

</button>

        `;


        applicationsDiv.appendChild(div);


    });

}




// Add application

form.addEventListener("submit", async(e)=>{


    e.preventDefault();



    const application = {


        company:
        document.getElementById("company").value,


        role:
        document.getElementById("role").value,


        location:
        document.getElementById("location").value,


        application_date:
        document.getElementById("date").value,


        status:
        document.getElementById("status").value,


        job_link:
        document.getElementById("link").value,


        notes:
        document.getElementById("notes").value


    };

    const editId = form.dataset.editId;


if(editId){


    await fetch(`${API_URL}/${editId}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(application)

    });


    delete form.dataset.editId;


    form.reset();

    getApplications();

    return;


}

    await fetch(API_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(application)

    });



    form.reset();


    getApplications();


});





// Delete application

async function deleteApplication(id){


    await fetch(`${API_URL}/${id}`,{

        method:"DELETE"

    });


    getApplications();

}





// Dashboard counts

function updateDashboard(applications){


    document.getElementById("total").innerText =
    applications.length;


    document.getElementById("applied").innerText =
    applications.filter(a=>a.status==="Applied").length;


    document.getElementById("interview").innerText =
    applications.filter(a=>a.status==="Interview").length;


    document.getElementById("offer").innerText =
    applications.filter(a=>a.status==="Offer").length;


    document.getElementById("rejected").innerText =
    applications.filter(a=>a.status==="Rejected").length;


}





getApplications();


document
.getElementById("search")
.addEventListener("input", filterApplications);



document
.getElementById("filterStatus")
.addEventListener("change", filterApplications);



function filterApplications(){


    const searchText =
    document.getElementById("search").value.toLowerCase();


    const status =
    document.getElementById("filterStatus").value;



    const filtered =
    allApplications.filter(app=>{


        const matchesSearch =
        app.company.toLowerCase().includes(searchText)
        ||
        app.role.toLowerCase().includes(searchText);



        const matchesStatus =
        status==="All"
        ||
        app.status===status;



        return matchesSearch && matchesStatus;


    });



    displayApplications(filtered);


}

function editApplication(id){


    const app = allApplications.find(
        item => item.id === id
    );


    document.getElementById("company").value =
    app.company;


    document.getElementById("role").value =
    app.role;


    document.getElementById("location").value =
    app.location;


    document.getElementById("date").value =
    app.application_date;


    document.getElementById("status").value =
    app.status;


    document.getElementById("link").value =
    app.job_link;


    document.getElementById("notes").value =
    app.notes;


    form.dataset.editId = id;


}