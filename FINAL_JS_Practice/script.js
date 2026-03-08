const addReview=document.querySelector('.add-review')
const formModal=document.querySelector('#formModal');
const xmarkBtn=document.querySelector('.xmarkBtn')

const reviewForm=document.querySelector('#reviewForm');
let allInput=reviewForm.querySelectorAll('input')
let allRegData=[];

if(localStorage.getItem('allRegData') !=null){
    allRegData=JSON.parse(localStorage.getItem('allRegData'))
}

reviewForm.addEventListener('click',(e)=>{
    e.preventDefault();
    allRegData.push({
        employeeName:allInput[0].value,
        email:allInput[1].value,
        phone:allInput[2].value,
        department:allInput[3].value,
        Designation:allInput[4].value,
        ReviewPeriod:allInput[5].value,
        ReviewerName :allInput[6].value,
        TechnicalSkillsRating:allInput[7].value,
        CommunicationSkillsRating:allInput[8].value,
        TeamworkRating:allInput[9].value,
        ReviewStatus:allInput[10].value,
    })
    localStorage.setItem('allRegData',JSON.stringify(allRegData))
})

// xmark button working
xmarkBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    formModal.classList.add('hidden');
})


addReview.addEventListener('click',function(){
    // console.log("addreview btn is clicked");
    formModal.classList.remove('hidden');
})




// swal("Good job!", "You clicked the button!", "success");