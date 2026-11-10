

function openAddContact() {

    var d = document.getElementById("overlay");
    d.classList.remove("d-none")
    clearForm()
}

function cancelAddContact() {
    var d = document.getElementById("overlay");
    d.classList.add("d-none")
document.getElementById('updeet').classList.add('d-none')
document.getElementById('add').classList.remove('d-none')
}


var theFllName = document.getElementById('fllName');




var thePhone = document.getElementById('phone');
var theEmail = document.getElementById('Email');
var theAddress = document.getElementById('Address');
var theGroup = document.getElementById('Group');
var theNotes = document.getElementById('tearr');
var shaow = document.getElementById("show")
var research=document.getElementById("search")
var theFavorite = document.getElementById('favorite');
var theEmergency = document.getElementById('emergency');
let toIndex;



// array فيها كل الارقام الي المفروض تتعرض
var allNumbers = []
// دي المسؤله عن تخزين القيمه الي بيدخلها كل عميل 
// document.getElementById("Total").innerHTML = number(`${total}`)

// اظهار عدد الارقام الي تم ادخالها
var total = allNumbers.length;

// 

if (localStorage.getItem("content") != null) {
    allNumbers = JSON.parse(localStorage.getItem("content")) 
    displayNumber(allNumbers)
}




// الاساسيه
function addContact() {
const isName= nameValid()
 const isPhone =phoneValid()
const isEmail =emailValid()


if(isName===false || isPhone===false || isEmail===false ) {
  
    return;
}

//   Swal.fire({
//         title: "Error!",
//         text: "Please fill in all fields correctly.",
//         icon: "error"
//     });



    var numbers = {
        name: theFllName.value,
     
        phone: thePhone.value,
        email: theEmail.value,
        address: theAddress.value,
        select: theGroup.value,
notes:theNotes.value,
favorite: theFavorite.checked,
emergency: theEmergency.checked,

    }

    allNumbers.push(numbers)
    cancelAddContact()

    localStorage.setItem("content", JSON.stringify(allNumbers))

    displayNumber(allNumbers)
    document.getElementById("fllName").classList.remove("is-invalid");
    document.getElementById("phone").classList.remove("is-invalid");
    document.getElementById("Email").classList.remove("is-invalid");
    document.getElementById("Address").classList.remove("is-invalid");

    Swal.fire({
        title: "Added!",
        text: "contact has been added successfu",
        icon: "success"
    });




    total += 1
    clearForm()
}
// العدادات 
function updateCounters() {
    var fav = 0;
    var emg = 0;

    for (var i = 0; i < allNumbers.length; i++) {
        if (allNumbers[i].favorite === true) {
            fav++;
        }
        if (allNumbers[i].emergency === true) {
            emg++;
        }
    }

    document.getElementById("Total").innerHTML = allNumbers.length;
    document.getElementById("totalText").innerHTML = allNumbers.length;
    document.getElementById("Favorites").innerHTML = fav;
    document.getElementById("Emergency").innerHTML = emg;
}





