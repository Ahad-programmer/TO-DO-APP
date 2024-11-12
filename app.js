// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbuIsHiFvb-Hp0AGYJ-X1xtSPEZyRQlVU",
    authDomain: "to-do-app-34577.firebaseapp.com",
    databaseURL: "https://to-do-app-34577-default-rtdb.firebaseio.com",
    projectId: "to-do-app-34577",
    storageBucket: "to-do-app-34577.appspot.com", // Corrected storage URL
    messagingSenderId: "955069515977",
    appId: "1:955069515977:web:d05b80db19fe7cbf7e2518"
};

// Firebase ko initialize karna (sahi tareeqa)
firebase.initializeApp(firebaseConfig);

// Database reference banana
const dbRef = firebase.database().ref("tasks");



var ulElement = document.getElementById("list")

function addTodo() {
    var input = document.getElementById("input");

    if (input.value) {
        
        dbRef.push({
            task: input.value,
            completed: false        });

        input.value = ""; 
    } else {
        alert("Please enter a task!");
    }
}



function displayTasks() {
    dbRef.on("value", (snapshot) => {
        ulElement.innerHTML = ""; 
        const data = snapshot.val();

        for (let key in data) {
            const task = data[key];

          
            var liElement = document.createElement("li");
            liElement.setAttribute("data-key", key);

            var liText = document.createTextNode(task.task);
            liElement.appendChild(liText);

            var dlt = document.createElement("button");
            dlt.innerText = "Delete";
            dlt.setAttribute("onclick", "deleteTask(this)");
            dlt.className = "delete-btn";

            var edit = document.createElement("button");
            edit.innerText = "Edit";
            edit.setAttribute("onclick", "editTask(this)");
            edit.className = "edit-btn";

            liElement.appendChild(dlt);
            liElement.appendChild(edit);
            ulElement.appendChild(liElement);
        }
    });
}


displayTasks();



function deleteTask(button) {
    const taskKey = button.parentNode.getAttribute("data-key"); 

    
    dbRef.child(taskKey).remove();
}


function editTask(editButton) {
    const taskKey = editButton.parentNode.getAttribute("data-key");
    const updatedValue = prompt("Enter your updated value", editButton.parentNode.firstChild.nodeValue);

    if (updatedValue) {
        
        dbRef.child(taskKey).set({
            task: updatedValue,
            completed: false
        });
    }
}



function Delete() {
    dbRef.remove(); 
    ulElement.innerHTML = ""; 
}
