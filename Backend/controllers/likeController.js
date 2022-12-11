const Like = require('../model/like');

// get the number of likes a document has
exports.getLikeCount = async (req, res) => {
    try {
        let documentId = req.params.documentId;
        res.json({
            likes: await Like.findById(documentId).length
        });
    } catch (err) {
        res.status(404).json({
            error: err
        });
    }
};

// add like to a document
exports.likeDocument = async (req, res) => {
    try {
        let documentId = req.params.documentId;
        const updated = await findById(documentId).likes;
        $push(updated, req.body);
        const options = {
            new: true
        }
        await findByIdAndUpdate(documentId, updated, options);
        res.json({
            success: true
        })
    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
};

// unlike a document
exports.unlikeDocument = async (req, res) => {
    try {
        let documentId = req.params.documentId;
        const updated = await findById(documentId).likes;
        $pull(updated, req.body);
        const options = {
            new: true
        }
        await findByIdAndUpdate(documentId, updated, options);
        res.json({
            success: true
        })
    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
};