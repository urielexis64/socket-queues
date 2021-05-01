// HTML References
const lblDesktop = document.querySelector("h1");
const btnAttend = document.querySelector("button");
const lblTicket = document.querySelector("small");
const alertDiv = document.querySelector(".alert");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desktop")) {
	window.location = "index.html";
	throw new Error("Desktop is required");
}

const desktop = searchParams.get("desktop");
lblDesktop.innerText = desktop;

alertDiv.style.display = "none";

const socket = io();

socket.on("connect", () => {
	btnAttend.disabled = false;
});

socket.on("disconnect", () => {
	btnAttend.disabled = true;
});

socket.on("last-ticket", (ticket) => {
	/* this.lblNewTicket.innerText = ticket; */
});

btnAttend.addEventListener("click", () => {
	socket.emit("attend-ticket", {desktop}, ({ok, ticket, msg}) => {
		if (!ok) {
			return (alertDiv.style.display = "");
		}

		lblTicket.innerText = `Ticket ${ticket.number}`;
	});
	/* socket.emit("next-ticket", null, (ticket) => {
		this.lblNewTicket.innerText = ticket;
	}); */
});
