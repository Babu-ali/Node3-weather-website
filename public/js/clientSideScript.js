
console.log("Client side JavaScript file loaded")

//fetch API
fetch('http://puzzle.mead.io/i').then((response) =>{
    response.json().then((data)=>{
        console.log(data)
    })
})
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#message-1')
const message_2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    message_1.textContent='Loading....'
    message_2.textContent=''
    if(!search.value){
        message_1.textContent='Please enter Location'
    }else{
        const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.locationNotFound){
            message_1.textContent =data.locationNotFound
        }else if(data.connection){
            message_1.textContent =data.connection
        }
        else{
            message_1.textContent = 'Location: '+data.location;
            message_2.textContent = 'Forecast: '+data.forecast;
            // console.log(data.location);
            // console.log(data.forecast)
        }
    })
})
    console.log(location)
}
    
})
