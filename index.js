require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config/config");
const auth = require("./middleware/auth");

// Inisialisasi Express.js
const app = express();
const port = process.env.PORT || 3000;

// Parsing body request menjadi JSON
app.use(bodyParser.json());

// Membuat instance Sequelize dengan menggunakan konfigurasi dari file config.js
const sequelize = new Sequelize(config.development);

// Membuat model User
const User = require("./models/user")(sequelize);

// Membuat model Todo
const Todo = require("./models/todo")(sequelize);

// Relasi antara User dan Todo
User.hasMany(Todo, {
  foreignKey: "userId",
});
Todo.belongsTo(User, {
  foreignKey: "userId",
});

// Endpoint Awal
app.get("/", (req, res) => {
  res.send("Hello Semua, Ini Adalah Endpoint Default / Root");
});

// Endpoint untuk registrasi user baru
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (req.user && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    if (user.role === "admin") {
      res.status(201).json({
        message: "Admin registered successfully.",
      });
    } else {
      res.status(201).json({
        message: "User registered successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Endpoint login untuk semua User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "86400s",
      }
    );

    if (user.role !== "admin") {
      res.json({
        status: "Succes",
        token: token,
        role: user.role,
        massage: "Welcome User",
      });
    } else {
      res.json({
        status: "Succes",
        token: token,
        role: user.role,
        massage: "Welcome Admin",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Endpoint untuk melihat semua users, hanya bisa diakses oleh admin)
app.get("/users", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Only admin users can view all users.",
      });
    }
    const users = await User.findAll({
      where: {
        role: "user",
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Endpoint untuk menambahkan Todo
app.post("/todos", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({
      title,
      description,
      userId: req.user.id,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Endpoint untuk mendapatkan semua todo, yang hanya bisa di akses oleh admin
app.get("/todos", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied.",
      });
    }
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Mendapatkan Todo dengan id yang dapat diakses oleh user, tentunya hanya menampilkan todo yang dimiliki oleh user lewat id todo dan id user
app.get("/todos/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found.",
      });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Endpoint untuk update Todo yang dimiliki oleh user
app.put("/todos/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found.",
      });
    }
    todo.title = title;
    todo.description = description;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Endpoint Delete Todo yang dimiliki oleh user
app.delete("/todos/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found.",
      });
    }
    await todo.destroy();
    res.json({
      message: "Todo deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Delete Semua Todo yang hanya dapat dilakukan oleh admin
app.delete("/todos", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Only admin users can delete all todos.",
      });
    }
    await Todo.destroy({
      where: {},
    });
    res.json({
      message: "All todos deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
