/* 
    User Routes / Events
    host + /api/events
*/

const { Router } = require('express');
const { tokenValidator } = require('../middlewares/token-validator');

const {
  getEvents,
  createEvent,
  updateEvent,
  removeEvent,
} = require('../controllers/events');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

// router.get('/',tokenValidator, getEvents);
// router.post('/',tokenValidator, createEvent);
// router.put('/:id',tokenValidator, updateEvent);
// router.delete('/:id',tokenValidator, removeEvent);

router.use(tokenValidator);

router.get(
  '/',
  getEvents
);
router.post(
  '/',
  [
    check('title', 'Title is required.').not().isEmpty(),
    fieldsValidator,
    check('start', 'Start is mandatory.').custom(isDate),
    fieldsValidator,
    check('end', 'End is mandatory.').custom(isDate),
    fieldsValidator,
  ],
  createEvent
);
router.put('/:id', updateEvent);
router.delete('/:id', removeEvent);

module.exports = router;
