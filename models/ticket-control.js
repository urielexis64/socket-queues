const path = require("path");
const fs = require("fs");

class Ticket {
	constructor(number, desktop) {
		this.number = number;
		this.desktop = desktop;
	}
}

class TicketControl {
	constructor() {
		this.last = 0;
		this.today = new Date().getDate();
		this.tickets = [];
		this.last4 = [];

		this.init();
	}

	get toJson() {
		return {
			last: this.last,
			today: this.today,
			tickets: this.tickets,
			last4: this.last4,
		};
	}

	init() {
		const {today, last, tickets, last4} = require("../db/data.json");
		if (today === this.today) {
			this.last = last;
			this.tickets = tickets;
			this.last4 = last4;
		} else {
			// Other day
			this.saveDB();
		}
	}

	saveDB() {
		const dbPath = path.join(__dirname, "../db/data.json");
		fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
	}

	next() {
		this.last += 1;
		const ticket = new Ticket(this.last, null);
		this.tickets.push(ticket);

		this.saveDB();
		return "Ticket " + ticket.number;
	}

	attendTicket(desktop) {
		if (this.tickets.length === 0) {
			return null;
		}

		const ticket = this.tickets.shift();
		ticket.desktop = desktop;

		this.last4.unshift(ticket);

		if (this.last4.length > 4) {
			this.last4.splice(-1, 1); // starts from the last element (-1)
		}

		this.saveDB();

		return ticket;
	}
}

module.exports = TicketControl;