// المسؤله عن عرض الارقام 
function displayNumber(list) {
    var displayHtml = list.map(function (content, index) {
        return `
      <div class="col-lg-6   col-md-12 end-div ">

                                <div class="p-2 bgbg">

                                    <div class="d-flex gap-2">

<div class="position-relative mt-2">
    <div class="imoo avatar">${getInitials(content.name)}</div>

    ${content.favorite ? '<span class="badge-fav"><i class="fa-solid fa-star"></i></span>' : ''}
    ${content.emergency ? '<span class="badge-emg"><i class="fa-solid fa-heart-pulse"></i></span>' : ''}
</div>
                                        <div class="">
                                            <h5> ${content.name} </h5>  
                                            <p>
                                                <i class="fa-solid fa-phone  icos"></i>
                                                <span style="color: #6A7292;">${content.phone}</span>
                                            </p>

                                        </div>
                                    </div>

                                    <p>


                                        <i style="background-color: #EDE9FE; color: #7F22FE;"
                                            class="fa-solid fa-envelope  icos"></i>
                                        <span style="color: #6A7292;">${content.email}</span>
                                    </p>



                                    <p>


                                        <i style="background-color: #D0FAE5; color: #009966;"
                                            class="fa-solid fa-location-dot  icos"></i>
                                        <span style="color: #6A7292;">${content.address}</span>
                                    </p>





                                    <p class="icos texss ">${content.select}</p>

                                </div>


                                <div class=" bgfo d-flex justify-content-between">

                                    <div class=" gap-3 ">

  <a  style=" border: none; 
  border-radius: 7px;
   color: #009966; 
   padding-top: 4PX; 
   padding-bottom:4px;
    margin-right: 2PX
     ;padding-left: 4px;
     " class="xs  " href=" ${content.phone}">
    
    
                                                    <i class="fa-solid fa-phone"  ></i>
                                                </a>

                                    

                                            

                                        <a style="  border: none; border-radius: 7px;" href="tel:+${content.email}">
                                            <i class="fa-solid fa-envelope  eee ios"></i>


                                        </a>





                                    </div>

                                    <div class=" ">
                                        <button onclick=" favorites (${index})" class=" start star">
                                            <i class="fa-regular fa-star"></i>
                                        </button>

                                        <button onclick=" emergency(${index})" class=" start hart">
                                            <i class="fa-regular fa-heart"></i>
                                        </button>

                                        <button onclick=" wonUpdeet(${index})" class=" start ben">
                                            <i class="fa-solid fa-pen"></i>

                                        </button class=" start">


                                        <button onclick=" delet(${index})" class=" start trash">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>



                                    </div>
                                </div>

                            </div>
` }).join("");


    shaow.innerHTML = displayHtml;
    showFavorites()
showEmergency() 
updateCounters()    
}


// clear fooooorm
function clearForm() {
    theFllName.value = ""
   
    thePhone.value = ""
    theEmail.value = ""
    theAddress.value = ""
    theGroup.value = ""
    theNotes.value = ""
theFavorite.checked = false;
theEmergency.checked = false;
}
//Regex 
 
let regex ={
name: /^[\w\s-]{2,25}$/ ,
phone:/^01[0125][0-9]{8}$/  ,
email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
address:/^.{2,30}$/ ,
}
// 
function nameValid(){
if(regex.name.test(theFllName.value)){
    console.log("valid");
    theFllName.classList.remove("is-invalid");
    return true;
}
else{
   theFllName.classList.add("is-invalid");
    return false;
}
}
// 
function phoneValid(){
if(regex.phone.test(thePhone.value)){
    console.log("valid");
     return true;
}
else{
        document.getElementById("phone").classList.add("is-invalid");
  return false;
}
}
// 
function emailValid(){
if(regex.email.test(theEmail.value)){
    console.log("valid");
    theEmail.classList.remove("is-invalid");

     return true;
    
}
else{
     theEmail.classList.add("is-invalid");
       return false;
}
}


// resersh
function search(tr){
    var newAllnumbers=allNumbers.filter(function(pro){

return pro.name.toLowerCase().includes(tr.toLowerCase())
    }
)

displayNumber(newAllnumbers)
}


  

// updeet
function  wonUpdeet(ind) {
 toIndex = ind
    openAddContact() 

        theFllName.value = allNumbers[ind].name;

    thePhone.value = allNumbers[ind].phone;
    theEmail.value = allNumbers[ind].email;
    theAddress.value = allNumbers[ind].address;
    theGroup.value =allNumbers[ind].select;
    theNotes.value = allNumbers[ind].notes;
theFavorite.checked = allNumbers[ind].favorite;
theEmergency.checked = allNumbers[ind].emergency;
    document.getElementById('updeet').classList.remove('d-none');
    document.getElementById('add').classList.add('d-none');

};   
 

