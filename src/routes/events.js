import express from 'express';
import EventController from "../controller"
import EventRepository, {InMemoryEventRepository} from "../repository";
import EventService from "../services";
import EventSerializer from "../serializer";
import Event from "../models";
var router = express.Router();

/// Wire app dependencies
// Should be done using DI

// Create fake event ot populate DB
let evts = [
    new Event(new Date('2019-12-17T03:24:00'),new Date('2019-12-17T13:24:00'),"Hello World","Campus Numerique","This is an hello world.."),
    new Event(new Date('2018-12-17T03:24:00'),new Date('1995-12-17T03:24:00'),"First event","Campus Numerique","This is an hello world.."),
    new Event(new Date('2020-04-01T09:00:00'),new Date('2020-04-01T17:00:00'),"Unit test againt","Campus Numerique","This is an hello world..")
];

// We use in-memory Repository we shall use a real database
let eventRepository = new InMemoryEventRepository(evts);
let eventService = new EventService(eventRepository);
let eventSerializer = new EventSerializer();
let eventController = new EventController(eventService,eventSerializer);

/* GET users listing. */
router.get('/', eventController.getAll.bind(eventController));

/* GET users listing. */
router.get('/first', eventController.getFirst.bind(eventController));

/* GET users listing. */
router.get('/last', eventController.getLast.bind(eventController));

/* GET users listing. */
router.get('/longest', eventController.getLongest.bind(eventController));

/* GET users listing. */
router.get('/shortest', eventController.getShortest.bind(eventController));

module.exports = router;
