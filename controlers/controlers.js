const insertProductQuery = require('../queries/insert.product')
const deleteProductQuery = require('../queries/delete.product')
const updateProductQuery = require('../queries/update.product')
const getProductByIdQuery = require('../queries/get.product')
const insertCategoryQuery = require('../queries/insert.category')
const getCategoryQuery = require('../queries/get.category')
const getProductByUserIdQuery = require('../queries/get.product.userId')
const minioConsts = require('../../_sharedModules/minioConsts');
const uploadAttachment = require('../../_sharedModules/uploadAttachment');
const updateProductMediaQuery = require('../queries/update.product.media')
const utils = require('../src/utils')
const gearman = require('gearman');
const client = gearman(process.env.GEARMAN_SERVER, process.env.GEARMAN_PORT);
const MSG_TYPES = require('../../_sharedModules/MSG_TYPES');
const cache = require('../../_sharedModules/cacheAS');

// ----------- cassandra ---------------
const tuple = require('../../_sharedModules/DBManager/_tuple');

const savePost = require('../../_sharedModules/DBManager/post/savePost');

client.on('timeout', () => {
    globalLogger.logGeneralError(null, null, 'Timeout has been occured during server initializing');
});

client.connect(() => {
    globalLogger.logInfo('Job server started successfully');
});

function createProduct(req, res, next) {
    const product = {
        name: req.body.name,
        price: req.body.price,
        business_id: res.locals.user.id,
        description: req.body.description,
        cat1: req.body.cat1,
        cat2: req.body.cat2,
        cat3: req.body.cat3,
        cat4: req.body.cat4
    };

    product.tags = utils.createTag(product);
    insertProductQuery(product)
        .then(function (result) {
            res.status(200).json({
                id: result._id
            });
        }).catch(function (error) {
            next(error)
        });
};

function deleteProduct(req, res, next) {
    const productId = req.params.id;

    deleteProductQuery(productId).then(function () {
        res.json({
            message: 'product was deleted'
        });
    }).catch(function (error) {
        next(error)
    });
}

function updateProduct(req, res, next) {

    const productId = req.params.id;
    updateProductQuery(productId, req.body).then(function () {
        res.json({
            message: 'the product was updated'
        });
    }).catch(function (error) {
        next(error)
    });
}

function getProductById(req, res, next) {

    const productId = req.params.id;
    getProductByIdQuery(productId).then(function (product) {
        res.json({ product });
    }).catch(function (error) {
        next(error)
    });
}

function getProductByUserId(req, res, next) {
    const page = Number(req.params.page) * 20
    getProductByUserIdQuery(res.locals.user.id, page).then(function (products) {
        res.json({ products });
    }).catch(function (error) {
        next(error)
    });
}

function createCategory(req, res, next) {
    insertCategoryQuery(req.body)
        .then(function (result) {
            res.status(200).json({
                id: result._id
            });
        }).catch(function (error) {
            next(error)
        });
}

function getCategoryByparId(req, res, next) {
    const parId = req.params.parId
    getCategoryQuery(parId ? parId : null).then(function (categorys) {
        res.json({ categorys });
    }).catch(function (error) {
        next(error)
    });
}

const allowedWidths = [150, 240, 320, 480, 640, 750, 1080];

