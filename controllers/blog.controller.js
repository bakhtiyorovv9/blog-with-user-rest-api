const path = require("node:path");
const { readFile, writeFile } = require("../helpers/fs");

const blogsPath = path.join(process.cwd(), "data", "blogs.json");
const usersPath = path.join(process.cwd(), "data", "users.json");

exports.getAllBlogs = (req, res) => {
    const data = readFile(blogsPath);

    res.status(200).send({
        success: true,
        data: data,
    });
};

exports.getBlogById = (req, res) => {
    const data = readFile(blogsPath);
    const blogId = req.params.id;

    const blog = data.find((blog) => blog.id == blogId);

    if (!blog) {
        res.status(404).send({
            success: false,
            message: "blog not found",
        });
    }

    res.send({
        success: true,
        data: blog,
    });
};

exports.deleteBlogById = (req, res) => {
    const data = readFile(blogsPath);
    const blogId = req.params.id;

    const blog = data.find((blog) => blog.id == blogId);
    const blogIndex = data.findIndex((blog) => blog.id == blogId);

    if (!blog) {
        res.status(404).send({
            success: false,
            message: "blog not found",
        });
        return;
    }
    data.splice(blogIndex, 1);
    writeFile(blogsPath, data);

    res.send({
        success: true,
        messageb: `blog id: ${blogId} deleted`,
    });
};
exports.getUserWithBlogs = (req, res) => {
    const { id: userId } = req.params;

    const data = readFile(usersPath);

    const foundedUser = data.find((el) => el.id == userId);

    if (!foundedUser) {
        return res.status(404).send({
            success: false,
            message: "Not found",
        });
    }
    const blogs = readFile(blogsPath);

    const userBlogs = blogs.filter((blog) => blog.userId == userId);

    res.send({
        success: true,
        data: {
            ...foundedUser,
            blogs: userBlogs,
        },
    });
};
exports.createBlog = (req, res) => {
    const { title, content, userId, createdAt, updatedAt } = req.body;

    if (!title || !content || !userId || !createdAt || !updatedAt) {
        res.status(404).send({
            success: false,
            message: "all field not must",
        });
        return;
    }

    const data = readFile(blogsPath);

    const lastId = data.sort((a, b) => a.id - b.id).at(-1);


    res.send({
        success: true
    })
};
