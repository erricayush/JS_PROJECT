let taskInput = document.querySelector('#taskInput')
let addBtn = document.querySelector('.addBtn')
let todoContainer = document.querySelector('.todoContainer')

let API = 'https://6996f8167d1786436575e9d5.mockapi.io/api/v1/todos'

addBtn.addEventListener('click', postData)


async function fetchData() {
    let response = await fetch(API)
    let data = await response.json();


    if (data) {
        todoContainer.innerHTML = '';
        data.forEach((obj) => {
            let div = document.createElement('div');
            div.className = 'todo'
            div.innerHTML =
            `
            <p>${obj.text}</p>
            <div class="btns">
                <button class="deleteBtn">Delete</button>
                <button>Edit</button>
            </div>
            `

            let deleteBtn= div.querySelector('.deleteBtn')
            deleteBtn.addEventListener('click',function(){
            //  console.log(obj.id)
            deleteData(obj.id);
            })

            todoContainer.append(div)
        });
    }
}


async function postData() {

    let val = taskInput.value;
    // console.log(val);

    let objData = {
        text: val.trim()
    }

    let response = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objData),
    })
    if (response.status === 201) {
        fetchData();
    }
    // val.textContent='';

}


async function deleteData(id){
    let response = await fetch(`${API}/${id}`, {
        method: 'DELETE',
 
    })
    if(response.status===200){
        fetchData();
    }
}

fetchData();
