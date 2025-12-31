const beginBtn=document.getElementById('begin-btn');
const selectCategory=document.getElementById('select-category');
beginBtn.addEventListener("click",()=>{
    const category=selectCategory.value;
    if(category==""){
        alert("please select a category to begin the quiz");
    }
    else{
alert("you have selected "+category)
    }
})
