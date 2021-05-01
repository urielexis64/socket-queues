const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
	socket.emit("last-ticket", ticketControl.last);

	socket.on("next-ticket", (payload, callback) => {
		const next = ticketControl.next();

		callback(next);

		// TODO: Notify that there is a new ticket pending to assign
	});

	socket.on("attend-ticket", ({desktop}, callback) => {
		if (!desktop) {
			return callback({ok: false, msg: "Desktop is required"});
		}

		const ticket = ticketControl.attendTicket(desktop);

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
