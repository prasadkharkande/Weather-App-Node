// const {response} = require('express')




fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

// const Geo_url ='https://api.mapbox.com/geocoding/v5/mapbox.places/Boston.json?access_token=pk.eyJ1IjoicHJhc2Fka2hhcmthbmRlIiwiYSI6ImNrdzRsODFvYTBpcHQyeG1leWk1cDZzbjgifQ.L2yU1OqvjiQHehY0ro_J7Q&limit=1'




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent = 'From javascript'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?search='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
            }
            else{
                console.log(data.location)
                messageOne.textContent = data.location
                console.log(data.forecast.output)
                // const a = JSON.stringify(data.forecast)
                // const parsedA = JSON.parse(a)
                a = data.forecast.output
                messageTwo.textContent = a
            }
        })
    })

})
