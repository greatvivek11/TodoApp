import { toast } from "react-toastify";

export default function InitializingServiceWorker() {
	if ("serviceWorker" in navigator && !import.meta.env.DEV) {
		window.addEventListener("load", () => {
			console.log("On load");
			navigator.serviceWorker
				.register("serviceWorker.js")
				.then(
					(registration) => {
						console.log("Worker registration successful", registration.scope);
						registration.onupdatefound = () => {
							const installingWorker = registration.installing;
							if (installingWorker == null) {
								return;
							}
							installingWorker.onstatechange = () => {
								switch (installingWorker.state) {
									case "installed":
										if (navigator.serviceWorker.controller) {
											console.log("New or updated content is available.");
											toast.info("Update Available! Kindly restart the app.", {
												style: { background: "red" },
												progress: "0",
											});
										} else {
											console.log("Content is now available offline!");
										}
										break;

									case "redundant":
										console.error(
											"The installing service worker became redundant.",
										);
										break;
								}
							};
						};
					},
					(err) => {
						console.log("Worker registration failed", err);
					},
				)
				.catch((err) => {
					console.log(err);
				});
		});
	} else {
		console.log("Service Worker is not supported by browser.");
	}
}
