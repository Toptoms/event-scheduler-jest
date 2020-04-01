
import EventRepository from "./repository";
import Event from "./models";

export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcomming event
     * @return {null | Event}
     */
    getFirstEvent() {
        let results = this._eventRepository.getAll();
        results.sort((a, b) => {
            return a.startTime - b.startTime;
        });
        const result = results[0];
        return result; // ou results.shift() renvoie le premier objet du tableau
    }

    /**
     * Get the last upcomming event
     * @return {null | Event}
     */
    getLastEvent() {
        let results = this._eventRepository.getAll();
        results.sort((a, b) => {
           return b.startTime - a.startTime;
        });
        const result = results[0];
        return result; // ou results.shift() renvoie le premier objet du tableau
    }

    /**
     * Get the longest event
     * @return {null | Event}
     */
    getLongestEvent() {
        let results = this._eventRepository.getAll();
        results.sort((a, b) => {
           return (b.startTime - b.startTime) - (a.startTime - a.startTime)
        });
        const result = results[0];
        return result; // ou results.shift() renvoie le premier objet du tableau
    }

    /**
     * get the shortest event
     * @return {null | Event}
     */
    getShortestEvent() {
        let results = this._eventRepository.getAll();
        results.sort((a, b) => {
           return (a.startTime - a.startTime) - (b.startTime - b.startTime)
        });
        const result = results[0];
        return result; // ou results.shift() renvoie le premier objet du tableau
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        return null
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     */
    isLocationAvailable(time) {
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        return this.hasEventOn(new Date(now));
    }

}