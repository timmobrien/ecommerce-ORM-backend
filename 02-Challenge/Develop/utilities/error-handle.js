

function handleError500(res) {
    return err => {
        console.log(err)
        res.status(500).json({
            error: "Uh oh, there has been an error"
        })
    }
}

module.exports = {handleError500}