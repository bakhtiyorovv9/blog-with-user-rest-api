const express = require("express");
const { getAllUsers, getUserById, deleteUserById, createUser, } = require("./controllers/user.controller");
const { getAllBlogs, getBlogById, deleteBlogById, getUserWithBlogs, createBlog } = require("./controllers/blog.controller");
const app = express();

app.use(express.json())

app.get("/users", getAllUsers);
app.get("/users/:id", getUserById);
app.delete("/user/:id", deleteUserById);
app.post("/user", createUser);

app.get("/blogs", getAllBlogs);
app.get("/blogs/:id", getBlogById);
app.delete("/blog/:id", deleteBlogById);
app.get("/user-with-blogs/:id", getUserWithBlogs);
app.post("/blog", createBlog);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})