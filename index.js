 import express from "express";
 import session from "express-session";
 import bodyParser from "body-parser";

 const app = express();
 const port = 3000;

 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({ extended: true }));
 
 // This session is to pass information between routes
 app.use(session({
    secret: 'CP_Andrek@27',
    resave: false,
    saveUninitialized: false
}))
 //Home Page
 app.get("/", (req, res) => {
    console.log(req.session);
    res.render("index.ejs", req.session);
 });

 //Blog Page
 app.get("/blog", (req, res) => {
    console.log(req.session);
    res.render("blog.ejs", req.session);
 });

 // Create Page
 app.get("/create", (req, res) => {
    res.render("create.ejs");
 });

 // Update Page
 app.get("/update", (req, res) => {
    console.log(req.session);
    res.render("update.ejs", req.session);
 });

 app.post("/submit", (req, res) => {
    req.session.title = req.body.title;
    req.session.blog = req.body.blog;
    res.redirect("/blog");
 });

 //Delete PAge
 app.post("/delete", (req, res) => {
   if(req.session.title && req.session.blog){
      delete req.session.title;
      delete req.session.blog;
      res.redirect('/');
      console.log("True");
   }else {
      res.redirect('/');
      console.log('Information not found in session.');
   }
 });

 // Create About
 app.get("/about", (req, res) => {
    res.render("about.ejs");
 });

 app.listen(port, ()=>{
    console.log(`Listening on port ${[port]}`);
 });