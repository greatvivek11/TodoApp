import { useEffect, useState } from "react";

const Editable = ({
	text,
	type,
	placeholder,
	childRef,
	handleKeyDown,
	className,
}: {
	text: string;
	type: string;
	placeholder: string;
	childRef: React.MutableRefObject<HTMLInputElement | undefined>;
	handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	className: string;
}) => {
	const [isEditing, setEditing] = useState(false);

	useEffect(() => {
		if (childRef?.current && isEditing === true) {
			childRef.current.focus();
		}
	}, [isEditing, childRef]);

	function HandleKeyDown(
		event: React.KeyboardEvent<HTMLInputElement>,
		type: string,
	): void {
		const { key } = event;
		const keys = ["Escape", "Tab", "Enter"];
		if (
			type === "input" &&
			keys.indexOf(key) > -1 &&
			event.currentTarget.value !== ""
		) {
			setEditing(false);
			handleKeyDown(event);
		}
	}

	function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
		if (e.type === "blur") {
			setEditing(false);
		} else if (e.type === "focus") {
			window.scrollTo(0, 240);
		}
	}

	return (
		<section className={className}>
			{isEditing ? (
				<div>
					<input
						required
						minLength={1}
						maxLength={32}
						ref={childRef as React.RefObject<HTMLInputElement>}
						className="sm:h-6 w-10/12 md:h-8 shadow appearance-none border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:shadow-outline text-gray-700 text-center leading-tight"
						type="text"
						name="task"
						placeholder={placeholder}
						defaultValue={text}
						onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
							HandleKeyDown(e, type)
						}
						onFocus={handleFocus}
						onBlur={handleFocus}
					/>
				</div>
			) : (
				<div
					id="editableLabel"
					className={`leading-tight overflow-ellipsis overflow-hidden whitespace-pre-wrap editable-${type}`}
					onClick={() => setEditing(true)}
					onKeyDown={(e) => console.log(e)}
				>
					<span>{text}</span>
				</div>
			)}
		</section>
	);
};

export default Editable;
