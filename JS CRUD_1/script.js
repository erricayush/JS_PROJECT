const addNewUser = document.querySelector('.addNewUser');
const myModal = document.querySelector('#myModal')
const formModalCrossBtn = document.querySelector('.formModalCrossBtn')
const regForm = document.querySelector('.register-form');  //form selected here
const regBtn = regForm.querySelectorAll('button');
let allInput = regForm.querySelectorAll('input');
const regList = document.querySelector('.reg-list');
const searchInput = document.querySelector('.search');
const  deleteAllBtn=document.querySelector('.delete-all-btn');
let allRegData = [];



if (localStorage.getItem('allRegData') != null) {
    allRegData = JSON.parse(localStorage.getItem('allRegData'))
}



regForm.addEventListener('submit', (e) => {
    e.preventDefault();


    let checkEmail = allRegData.find((data) => data.email == allInput[2].value)
    if (checkEmail === undefined) {
        allRegData.push({
            name: allInput[0].value,
            profile: allInput[1].value,
            email: allInput[2].value,
            mobile: allInput[3].value,
            dob: allInput[4].value,

        })
        localStorage.setItem('allRegData', JSON.stringify(allRegData));
        swal('Data Inserted', 'successfuly !', 'success')
        getRegData();   //live update
    } else {
        swal('email already exists', 'failed', 'warning')
    }


})

const getRegData = () => {
    regList.innerHTML = ""; //
    allRegData.forEach((data, index) => {
        let dataStr = JSON.stringify(data);
        let finalData = dataStr.replace(/"/g, "'");
        regList.innerHTML += `
            <tr class="flex justify-between items-center  px-4 py-2 hover:bg-gray-50">
                                <td class="w-10">${index + 1}</td>
                                <td class="flex-1">${data.name}</td>
                                <td class="flex-1">${data.profile}</td>
                                <td class="flex-1">${data.email}</td>
                                <td class="flex-1">${data.mobile}</td>
                                <td class="flex-1">${data.dob}</td>
                                <td class="w-20 flex justify-center gap-2">
                                    <button data="${finalData}" index="${index}"  class="bg-blue-500 text-white p-1 rounded cursor-pointer btn edit-btn">
                                        <i class="fa fa-edit"></i>
                                    </button>
                                    <button index="${index}" class="bg-red-500 text-white p-1 rounded cursor-pointer btn del-btn">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
        `;
    })
    deleteAction();
}
//delete button

const deleteAction = () => {
    //delete
    let allDelBtn = regList.querySelectorAll('.del-btn')
    for (let btn of allDelBtn) {
        btn.onclick = async () => {
            let isConfirm = await confirm();
            if (isConfirm) {
                let index = btn.getAttribute('index');
                allRegData.splice(index, 1);
                localStorage.setItem('allRegData', JSON.stringify(allRegData))
                getRegData() //live delete
            }

        }
    }

    //update
    let allEditBtn = regList.querySelectorAll('.edit-btn');
    for (let btn of allEditBtn) {
        btn.addEventListener("click", () => {
            let index = btn.getAttribute('index'); // index read kiya
            let dataStr = btn.getAttribute("data")//data read kiya
            let finalData = dataStr.replace(/'/g, '"'); // making stringify
            let data = JSON.parse(finalData); //will save all data in object form in data

            openModal();
            allInput[0].value = data.name;
            allInput[1].value = data.profile;
            allInput[2].value = data.email;
            allInput[3].value = data.mobile;
            allInput[4].value = data.dob;

            // regBtn[0].disabled = false;
            // regBtn[1].disabled = true;


            regBtn[1].addEventListener('click', () => {
                allRegData[index] = {
                    name: allInput[0].value,
                    profile: allInput[1].value,
                    email: allInput[2].value,
                    mobile: allInput[3].value,
                    dob: allInput[4].value,

                }
                localStorage.setItem('allRegData', JSON.stringify(allRegData));
                swal('Data updated', 'successfuly !', 'success')
                closeModal();
                regForm.reset("");
                getRegData();   //live update
                regBtn[1].disabled = false;
                regBtn[0].disabled = true;
            })
        })
    }
}

getRegData();


//delete confirm or update confirm
const confirm = () => {
    return new Promise((resolve, reject) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    resolve(true); //resolve........
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    resolve(false); //reject.......
                    swal("Your imaginary file is safe!");
                }
            });
    })
}


//delete all------------
deleteAllBtn.addEventListener('click',async()=>{
    let isConfirm=await confirm();
    if(isConfirm){
        allRegData=[];
        localStorage.removeItem('allRegData');
        
        getRegData(); //live all delete
    }
})

//searching data

searchInput.addEventListener('input',()=>{
    search();
})

const search=()=>{
    let value=searchInput.value.toLowerCase();
    let tr=regList.querySelectorAll('tr');
    let i;
    for(i=0;i<tr.length;i++){
        let alltd=tr[i].querySelectorAll('td');
        let name=alltd[1].innerHTML;
        let email=alltd[3].innerHTML;
        let mobile=alltd[4].innerHTML;
        if(name.toLocaleLowerCase().includes(value)){
           tr[i].style.display="";
        }
        else if(email.toLocaleLowerCase().includes(value)){
           tr[i].style.display="";
        }
        else if(mobile.toLocaleLowerCase().includes(value)){
           tr[i].style.display="";
        }
        else{
            tr[i].style.display='none';
        }
        
    }
}


function closeModal() {

    // let closeOrNot = allRegData.find((data) => data.email == allInput[2].value);
    // if (closeOrNot === undefined) {

    // }
    document.querySelector('#myModal').classList.add('hidden')
    document.body.style.overflow = 'auto';

}
function openModal() {
    document.querySelector('#myModal').classList.remove('hidden')
    document.body.style.overflow = 'hidden';
    regForm.reset();

}
