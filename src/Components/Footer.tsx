export default function Footer() {
	const version = import.meta.env.VITE_PACKAGE_VERSION;
	return (
		<footer>
			<div className="sticky inset-x-0 bottom-0 mx-2">
				<span className="text-sm md:text-base">
					Made by{" "}
					<a
						className="text-blue-200"
						href="https://greatvivek11.github.io"
						target="_blank"
						rel="noopener noreferrer"
					>
						Vivek Kaushik
					</a>{" "}
					with ❤️ using{" "}
				</span>
				<span className="text-sm md:text-base font-semibold">
					{" "}
					React, TailwindCSS, Vite, TS.
				</span>
				<p className="text-sm font-bold md:text-base">
					v{version} |{" "}
					<a
						className="text-blue-200"
						href="https://github.com/greatvivek11/TodoApp"
						target="_blank"
						rel="noopener noreferrer"
					>
						Github
					</a>
				</p>
			</div>
		</footer>
	);
}
