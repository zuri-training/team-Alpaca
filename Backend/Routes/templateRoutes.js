const templateController = require('../controllers/templateController');
const multer = require('multer');
const fs = require('fs');
const express = require('express');
const router = express.Router();


const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: Storage
});

// to update the views, the API endpoint is '/templates/likes:id' where
// id is the id of the template being liked. The same goes for views.
// the uploading must be done by the administrators, so there must be an account
// for the dministrator who will upload the templates.
// the get endpoint retrieves all templates from the database for rendering
// on the frontend. No need to get one by one since the users must see all
// the templates available.

router
    .get('/', templateController.getAllTemplates)
    .post('/', upload.single('template'), templateController.uploadTamplate)
    .put('/likes:id', templateController.updateTemplateLikes)
    .put('/views:id', templateController.updateTemplateViews);

module.exports = router;