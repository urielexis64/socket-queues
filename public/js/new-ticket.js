// HTML references
const lblNewTicket = document.querySelector("#lblNewTicket");
const btnCreate = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
	btnCreate.disabled = false;
});

socket.on("disconnect", () => {
	btnCreate.disabled = true;
});

socket.on("last-ticket", (ticket) => {
	this.lblNewTicket.innerText = ticket;
});

btnCreate.addEventListener("click", () => {
	socket.emit("next-ticket", null, (ticket) => {
		this.lblNewTicket.innerText = ticket;
	});
});
