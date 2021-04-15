const https = require("https")
const fs = require("fs")
const path = require("path")

const resultDir = path.join(__dirname, "result")

const options = {
    hostname: "jsonplaceholder.typicode.com",
    path: "/posts",
    method: "GET"
}


const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    let bufferStream = ''

    res.on("data", bufferChunk => {
        //accumulate buffer chunks
        bufferStream += bufferChunk
    })

    res.on("end", () => {

        // make result folder in script directory
        try {
            if (!fs.existsSync(resultDir)) {
                fs.mkdirSync(resultDir)
            }
        } catch(err) {
            console.error(err)
        }

        //write buffer to file
        fs.writeFile(path.join(resultDir, "posts.json"), bufferStream, () => {
            console.log(`${path.join(resultDir, "posts.json")} created`)
        })
    })
})
    

req.on("error", error => {
    console.error(error)
})

req.end()

