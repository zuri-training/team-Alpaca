const mongoose = require('mongoose');
const TemplateModel = require('../model/templateModel');
const fs = require('fs/promises');


const uploadTamplate = async (req, res, next) => {
    if (req.file == null) {
        // If Submit was accidentally clicked with no file selected...
        res.status(400).json({
            success: false
        });
    } else {
        try {
            const newImg = await fs.readFileSync(req.file.path);
            const encImg = newImg.toString('base64');
            let obj = {
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                description: req.body.desc,
                image: {
                    data: Buffer.from(encImg, 'base64'),
                    contentType: req.file.mimetype
                }
            }


            await TemplateModel.create(obj)
            res.json({
                success: true
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                success: false
            });
        }
    }
};

const getAllTemplates = async (req, res) => {
    const templates = await TemplateModel.find();;
    try {
        // console.log({
        //     items: items
        // });
        res.json({
            templates: templates
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred', err);
    }

};

const updateTemplateViews = async (req, res) => {
    try {
        await TemplateModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json({
            success: true
        });

    } catch (error) {
        console.error(err.message);
        res.json({
            success: true
        });
    }
};

const updateTemplateLikes = async (req, res) => {
    try {
        await TemplateModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json({
            success: true
        });

    } catch (error) {
        console.error(err.message);
        res.json({
            success: true
        });
    }
};

module.exports = {
    uploadTamplate,
    getAllTemplates,
    updateTemplateViews,
    updateTemplateLikes
};