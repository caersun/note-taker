// Dependencies
// const { fstat } = require("fs");
const fs = require("fs");

// Routing
module.exports = function(app) {
    // API GET request
    // Reading db.json and returning saved notes
    app.get("/api/notes", (req, res) => {
        fs.readFile(__dirname + "/../db/db.json", (err, data) => { 
            if (err) throw err;
            let storedNotes = JSON.parse(data);
            return res.json(storedNotes);
        })
    });

    // API POST request
    // Saving notes
    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        let savedNotes = [];
        let id = 0;
        
        fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) => { // took away "utf8" paramater between dirname and (err,data)
            if (err) throw err;

            savedNotes = JSON.parse(data);

            for (let i = 0; i < savedNotes.length; i++) {
                if (savedNotes[i].id > id) {
                    id = savedNotes[i].id;
                }
            }

            newNote.id = parseInt(id) + 1;
            savedNotes.push(newNote);

            fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(savedNotes), "utf8", err => {
                if (err) throw err;
                res.end();
            })
        })
    })

    // API DELETE
    // Delete notes
    app.delete("/api/notes/:id", (req, res) => {
        let noteTBD = req.params.id;

        fs.readFile(__dirname + "/../db/db.json", "utf8", (err,data) => {
            if (err) throw err;

            let restNotes = JSON.parse(data).filter((entry) => {
                return entry.id != noteTBD; // took away !==
            });

            fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(restNotes), "utf8", err => {
                if (err) throw err;
                res.end();
            })
        })
    })
}