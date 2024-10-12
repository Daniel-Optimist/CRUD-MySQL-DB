function displayForm(show, hideOne, hideTwo, hideThree) {
  document.getElementsByClassName(show)[0].style.display = "block"; //displays the element with the class show.
  document.getElementsByClassName(hideOne)[0].style.display = "none"; //Hides the element with the class hideONe.
  document.getElementsByClassName(hideTwo)[0].style.display = "none"; //Hides the element with the class hideTwo.
  document.getElementsByClassName(hideThree)[0].style.display = "none"; //Hides the element with the class hideThree.
}
// 1) function editName and its event handler 
function editName(e) {
  // prevents the form from submitting the traditional way, allowing us to handle it with JavaScript.
  e.preventDefault();
  //fetch API Call ; URL:sends requests to the url below
  fetch("http://localhost:1234/update", {
    method: "PUT", //uses HTTP method PUT to update data
    //Headers: Sets the content type to application/json.
    headers: { "content-type": "application/json" },

    // Body of fetch request sends both the id and newName with their corresponding values extracted from the form inputs in string format, JSON.stringify: serializes the object into a text format (string) that's easy to transport.
    body: JSON.stringify({
      id: document.querySelector("#myForm input[name=id]").value,
      newName: document.querySelector("input[name=updatedName]").value,
    }),
  })
    // handling responses
    .then((response) => response.json()) //Converts the response to JSON.
    .then(() => alert("Name Updated!")); // Alerts the user that the name has been updated.

  document.getElementById("myForm").reset(); //Resets the form fields after submission.
}
//event handler 
document.getElementById("myForm").addEventListener("submit", editName); //listens for the form submit action and calls the editName function when the form is submitted; that function handles the fetching/sending action!

// Fetch API: primarily aimed to fetch data from API but is versatile to support GDP-P : Get, Delete, Post, Put ; Get would be the default if not specified

//application/json: The formal MIME type used to specify that the content is JSON.

// JSON: Just the data format itself, without specifying how it’s being used in the context of HTTP communication.

// 2) delete function and its event handler 
function deleteUser(e) {
  e.preventDefault();
  fetch("http://localhost:1234/remove-user", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      id: document.querySelector("#delete-user input[name=id]").value,
    }),
  }).then((response) => response.json());
  alert("User Deleted!"); //DKG: the .then() block needs to be added to ensure they alert message execute after the user has been successfully deleted.
  document.getElementById("delete-user").reset(); // reset delete user form 
  qw;
}

document.getElementById("delete-user").addEventListener("submit", deleteUser);

// 3) listCustomers function and its event handler
function listCustomers() {
	const usersDiv = document.getElementById("data"); //get elt with id=data and assigns it to userDiv
	usersDiv.innerHTML = ""; // clears any existing content in userDiv
	fetch("http://localhost:1234/customers") //no HTTP method specified so GET fetch customer data : send request to http://localhost:1234/customers to get customer data
    .then((res) => res.json()) // parses(decompose) the response as JSON
    
	// Iterates through the fetched data (customers) and updates usersDiv with customer details (id, name, address, and company).
    .then((data) => {
      data.map((customer, i) => {
        usersDiv.innerHTML += `
				<div class="row">
					<h2 class="col-2">${customer.id}</h2>
					<h2 class="col-4">${customer.name}</h2>
					<h2 class="col-3">${customer.address}</h2>
					<h2 class="col-3">${customer.company}</h2>
				</div>
				<hr>`; // Adds a horizontal rule below each customer row for separation. (bcoz of the iteration )
      });
    });
}
//event handler : trigger listCustomer function to execute when a click event happens ( listen to the click event and wake the function up to execute)
document.getElementById("list").addEventListener("click", listCustomers);


/* further breaking down of the second .then function 
1) .then ((data)= {  : takes the response data ( assumed to be an array of customers) and process it 
2) data.map((customer, i) => { : map: to iterate over each customer in the data array ; customer: the current customer object; i: the index of the current item ( it is not used in this function but available if needed)
3) updating the HTML: 
  3.1) usersDiv.innerHTML += : adds HTML content to the usersDiv w/o replacing the existing content 
  3.2) <div class="row"> : creates new div with a class of row, used for Bootstrap layout 
  3.3. Displays customer details (id, name, address, and company)each in an H2 element with the specified Bootstrap column class. 
*/