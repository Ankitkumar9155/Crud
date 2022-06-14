document.addEventListener('DOMContentLoaded',function(){
    fetch('http://localhost:4000/getAll')
    .then(response => response.json())
    .then(data=> loadHtmlTable(data['data']));
    //console.log(data);
    
});
document.querySelector('table tbody').addEventListener('click',function(event){
    if(event.target.className === "delete-row-btn"){
        deleteRowId(event.target.dataset.id);
    }
    if(event.target.className === "edit-row-btn"){
        editRowId(event.target.dataset.id);
    }
});
function editRowId(id){
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:4000/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHtmlTable(data['data']));
}

updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-name-input');


    console.log(updateNameInput);

    fetch('http://localhost:4000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}

function deleteRowId(id){
    fetch('http://localhost:4000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}
const addbtn = document.querySelector('#add-name-btn');
addbtn.onclick=function(){
    const nameinput=document.querySelector('#name-input');
    const name=nameinput.value;
    nameinput.value="";

    fetch('http://localhost:4000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : name})
    }).then(response => response.json())
      .then(data => loadHtmlTable(data['data']));
      location.reload();
      
}
function insertRowIntoTable(data){
    const table =document.querySelec
}
function loadHtmlTable(data){
    //console.log(data);
    const table = document.querySelector('table tbody');
    //console.log(data);
    if(data.length === 0) {
        table.innerHTML ="<tr><td class='no-data' colspan='5'> NO DATA</td></tr>";
    } 
   

    let tableHtml = "";

    data.forEach(function ({id, name, date_added}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;

}
