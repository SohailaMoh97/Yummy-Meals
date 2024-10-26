const cardData = document.querySelector("#cardData")
const search = document.querySelector("#search")

// const name = document.querySelector("#name")
// const email = document.querySelector("#email")
// const phone = document.querySelector("#phone")
// const age = document.querySelector("#age")
// const pass = document.querySelector("#pass")
// const repass = document.querySelector("#repass")


// loading

$(document).ready(async () => {
    await searchName("");  
    $(".loading").fadeOut(500);  
});

// side nav
function openSide() {
    $(".side-menu").animate({left : 0 },500)
    $(".open-icon").removeClass("fa-align-justify").addClass("fa-x")

    for(i = 0 ; i < 5 ; i++) {
      $(".links li").eq(i).animate({top: 0},(i * 100) + 500 )
    }
}

function closeSide() {
    let box = $(".side-menu .nav-tab").outerWidth()
    $(".side-menu").animate({left : -box },500)
    $(".open-icon").removeClass("fa-x").addClass("fa-align-justify")
    $(".links li").animate({top:300},500)
  
}
closeSide()

$(".side-menu i.open-icon").click(()=> {
     
    if($(".side-menu").css("left") === "0px") {
       closeSide()
    }
    else {
       openSide()
    } 
})


// home meals + search function

async function searchName(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json() 
    
   if(response.meals){
    displayMeal(response.meals)
   } else {
    displayMeal([])
   }

}

function displayMeal(arr) {
    let box = ""
    for(i = 0 ; i < arr.length ; i++) {
        box += `
         <div class="col-md-3">
           <div onclick="details('${arr[i].idMeal}')" class="meal pointer rounded-2 position-relative overflow-hidden">
             <img class="w-100" src="${arr[i].strMealThumb}">
             <div class="layer w-100 position-absolute d-flex align-items-center p-2">
             <h3>${arr[i].strMeal}</h3>
             </div>
           </div>
        </div>
        `
    }
    cardData.innerHTML = box
} 

searchName("")



// categories
async function getCategory() {
    $(".loading").fadeIn(300)
    search.innerHTML = "" 
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    response = await response.json() 
    displayCategory(response.categories)
    $(".loading").fadeOut(300)

}

function displayCategory(arr) {
    let box = ""
    for(i = 0 ; i < arr.length ; i++) {
        box += `
        <div class="col-md-3">
           <div onclick="categoryMeals('${arr[i].strCategory}')"  class="meal pointer rounded-2 position-relative overflow-hidden">
             <img class="w-100" src="${arr[i].strCategoryThumb}">
             <div class="layer w-100 position-absolute d-flex align-items-center flex-column text-center p-2">
             <h3>${arr[i].strCategory}</h3>
             <p>${arr[i].strCategoryDescription.split(" ").slice(0 , 20).join(" ")}</p>
             </div>
           </div>
        </div>
        `
    }
    cardData.innerHTML = box
}

async function categoryMeals(category) {
    $(".loading").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json() 
    
    // console.log(response.meals)
    displayCategoryMeals(response.meals.slice(0,20))
    $(".loading").fadeOut(300)

}

function displayCategoryMeals(arr) {
    let box = " "
    for(i = 0 ; i < arr.length ; i++) {
        box += `
         <div class="col-md-3">
           <div onclick="details('${arr[i].idMeal}')" class="meal pointer rounded-2 position-relative overflow-hidden">
             <img class="w-100" src="${arr[i].strMealThumb}">
             <div class="layer w-100 position-absolute d-flex align-items-center p-2">
             <h3>${arr[i].strMeal}</h3>
             </div>
           </div>
        </div>
        `
    }
    cardData.innerHTML = box
}



// Area

async function getArea() {
    cardData.innerHTML=""
    $(".loading").fadeIn(300)
    search.innerHTML = "" 
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list ")
    response = await response.json() 
    displayArea(response.meals) 
    $(".loading").fadeOut(300)

}

function displayArea(arr) {
    let box = ""
    for(i = 0 ; i < arr.length ; i++) {
        box += `
         <div class="col-md-3">
           <div onclick="areaMeals('${arr[i].strArea}')" class=" text-center  pointer rounded-2 ">
             <i class="fa-solid fa-house-laptop fa-4x"></i>
             <h3>${arr[i].strArea}</h3>   
           </div>
        </div>
        
        `
    }
    cardData.innerHTML = box
}


