const exceptionsList = {
    TokenExpiredError: res => {
        res.status(401).send({ error: 'session invalid' })
    }

    , JsonWebTokenError: res => {
        res.status(401).send({ error: 'session invalid' })
    }

    , defaultReturn: (res, error) => {
        console.error(error.name)
        res.status(500).end()
    }
}

module.exports = (error, req, res, next) => {
    const ret = exceptionsList[error.name] || exceptionsList.defaultReturn

    ret(res, error)
}