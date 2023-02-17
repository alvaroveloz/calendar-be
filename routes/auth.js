/* 
    User Routes / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, refreshToken } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { tokenValidator } = require('../middlewares/token-validator');

const router = Router();

router.post(
  '/new',
  [
    //middlewares
    check('name', 'Name is required!.').not().isEmpty(),
    check('email', 'Email is required!.').not().isEmpty(),
    check('email', 'Email has incorrect format.').isEmail(),
    check('password', 'Password is required!.').not().isEmpty(),
    check('password', 'Password should be greater than 6 characters').isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  createUser
);

router.post(
  '/',
  [
    //middlewares
    check('email', 'Email is required!.').not().isEmpty(),
    check('email', 'Email has incorrect format.').isEmail(),
    check('password', 'Password is required!.').not().isEmpty(),
    check('password', 'Password should be greater than 6 characters').isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  loginUser
);

router.get('/refresh', tokenValidator, refreshToken);

module.exports = router;
