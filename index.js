const express = require('express');
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000
const cors = require('cors')
app.use(cors())

// let URI = "mongodb+srv://feranmiopadeji:FeranMi1227@cluster0.v9ed4qh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let URI = "mongodb+srv://feranmiopadeji:FeranMi1227@cluster0.v9ed4qh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(URI)
.then((err)=>{
     console.log("mongoose connecton failed");
     console.log(err)
}).catch(()=>{
    console.log("connect successful")
})

// mongoose.connect(URI,(err)=>{
//     if(err){
//         console.log("mongoose connecton failed")
//     }else{
//         console.log("mongoose has connection successfully")
//     }
// })
let userShema = mongoose.Schema({
    firstname: {type:String, require:true},
    lasstname: {type:String, require:true},
    email: {type:String, require:true,unique:true},
    password: {type:String, require:true},
})
let userModel = mongoose.model("user_db",userShema)


app.post('/signup', (req,res)=>{
    res.send('/signup')
    const userDetails = re.body
    let form = new userModel(userDetails)
    form.save((err)=>{
        if(err){
            console.log("data could not be saved")
            res.render('index.ejs', {message:"sign up not successful please try again"})
        }else{
            console.log("data connect successful")
            res.render('index.ejs', {message:"sign up successful"})
        } 
    })

})



const vans = [
    { id: 1, name: "Modest Explorer", price: 60, description: "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", type: "simple", hostId: "123" },
    { id: 2, name: "Beach Bum", price: 80, description: "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png", type: "rugged", hostId: "123" },
    { id: 3, name: "Reliable Red", price: 100, description: "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", type: "luxury", hostId: "456" },
    { id: 4, name: "Dreamfinder", price: 65, description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple",  },
    { id: 4, name: "Dreamfinder", price: 65, description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple", hostId: "789" },
    { id: 5, name: "The Cruiser", price: 120, description: "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", type: "luxury", hostId: "789" },
    { id: 6, name: "Green Wonder", price: 70, description: "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", type: "rugged", hostId: "123" }
];

app.get('/api/vans', (req, res) => {
    res.send(vans);
});

app.get('/api/vans/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const van = vans.find(van => van.id === id);
    if (!van) {
        res.status(404).json({ error: 'Van not found' });
    } else {
        res.send(van);
    }
});

app.get('/api/host/vans', (req, res) => {

    const hostVans = vans.filter(van => van.hostId === '123');
    res.send(hostVans);
});

app.get('/api/host/vans/:id', (req, res) => {
    const id = req.params.id;
    const van = vans.find(van => van.id == id && van.hostId == '123');
    if (!van) {
        res.status(404).json({ error: 'Van not found' });
    } else {
        res.send(van);
    }
}); 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});