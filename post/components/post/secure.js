const auth = require('../../../auth')

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case 'update':
        const user_edit = req.body.autor
        auth.check.own(req, user_edit)
        next()
        break
      case 'remove':
        const user_delete = req.body.autor
        auth.check.own(req, user_delete)
        next()
        break

      default:
        next()
        break
    }
  }

  return middleware
}
