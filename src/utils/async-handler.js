// We are making an utility or a wrapper of async so that we don't have to write all this syntex everytime when we need to wrap code with async.

// Process 1 (using promise)

const asyncHandler = (requestHandler)=> {
    return (req, res, next)=> {
        Promise.resolve(requestHandler(req, res, next)).catch((err)=> next(err))
    }
}

export {asyncHandler}




// Process 2 (using try catch)

// const asyncHandler = (requestHandler)=> async()=> {
//     try {
//         await requestHandler(req, res, next)
//     } catch(error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }