const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
	socket.emit("last-ticket", ticketControl.last);
	socket.emit("current-status", ticketControl.last4);
	socket.emit("pending-tickets", ticketControl.tickets.length);

	socket.on("next-ticket", (payload, callback) => {
		const next = ticketControl.next();

		callback(next);

		socket.broadcast.emit("pending-tickets", ticketControl.tickets.length);
	});

	socket.on("attend-ticket", ({desktop}, callback) => {
		if (!desktop) {
			return callback({ok: false, msg: "Desktop is required"});
		}

		const ticket = ticketControl.attendTicket(desktop);

		socket.broadcast.emit("current-status", ticketControl.last4);
		socket.emit("pending-tickets", ticketControl.tickets.length);
		socket.broadcast.emit("pending-tickets", ticketControl.tickets.length);

		if (!ticket) {
			callback({ok: false, msg: "There is no pending tickets"});
		} else {
			callback({ok: true, ticket});
		}
	});
};

module.exports = {
	socketController,
};