async function areaMeals(area) {
    $(".loading").fadeIn(300)
  
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json() 
    displayAreaMeals(response.meals.slice(0,20))
    $(".loading").fadeOut(300)

}

function displayAreaMeals(arr) {
    let box = " "
    for(i = 0 ; i < arr.length ; i++) {
        box += `
         <div class="col-md-3">
           <div onclick="details('${arr[i].idMeal}')" class="meal pointer rounded-2 position-relative overflow-hidden">
             <img class="w-100" src="${arr[i].strMealThumb}">
             <div class="layer w-100 position-absolute d-flex align-items-center p-2">
             <h3>${arr[i].strMeal}</h3>
             </div>
           </div>
        </div>
        `
    }
    cardData.innerHTML = box
}



// ingredient
async function getIngredients() {
    
    $(".loading").fadeIn(300)
    search.innerHTML = ""
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    response = await response.json() 
    displayIngredients(response.meals.slice(0,20))
    $(".loading").fadeOut(300)

}

function displayIngredients(arr) {
    let box = ""
    for(i = 0 ; i < arr.length ; i++) {
        box += `
         <div class="col-md-3">
           <div onclick="ingredientMeals('${arr[i].strIngredient}')"  class=" text-center  pointer rounded-2 ">
             <i class="fa-solid fa-drumstick-bite fa-4x"></i>
             <h3>${arr[i].strIngredient}</h3> 
             <p>${arr[i].strDescription.split(" ").slice(0 , 20).join(" ")}</p>  
           </div>
        </div>
        `
    }
    cardData.innerHTML = box
}

async function ingredientMeals(ingredient) {
    $(".loading").fadeIn(300)
  
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    response = await response.json() 
    displayIngredientMeals(response.meals.slice(0,20))
    $(".loading").fadeOut(300)

}

function displayIngredientMeals(arr) {
    let box = " "
    for(i = 0 ; i < arr.length ; i++) {
        box += `
         <div class="col-md-3">
           <div onclick="details('${arr[i].idMeal}')" class="meal pointer rounded-2 position-relative overflow-hidden">
             <img class="w-100" src="${arr[i].strMealThumb}">
             <div class="layer w-100 position-absolute d-flex align-items-center p-2">
             <h3>${arr[i].strMeal}</h3>
             </div>
           </div>
        </div>
        `
    }
    cardData.innerHTML = box
}


// Instructions

async function details(id) {
    $(".loading").fadeIn(300)
    search.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()

    displayDetails(response.meals[0])
    $(".loading").fadeOut(300)

    closeSide()
}

function displayDetails(meal) {
    
    let ingredients = ``
    for(i = 1 ; i <= 20 ; i++) {
       if(meal[`strIngredient${i}`]) {   
        ingredients += ` <li class="alert alert-info m-2 p-1 ">${meal[`strMeasure${i}`]}${meal[`strIngredient${i}`]}</li> `
        
       }  
    }
   
    let tags = meal.strTags?.split(",")

    let tagsContent = ""
    for(let i = 0 ; i < tags.length ; i++) {
        tagsContent += `
        <li class="alert alert-danger m-2 p-1 "> ${tags[i]}</li>
        `
    }


    let box = `
    <div class="col-md-4">
          <img class="w-100 rounded-2" src="${meal.strMealThumb}">
          <h2>${meal.strMeal}</h2>
       </div>
       <div class="col-md-8">
          <h2>Instructions</h2> 
          <p>${meal.strInstructions}</p> 
          <h3><span class="fw-bolder">Area :</span> ${meal.strArea}</h3> 
          <h3><span class="fw-bolder">Category :</span>${meal.strCategory}</h3> 
          <h3>Recipes :</h3>
          <ul class="list-unstyled flex-wrap d-flex ">
           ${ingredients}
            
          </ul>
          <h3>Tags :</h3>
          <ul class="list-unstyled flex-wrap d-flex ">
            ${tagsContent}

          </ul> 
          <a href="${meal.strSource}" class="btn btn-success" >Source</a>
          <a href="${meal.strYoutube} " class="btn btn-danger">Youtube</a>
       </div>
   `
   cardData.innerHTML = box

}



