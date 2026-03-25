import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const defaultPosts = [
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
        post_id: 1,
        author_name: "Мария",
        comment: "Очень атмосферно написано!",
        created_at: new Date().toISOString(),
      },
    ],
    userInfo: {
      full_name: "Анна Смирнова",
      city: "Москва",
      country: "Россия",
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
      country: "Украина",
      bio: "Путешествую ради впечатлений, музыки и новых вкусов.",
    },
  },
];

const ensureDataFile = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      users: [],
      posts: defaultPosts,
    };

    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
  }
};

const readDb = () => {
  ensureDataFile();

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(raw);

    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      posts: Array.isArray(parsed.posts) ? parsed.posts : defaultPosts,
    };
  } catch (error) {
    console.error("Не удалось прочитать db.json:", error);
    return {
      users: [],
      posts: defaultPosts,
    };
  }
};

const writeDb = (data) => {
  ensureDataFile();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
};

let { users, posts } = readDb();

const saveDb = () => {
  writeDb({ users, posts });
};

const getNextUserId = () => {
  if (users.length === 0) {
    return 1;
  }

  return Math.max(...users.map((user) => user.id)) + 1;
};

const getNextPostId = () => {
  if (posts.length === 0) {
    return 1;
  }

  return Math.max(...posts.map((post) => post.id)) + 1;
};

const getNextCommentId = (post) => {
  if (!Array.isArray(post.comments) || post.comments.length === 0) {
    return 1;
  }

  return Math.max(...post.comments.map((comment) => comment.id || 0)) + 1;
};

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return null;
  }

  return token;
};

const getUserIdFromToken = (token) => {
  if (!token || !token.startsWith("mock-token-")) {
    return null;
  }

  const id = Number(token.replace("mock-token-", ""));
  return Number.isInteger(id) ? id : null;
};

const authMiddleware = (req, res, next) => {
  const token = getTokenFromRequest(req);
  const userId = getUserIdFromToken(token);

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const user = users.find((item) => item.id === userId);

  if (!user) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  req.user = user;
  next();
};

app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const normalizedPassword = String(password).trim();

  const existingUser = users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    return res.status(400).json({
      error: "User already exists",
    });
  }

  const newUser = {
    id: getNextUserId(),
    email: normalizedEmail,
    password: normalizedPassword,
    full_name: "",
    city: "",
    country: "",
    bio: "",
    photo: "",
  };

  users.push(newUser);
  saveDb();

  return res.json({
    token: `mock-token-${newUser.id}`,
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const normalizedPassword = String(password).trim();

  const user = users.find(
    (item) =>
      item.email === normalizedEmail && item.password === normalizedPassword
  );

  if (!user) {
    return res.status(400).json({
      error: "Invalid credentials",
    });
  }

  return res.json({
    token: `mock-token-${user.id}`,
  });
});

app.get("/api/logout", authMiddleware, (req, res) => {
  return res.json({
    message: "User logged out",
  });
});

app.get("/api/user", authMiddleware, (req, res) => {
  return res.json({
    id: req.user.id,
    full_name: req.user.full_name,
    city: req.user.city,
    country: req.user.country,
    bio: req.user.bio,
    photo: req.user.photo,
    email: req.user.email,
  });
});

app.post("/api/user", authMiddleware, upload.single("photo"), (req, res) => {
  const { full_name, city, country, bio } = req.body;

  if (typeof full_name === "string") {
    req.user.full_name = full_name.trim();
  }

  if (typeof city === "string") {
    req.user.city = city.trim();
  }

  if (typeof country === "string") {
    req.user.country = country.trim();
  }

  if (typeof bio === "string") {
    req.user.bio = bio.trim();
  }

  if (req.file) {
    req.user.photo = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
  }

  saveDb();

  return res.json({
    id: req.user.id,
    full_name: req.user.full_name,
    city: req.user.city,
    country: req.user.country,
    bio: req.user.bio,
    photo: req.user.photo,
    email: req.user.email,
  });
});

app.patch("/api/user/password", authMiddleware, (req, res) => {
  const { password } = req.body;

  if (!password || String(password).trim().length < 5) {
    return res.status(400).json({
      error: "Password must be at least 5 characters long",
    });
  }

  req.user.password = String(password).trim();
  saveDb();

  return res.json({
    message: "OK",
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

app.post("/api/posts", authMiddleware, upload.single("photo"), (req, res) => {
  const { title, description, country, city } = req.body;

  if (!title || !description || !country || !city) {
    return res.status(400).json({
      error: "title, description, country and city are required",
    });
  }

  const normalizedTitle = String(title).trim();
  const normalizedDescription = String(description).trim();
  const normalizedCountry = String(country).trim();
  const normalizedCity = String(city).trim();

  const newPost = {
    id: getNextPostId(),
    title: normalizedTitle,
    excerpt: normalizedDescription.slice(0, 120),
    description: normalizedDescription,
    country: normalizedCountry,
    city: normalizedCity,
    photo: req.file
      ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
      : "",
    comments: [],
    userInfo: {
      full_name: req.user.full_name || "",
      city: req.user.city || "",
      country: req.user.country || "",
      bio: req.user.bio || "",
    },
  };

  posts.unshift(newPost);
  saveDb();

  return res.status(200).json(newPost);
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

  return res.json(post.comments || []);
});

app.post("/api/posts/:id/comments", authMiddleware, (req, res) => {
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
    id: getNextCommentId(post),
    post_id: post.id,
    author_name: String(full_name).trim(),
    comment: String(comment).trim(),
    created_at: new Date().toISOString(),
  };

  if (!Array.isArray(post.comments)) {
    post.comments = [];
  }

  post.comments.push(newComment);
  saveDb();

  return res.json(newComment);
});

app.listen(PORT, () => {
  console.log(`Mock API is running on http://127.0.0.1:${PORT}`);
});