const express = require("express");
const router = express.Router();

const db = require("../database/database");

// GET all applications
router.get("/", (req, res) => {
    db.all(
        "SELECT * FROM applications ORDER BY id DESC",
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);
        }
    );
});

// ADD a new application
router.post("/", (req, res) => {
    const {
        company,
        role,
        location,
        application_date,
        status,
        job_link,
        notes
    } = req.body;

    const sql = `
        INSERT INTO applications
        (company, role, location, application_date, status, job_link, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            company,
            role,
            location,
            application_date,
            status,
            job_link,
            notes
        ],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                id: this.lastID,
                message: "Application added successfully"
            });
        }
    );
});

// DELETE an application
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.run(
        "DELETE FROM applications WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "Application deleted successfully"
            });
        }
    );
});


// UPDATE application

router.put("/:id", (req,res)=>{

    const id = req.params.id;


    const {
        company,
        role,
        location,
        application_date,
        status,
        job_link,
        notes

    } = req.body;



    const sql = `

    UPDATE applications

    SET 
    company=?,
    role=?,
    location=?,
    application_date=?,
    status=?,
    job_link=?,
    notes=?

    WHERE id=?

    `;



    db.run(
        sql,
        [
            company,
            role,
            location,
            application_date,
            status,
            job_link,
            notes,
            id
        ],

        function(err){

            if(err){

                return res.status(500)
                .json({
                    error:err.message
                });

            }


            res.json({

                message:"Application updated successfully"

            });


        }
    );


});
module.exports = router;