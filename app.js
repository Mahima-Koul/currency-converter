const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns= document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button")
const fromCurr= document.querySelector(".from select")
const toCurr= document.querySelector(".to select")
const msg= document.querySelector(".msg")


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);       
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);    //!!
    })
}

let updateFlag= (element)=>{  //This function will change the flags as we click on the country
    let currCode= element.value;    //getting the currency code
    let countryCode= countryList[currCode]   //getting the country code
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`   //getting the flag 
    let img= element.parentElement.querySelector("img")    //acessing the image
    img.src= newSrc    //changing image source to the flag 
}


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();   //prevents all refreshing of page when we click a form button and any default action
    let amount= document.querySelector(".amount input")
    let amtVal=amount.value
    if (amtVal===""|| amtVal<1){  //to ensure any negative value isnt taken in
        amtVal=1
        amount.value="1"
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    let response= await fetch(URL)
    let data= await response.json()
    let rate= data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    let finalAmount= amtVal* rate
    msg.innerText=`${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`
})