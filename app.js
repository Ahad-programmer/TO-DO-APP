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
// function addTodo(){
//     var input = document.getElementById("input")
//     if(input.value){
//     var liElement = document.createElement("li")
//     var liText = document.createTextNode(input.value)
//     liElement.appendChild(liText)
//     ulElement.appendChild(liElement)
//     input.value = ""
//     var dlt = document.createElement("button")
//     var dltText = document.createTextNode("Delete")
//     var edit = document.createElement("button")
//     var editText = document.createTextNode("Edit")
//     dlt.appendChild(dltText)
//     edit.appendChild(editText)
//     liElement.appendChild(dlt)
//     liElement.appendChild(edit)
//     dlt.setAttribute("onclick","deleteToDo(this)")
//     edit.setAttribute("onclick","editBtn(this)")
//     dlt.className = "delete-btn";
// edit.className = "edit-btn";
// liElement.className = "todo-item";
//     }
//     else{
//         alert("Value Dalo Bhaiya")
//     }
// }
// function Delete(){
//     ulElement.innerHTML = ""
// }
// function deleteToDo(button){
//     button.parentNode.remove()
// }
// function editBtn(edit){
//     var updateValue = prompt("Enter Your Update Value")
//     edit.parentNode.firstChild.nodeValue = updateValue
// }



function addTodo() {
    var input = document.getElementById("input");

    if (input.value) {
        // Firebase mein task add karna
        dbRef.push({
            task: input.value, // Jo text input mein diya gaya
            completed: false    // Default mein task incomplete
        });

        input.value = ""; // Input ko clear karna
    } else {
        alert("Please enter a task!");
    }
}



function displayTasks() {
    dbRef.on("value", (snapshot) => {
        ulElement.innerHTML = ""; // Puri list clear kar do
        const data = snapshot.val(); // Firebase data

        for (let key in data) {
            const task = data[key];

            // Task ko display karna
            var liElement = document.createElement("li");
            liElement.setAttribute("data-key", key);

            var liText = document.createTextNode(task.task);
            liElement.appendChild(liText);

            // Delete aur Edit button
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

// Display function ko page load par call karna
displayTasks();



function deleteTask(button) {
    const taskKey = button.parentNode.getAttribute("data-key"); // Task ka unique key

    // Firebase se delete karna
    dbRef.child(taskKey).remove();
}


function editTask(editButton) {
    const taskKey = editButton.parentNode.getAttribute("data-key");
    const updatedValue = prompt("Enter your updated value", editButton.parentNode.firstChild.nodeValue);

    if (updatedValue) {
        // Firebase mein update karna
        dbRef.child(taskKey).set({
            task: updatedValue, // Update hua text
            completed: false
        });
    }
}



function Delete() {
    dbRef.remove(); // Saari list Firebase se delete ho gayi
    ulElement.innerHTML = ""; // List ko display se bhi clear kar diya
}
