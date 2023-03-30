window.onload = function() {
	let linksDelete = document.getElementsByClassName("deleteUser");
	let linksEdit = document.getElementsByClassName("editUser");
	for (let item of linksDelete) {
	    item.addEventListener("click", deleteUser);
	}
	for (let item of linksEdit) {
	    item.addEventListener("click", editUser);
	}
}

function deleteUser(event){
    var confirmation = confirm('Are You Sure?');
	if(confirmation){
		var url = '/users/delete/' + event.target.getAttribute('data-id');
		var consulta = new XMLHttpRequest();
		consulta.open("DELETE", url);
		consulta.onload = function() {
			if (consulta.status == 200) {
				window.location.replace('/')
			}
		};
		consulta.send();
	} else {
		return false;
	}
}



function editUser(event){

	fetch('http://localhost:3000/users/edit/' + event.target.getAttribute('data-id'))
	.then(response => response.json())
	.then(data => {
		// Utilizar los datos en formato JSON
		console.log(data);
		document.getElementById("form").elements["first_name"].value = data[0].first_name;
		document.getElementById("form").elements["last_name"].value = data[0].last_name;
		document.getElementById("form").elements["email"].value = data[0].email;
	
		document.getElementById("form").elements["submit"].value = "Editar";})
	.then()

}
	
	

