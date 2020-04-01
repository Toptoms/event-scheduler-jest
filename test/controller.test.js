import EventSerializer from "../src/serializer";
import EventService from "../src/services";
import Event from "../src/models";
import EventController from "../src/controller";
import httpMocks from "node-mocks-http"
import EventRepository from "../src/repository";

jest.mock("../src/services");
jest.mock("../src/serializer");

describe("Event Controller",()=> {

    let firstEvent = new Event(new Date('2018-12-17T03:24:00'),new Date('2018-12-17T03:30:00'),"First event","Campus Numerique","This is an hello world..");
    let lastEvent = new Event(new Date('2020-04-01T09:00:00'),new Date('2020-04-01T17:00:00'),"Unit test againt","Campus Numerique","This is an hello world..");
    let thirdEvent = new Event(new Date('2019-12-17T03:24:00'),new Date('2019-12-17T13:24:00'),"Hello World","Campus Numerique","This is an hello world..");
    let shortestEvent = firstEvent;

    let getEvents = jest.fn().mockImplementation(() => [
        firstEvent,lastEvent,thirdEvent
    ]);

    let getFirstEvent = jest.fn().mockImplementation(() => firstEvent);

    let getLastEvent = jest.fn().mockImplementation(() => lastEvent);

    let getLongestEvent = jest.fn().mockImplementation(() => lastEvent);

    let getShortestEvent = jest.fn().mockImplementation(() => shortestEvent);

    let serialize = jest.fn().mockImplementation(() => "Serialized");

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventService.mockImplementation(() => {
            return {
                getEvents: getEvents,
                getFirstEvent: getFirstEvent,
                getLastEvent: getLastEvent,
                getLongestEvent: getLongestEvent,
                getShortestEvent: getShortestEvent,
            }
        });
        EventSerializer.mockImplementation(() => {
           return {
               serialize: serialize
           }
        });
        EventService.mockClear();
        EventSerializer.mockClear();
        serialize.mockClear();
        getFirstEvent.mockClear();
        getLastEvent.mockClear();
        getLongestEvent.mockClear();
        getShortestEvent.mockClear();
        serialize.mockClear();
    });

    test('getAll', async () => {
        let eventController = new EventController(new EventService(),new EventSerializer());
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        await eventController.getAll(req,res);
        expect(getEvents).toHaveBeenCalledTimes(1);
        expect(serialize).toHaveBeenCalledTimes(1);
        expect(res._getData()).toBe("Serialized");
    })

    test('getFirst', async () => {
        let eventController = new EventController(new EventService(),new EventSerializer());
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        await eventController.getFirst(req,res);
        expect(getFirstEvent).toHaveBeenCalledTimes(1);
        expect(serialize).toHaveBeenCalledTimes(1);
        expect(res._getData()).toBe("Serialized");
    })

    test('getLast', async () => {
        let eventController = new EventController(new EventService(),new EventSerializer());
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        await eventController.getLast(req,res);
        expect(getLastEvent).toHaveBeenCalledTimes(1);
        expect(serialize).toHaveBeenCalledTimes(1);
        expect(res._getData()).toBe("Serialized");
    })

    test('getLongest', async () => {
        let eventController = new EventController(new EventService(),new EventSerializer());
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        await eventController.getLongest(req,res);
        expect(getLongestEvent).toHaveBeenCalledTimes(1);
        expect(serialize).toHaveBeenCalledTimes(1);
        expect(res._getData()).toBe("Serialized");
    })

    test('getShortest', async () => {
        let eventController = new EventController(new EventService(),new EventSerializer());
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        await eventController.getShortest(req,res);
        expect(getShortestEvent).toHaveBeenCalledTimes(1);
        expect(serialize).toHaveBeenCalledTimes(1);
        expect(res._getData()).toBe("Serialized");
    })
});