function finalupdeet() {
    
       var newNumbers = {
        name: theFllName.value,
       
        phone: thePhone.value,
        email: theEmail.value,
        address: theAddress.value,
        select: theGroup.value,
notes: theNotes.value,
favorite: theFavorite.checked,
emergency: theEmergency.checked,

    }

        allNumbers.splice(toIndex, 1,newNumbers);

localStorage.setItem("content", JSON.stringify(allNumbers))
displayNumber(allNumbers)
cancelAddContact()
}
// 

function showFavorites() {
    var html = ""

    for (var i = 0; i < allNumbers.length; i++) {
        if (allNumbers[i].favorite === true) {
            html += `
            <div class="side-item d-flex align-items-center gap-3 p-2">
                <div class="side-avatar">${getInitials(allNumbers[i].name)}</div>
                <div class="text-start flex-grow-1">
                    <p class="mb-0 fw-bold">${allNumbers[i].name}</p>
                    <p class="mb-0 side-phone">${allNumbers[i].phone}</p>
                </div>
                <a href="tel:${allNumbers[i].phone}" class="side-call fav-call">
                    <i class="fa-solid fa-phone"></i>
                </a>
            </div>`
        }
    }

    if (html === "") {
        html = '<p class="favo">No favorites yet</p>'
    }

    document.getElementById("FavoritesList").innerHTML = html
}



function showEmergency() {
    var html = ""

    for (var i = 0; i < allNumbers.length; i++) {
        if (allNumbers[i].emergency === true) {
            html += `
            <div class="side-item d-flex align-items-center gap-3 p-2">
                <div class="side-avatar emg-avatar">${getInitials(allNumbers[i].name)}</div>
                <div class="text-start flex-grow-1">
                    <p class="mb-0 fw-bold">${allNumbers[i].name}</p>
                    <p class="mb-0 side-phone">${allNumbers[i].phone}</p>
                </div>
                <a href="tel:${allNumbers[i].phone}" class="side-call emg-call">
                    <i class="fa-solid fa-phone"></i>
                </a>
            </div>`
        }
    }

    if (html === "") {
        html = '<p class="favo">No emergency contacts</p>'
    }

    document.getElementById("EmergencyList").innerHTML = html
}



// function showEmergency() {
//     var html = ""

//     for (var i = 0; i < allNumbers.length; i++) {
//         if (allNumbers[i].emergency === true) {
//             html += `<p>${allNumbers[i].name} - ${allNumbers[i].phone}</p>`
//         }
//     }

//     if (html === "") {
//         html = '<p class="favo">No emergency contacts</p>'
//     }

//     document.getElementById("EmergencyList").innerHTML = html
// }


// // 
// function showFavorites() {
//     var html = ""

//     for (var i = 0; i < allNumbers.length; i++) {
//         if (allNumbers[i].favorite === true) {
//             html += `<p>${allNumbers[i].name} - ${allNumbers[i].phone}</p>`
//         }
//     }

//     if (html === "") {
//         html = '<p class="favo">No favorites yet</p>'
//     }

//     document.getElementById("FavoritesList").innerHTML = html
// }

//FAVORITES

function favorites(index) {
    allNumbers[index].favorite = !allNumbers[index].favorite
    localStorage.setItem("content", JSON.stringify(allNumbers))
    displayNumber(allNumbers)
}
// emergency

function emergency(index) {
    allNumbers[index].emergency = !allNumbers[index].emergency
    localStorage.setItem("content", JSON.stringify(allNumbers))
    displayNumber(allNumbers)
}

// 
function getInitials(name) {
    var words = name.split(" ");
    var first = words[0][0];
    var last = words[words.length - 1][0];

    return (first + last).toUpperCase();
}













// DELETE
function delet(dedo) {
      allNumbers.splice(dedo, 1)
      localStorage.setItem("content", JSON.stringify(allNumbers))
          displayNumber(allNumbers)

      
    }
    
    



















// var allContact = [{},{},{}]
// var emg = allContact.filter(function(con){ return con.emg == true})