async function uploadProductImage(req, res, next) {
    try {

        // ----------- validation -------------

        const imageName = req.params.imageName;
        const pID = req.params.product;
        const fromBytes = req.params.fromBytes;
        const width = req.params.width;
        const height = req.params.height;
        const uid = res.locals.user.id;
        const HQFileName = `${width}_${height}_${imageName}`
        const mediaIndex = req.params.mediaIndex;
        const lastFile = req.params.lastFile;
        const business_id = res.locals.user.id

        let widthIndex = allowedWidths.indexOf(Number(width));
        if (widthIndex <= -1) {
            return res.status(403).send('allowed widths: ' + allowedWidths);
        } else if (height > (width * 2) || height < (width / 4)) {
            return res.status(403).send('height roules: height <= (width * 2) && height >= (width / 4)');
        }
        // ----------- upload callback -------------

        const callback = async (err) => {
            if (err) {
                return res.status(500).send(err);
            }

            const imageSizes = [HQFileName];
            widthIndex--;
            for (widthIndex; widthIndex >= 0; widthIndex--) {
                const newWidth = allowedWidths[widthIndex];
                const newHeight = parseInt(height / (width / newWidth));
                const newName = `${newWidth}_${newHeight}_${imageName}`;
                imageSizes.push(newName);
                client.submitJob(process.env.JOB_IMAGE_RESIZER, JSON.stringify({ owner: uid, fileName: HQFileName, newWidth, newHeight, newName }));
            }

            updateProductMediaQuery(pID, imageSizes, Number(mediaIndex), 1, lastFile, business_id).then(result => {
                return res.status(200).send(true);
            }).catch(error => {
                next(error);
            })
        };

        // ----------- check file status -------------

        const stat = await uploadAttachment.checkFile(uid, HQFileName, minioConsts.userImagesBucketPrefix);
        if (stat.status === 'complete') {
            return callback();
        } else if ((stat.status === 'incomplete' && stat.size !== fromBytes) || (stat.status === 'notfound' && fromBytes != 0)) {
            return res.status(400).send(stat);
        }

        // ----------- upload file -------------

        uploadAttachment.upload(
            req,
            uid,
            HQFileName,
            fromBytes,
            stat,
            minioConsts.userImagesBucketPrefix,
            15000000, // as byte - 15mb
            null, ///\.(jpg|jpeg|png)$/i,
            callback
        );

    } catch (error) {
        next(error);
    }
}

async function uploadProductVideo(req, res, next) {
    try {

        // ----------- validation -------------

        const videoName = `${req.params.width}_${req.params.height}_${req.params.videoName}`;
        const pID = req.params.product;
        const fromBytes = req.params.fromBytes;
        const mediaIndex = req.params.mediaIndex;
        const lastFile = req.params.lastFile;
        const business_id = res.locals.user.id

        // ----------- upload callback -------------

        const callback = async (err) => {

            if (err) {
                return res.status(403).send(err);
            }

            updateProductMediaQuery(pID, [videoName], Number(mediaIndex), 2, lastFile, business_id).then(result => {
                res.status(200).send(true);
            }).catch(error => {
                next(error);
            })
            return res.status(200).send(true);
        };

        // ----------- check file status -------------

        const stat = await uploadAttachment.checkFile(res.locals.user.id, videoName, minioConsts.userVideosBucketPrefix);
        if (stat.status === 'complete') {
            return callback();
        } else if ((stat.status === 'incomplete' && stat.size !== fromBytes) || (stat.status === 'notfound' && fromBytes != 0)) {
            return res.status(400).send(stat);
        }

        // ----------- upload file -------------

        uploadAttachment.upload(
            req,
            res.locals.user.id,
            videoName,
            fromBytes,
            stat,
            minioConsts.userVideosBucketPrefix,
            50000000,// as byte - 50mb 
            null, ///\.(jpg|jpeg|png)$/i,
            callback
        );

    } catch (error) {
        next(error);
    }
}

async function productToPost(req, res, next) {
    try {
        
        const owner = res.locals.user;
        const uid = owner.id;
        const productID = req.body.productID;
        const can_comment = req.body.comment;
        const caption = req.body.caption;
        const cats = req.body.cats;

        const product = await getProductByIdQuery(productID);

        const media = product.medias.map((media) => {
            return tuple(media[0], media[1], media[2]);
        });
        const post = { can_comment, caption, media, owner: uid, type: 0, cats };
        const newID = await savePost(post);

        const message = {
            type: MSG_TYPES.NEW_POST,
            msg: `New post from ${owner.username}`,
            metadata: {
                postID: newID,
                caption: caption
            },
            sender: uid,
            sender_name: owner.name,
            sender_family: owner.family,
            sender_uname: owner.username,
            sender_avatar: owner.avatar
        };
        client.submitJob(process.env.JOB_COPY_POST, JSON.stringify({ message, post: { ...post, id: newID } }));
        await cache.createLikeKeyOfPost(newID);
        await cache.createCommentKeyOfPost(newID);
        return res.status(200).send(newID);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    createCategory,
    getCategoryByparId,
    getProductByUserId,
    uploadProductImage,
    uploadProductVideo,
    productToPost
};
