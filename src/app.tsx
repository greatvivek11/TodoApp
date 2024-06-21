import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import { useRecoilValue } from "recoil";
import Footer from "./Components/Footer";
import ActiveTask from "./Components/Tasks/ActiveTask";
import AddTasks from "./Components/Tasks/AddTasks";
import CompletedTask from "./Components/Tasks/CompletedTask";
import { TaskStatus } from "./Model/TaskStatus";
import { TasksState } from "./Recoil/recoilState";

export const App = () => {
	const Tasks = useRecoilValue(TasksState);

	useEffect(() => {
		localStorage.setItem("Tasks", JSON.stringify(Tasks));
	}, [Tasks]);

	console.log(`Tasks: ${Tasks.length}`);

	return (
		<div className="container mx-auto lg:w-1/2">
			<h1 className="text-5xl">Todo App</h1>
			<ToastContainer
				position="top-center"
				style={{ fontSize: 16 }}
				theme="colored"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<AddTasks />
			<ActiveTask />
			{Tasks.filter((tasks) => tasks.status === TaskStatus.Active).length > 0 &&
			Tasks.filter((tasks) => tasks.status === TaskStatus.Completed).length >
				0 ? (
				<hr />
			) : (
				""
			)}
			<CompletedTask />
			<Footer />
		</div>
	);
};
