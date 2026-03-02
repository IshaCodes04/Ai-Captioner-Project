
const generateCaptions = require("./src/service/ai.service");
require("dotenv").config();

async function test() {
    try {
        console.log("Testing AI Service...");
        // A small translucent dot base64
        const testBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
        const caption = await generateCaptions(testBase64);
        console.log("Caption generated:", caption);
    } catch (error) {
        console.error("AI Service Test Failed:", error);
    }
}

test();
