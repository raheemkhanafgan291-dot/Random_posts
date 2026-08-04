const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4:  uuidv4 } = require('uuid');

uuidv4();

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


let posts = [
    {
        id:uuidv4(),
        username:"RK",
        content:"rgm"
    },
        {
        id:uuidv4(),
        username:"kk",
        content:"vip"
    },
        {
        id:uuidv4(),
        username:"csk",
        content:"bhp"
    },
]


app.get("/posts",(req, res)=>{
    res.render("index.ejs",{posts})
})


app.get("/posts/new",(req,res)=>{
    res.render("newpost.ejs");
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post)
    res.render("show.ejs", {post})
})

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content
    console.log(newContent)
     let post = posts.find((p) => id === p.id);
     post.content = newContent;
     console.log(post)
    res.send("working patch")
})


app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let { username, content}= req.body;
    posts.push({ id, username,content});
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post})

})

app.listen(port,()=>{
    console.log("server is running")
})