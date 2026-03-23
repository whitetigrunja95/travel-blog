import express from "express";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const users = [];
let currentUser = null;

const posts = [
  {
    id: 1,
    title: "Утро в Стамбуле",
    excerpt: "Город, где восток и запад встречаются в одном ритме.",
    description:
      "Стамбул с первых минут встречает шумом улиц, криками чаек и запахом свежего кофе. Это город, в котором старинные мечети соседствуют с современными кварталами, а паромы через Босфор становятся частью повседневной жизни.",
    country: "Турция",
    city: "Стамбул",
    photo:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80",
    comments: [
      {
        id: 1,
        author_name: "Мария",
        comment: "Очень атмосферно написано!",
        created_at: new Date().toISOString(),
      },
    ],
    userInfo: {
      full_name: "Анна Смирнова",
      city: "Москва",
      bio: "Люблю самостоятельные путешествия и уютные города.",
    },
  },
  {
    id: 2,
    title: "Три дня в Париже",
    excerpt: "Париж оказался не только про Эйфелеву башню.",
    description:
      "Париж — это булочные, тихие дворики и красивый вечерний свет. Это город, в который хочется возвращаться медленно и вдумчиво.",
    country: "Франция",
    city: "Париж",
    photo:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    comments: [],
    userInfo: {
      full_name: "Елена Орлова",
      city: "Киев",
      bio: "Путешествую ради впечатлений, музыки и новых вкусов.",
    },
  },
];

app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({
      error: "User already exists",
    });
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    full_name: "",
    city: "",
    country: "",
    bio: "",
  };

  users.push(newUser);
  currentUser = newUser;

  return res.json({
    token: `mock-token-${newUser.id}`,
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) {
    return res.status(400).json({
      error: "Invalid credentials",
    });
  }

  currentUser = user;

  return res.json({
    token: `mock-token-${user.id}`,
  });
});

app.get("/api/logout", (req, res) => {
  currentUser = null;

  return res.json({
    message: "User logged out",
  });
});

app.get("/api/user", (req, res) => {
  if (!currentUser) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  return res.json({
    id: currentUser.id,
    full_name: currentUser.full_name,
    city: currentUser.city,
    country: currentUser.country,
    bio: currentUser.bio,
    email: currentUser.email,
  });
});

app.get("/api/posts", (req, res) => {
  const postsList = posts.map(({ id, title, excerpt, photo }) => ({
    id,
    title,
    excerpt,
    photo,
  }));

  return res.json(postsList);
});

app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({
      error: "Post not found.",
    });
  }

  return res.json(post);
});

app.get("/api/posts/:id/comments", (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({
      error: "Post not found.",
    });
  }

  return res.json(post.comments);
});

app.post("/api/posts/:id/comments", (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));

  if (!post) {
    return res.status(400).json({
      error: "Post not found.",
    });
  }

  const { full_name, comment } = req.body;

  if (!full_name || !comment) {
    return res.status(400).json({
      error: "full_name and comment are required",
    });
  }

  const newComment = {
    id: post.comments.length + 1,
    post_id: post.id,
    author_name: full_name,
    comment,
    created_at: new Date().toISOString(),
  };

  post.comments.push(newComment);

  return res.json(newComment);
});

app.listen(PORT, () => {
  console.log(`Mock API is running on http://localhost:${PORT}`);
});