// search 
function searchMeals() {
    search.innerHTML = `
        <div class="row my-3   mx-5">
            <div class="col-md-6">
                <input onkeyup="searchName(this.value)" class="text-white form-control  p-2 bg-transparent" type="text" placeholder="Search by name ...">
            </div>
            <div class="col-md-6">
                <input maxlength="1" onkeyup="searcByFirst(this.value)"    class="text-white form-control  p-2 bg-transparent" type="text" placeholder="Search by first letter ...">
            </div>
        </div>
    `
    cardData.innerHTML= ""
}

async function searcByFirst(term) {
  
    if(term === "") {
    term = "a"
   } 
    
   
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
   response = await response.json() 
    
   if(response.meals){
    displayMeal(response.meals)
   } else {
    displayMeal([])
   }

}



// contact

function gatContact() {
    search.innerHTML = ""

    cardData.innerHTML = `
     <div class="contact min-vh-100 d-flex justify-content-center align-items-center"> 
        <div class="container w-75 text-center">
            <div class="row  ">
                <div class="col-md-6 py-2 ">
                    <input id="name" onkeyup="validation()" type="text" class="form-control  " placeholder="Enter your name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                     Special characters and numbers aren't allowed </div>
                </div>
                <div class="col-md-6 py-2 ">
                    <input id="email" onkeyup="validation()" type="email" class="form-control   " placeholder="Enter your email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email is not valid *exemple@yyy.zzz </div>
                </div>
                <div class="col-md-6 py-2 ">
                    <input id="phone" onkeyup="validation()" type="number" class="form-control   " placeholder="Enter your phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid Phone Number </div>
                </div>
                <div class="col-md-6 py-2 ">
                    <input id="age"  onkeyup="validation()" type="number" class="form-control   " placeholder="Enter your age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid age </div>
                </div>
                <div class="col-md-6 py-2 ">
                    <input id="pass"  onkeyup="validation()" type="password" class="form-control   " placeholder="Enter your password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid password *Minimum eight characters, at least one letter and one number:* </div>
                </div>
                <div class="col-md-6 py-2 ">
                    <input id="repass" onkeyup="validation()" type="password" class="form-control  " placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Passwords don't match </div>
                </div>
            </div>
            <button id="submit" disabled class="btn my-1 btn-outline-danger">Submit</button>
        </div>
    </div> 
    `
}

function validation() {
    // search.innerHTML = ""
    

    if (nameValidate()) {
        $("#nameAlert").removeClass("d-block").addClass("d-none");  
    } else {
        $("#nameAlert").removeClass("d-none").addClass("d-block");  
    }

    if (ageValidate()) {
       $("#ageAlert").removeClass("d-block").addClass("d-none");  
    } else {
       $("#ageAlert").removeClass("d-none").addClass("d-block");  
    }

    if (emailValidate()) {
       $("#emailAlert").removeClass("d-block").addClass("d-none");  
    } else {
       $("#emailAlert").removeClass("d-none").addClass("d-block");  
    }

    if (phoneValidate()) {
       $("#phoneAlert").removeClass("d-block").addClass("d-none");  
    } else {
       $("#phoneAlert").removeClass("d-none").addClass("d-block");  
    }

    if (passwordValidate()) {
       $("#passwordAlert").removeClass("d-block").addClass("d-none");  
    } else {
       $("#passwordAlert").removeClass("d-none").addClass("d-block");  
    }

    if (repasswordValidate()) {
       $("#repasswordAlert").removeClass("d-block").addClass("d-none");  
    } else {
       $("#repasswordAlert").removeClass("d-none").addClass("d-block");  
    }

    if (nameValidate() && emailValidate() && ageValidate() && phoneValidate() && passwordValidate() && repasswordValidate()) {
        $("#submit").removeAttr("disabled");  
    } else {
        $("#submit").attr("disabled", "disabled");
    }
}

function nameValidate() {
   return (/^[a-zA-Z ]+$/.test(document.querySelector("#name").value))
}

function emailValidate() {
    return(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.querySelector("#email").value))
}

function phoneValidate() {
    return(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.querySelector("#phone").value))
}

function ageValidate() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.querySelector("#age").value))
}

function passwordValidate() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.querySelector("#pass").value))
}

function repasswordValidate() {
    return document.querySelector("#repass").value === document.querySelector("#pass").value
}