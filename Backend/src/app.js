const express = require("express");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const cookieParser = require("cookie-parser")
const cors = require("cors")


const app = express();



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser()); 

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working! ✅' });
});

app.use('/api/auth' , authRoutes);  
app.use('/api/posts', postRoutes);

module.exports = app;

