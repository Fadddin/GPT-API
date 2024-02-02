import { config } from "dotenv";
import readline from "readline";
import OpenAI from "openai";
import express from "express";

config();

const app = express()

app.use(express.json())



const openAi = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});

app.post("/", async (req, res) => {
    //Make OpenAI completion request with user input
    const data = await openAi.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.info }],
    })
    res.status(200).json({
        msg: data.choices[0].message.content
    })
})

app.listen(4000, () => console.log("working"))

