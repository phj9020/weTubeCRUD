// 최신 js버전으로 바꿔서 바벨 작동 여부 확인
// const express = require('express');
import express from "express";

const app = express();

const PORT = 4000;

// response
const handleListening = () => console.log(`listening... on : http://localhost:${PORT}`);

const handleHome = (req, res) => res.send('Helasdlo from home');

const handleProfile = (req,res) => res.send("You are on my profile")


// create route
app.get("/", handleHome);

app.get("/profile", handleProfile)

// create server
app.listen(PORT, handleListening);

