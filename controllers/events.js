const { response } = require('express');
const Events = require('../models/Events');

const getEvents = async (req, res = response, next) => {

  const events = await Events.find().populate('user', 'name email')

  return res.status(200).json({
    ok: true,
    msg: 'getEvents',
    events
  });
};

const createEvent = async (req, res = response, next) => {
  const newEvent = new Events(req.body);

  try {
    newEvent.user = req.uid;
    const savedEvent = await newEvent.save();

    return res.status(200).json({
      ok: true,
      msg: 'createEvent',
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg: 'An error ocurred while trying to create an event.'
    })
  }
};

const updateEvent = async (req, res = response, next) => {

  const eventId = req.params.id;

  try {
     
    const event = await Events.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event doesnt exist with this ID.'
      })
    }
    
    console.log( { userId: event.user.toString(), uid: req.uid });

    if ( event.user.toString() !== req.uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'User has no privilegies to update this event.',
      });
    }

    const newEvent = {
      ...req.body,
      user: req.uid
    }

    const updatedEvent = await Events.findByIdAndUpdate(eventId, newEvent, { new: true });
    return res.status(201).json({
      ok: true,
      event: updatedEvent,
    });


  } catch (error) {    
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'An error ocurred while trying to update an event.',
    });
  }
  
};

const removeEvent = async (req, res = response, next) => {

  const eventId = req.params.id;
  
  try {
     const event = await Events.findById(eventId);
     if (!event) {
       return res.status(404).json({
         ok: false,
         msg: 'Event doesnt exist with this ID.',
       });
     }

     if (event.user.toString() !== req.uid) {
       return res.status(401).json({
         ok: false,
         msg: 'User has no privilegies to delete this event.',
       });
     }

    const removedEvent = await Events.findByIdAndDelete(eventId, { rawResult: true });
     return res.status(201).json({
       ok: true,
       event: removedEvent,
     });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'An error ocurred while trying to remove an event.',
    });
  }
  
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  removeEvent,
};
