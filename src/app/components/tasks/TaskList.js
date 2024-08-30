import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TaskList() {
    const categories = ['My Tasks', 'Personal Errands', 'Urgent To-Do'];
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Cross-reference with Jeanne for Case #192813",
            date: new Date("2021-12-06"),
            description: "No Description",
            dueIn: "2 Days Left",
            completed: false,
            expand: false
        },
        {
            id: 2,
            title: "Contact Andrew for Online Meeting and Conference",
            date: new Date("2021-03-06"),
            description: "Completed",
            completed: true,
            expand: false
        },
        {
            id: 3,
            title: "Check and Revise Homework from Andre Gonzales",
            date: new Date("2021-11-06"),
            description: "Homeworks needed to be checked are as follows: Client Profile Questionnaire, Passport Requirements and Images, Personal Documents.",
            completed: true,
            expand: true
        }
    ]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDate, setNewTaskDate] = useState(new Date());
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [showInput, setShowInput] = useState(false);

    const optionsMenuRefs = useRef([]);

    const toggleSelect = () => {
        setOpen(!open);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setOpen(false);
    };

    const toggleTaskExpand = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, expand: !task.expand } : task
            )
        );
    };

    const toggleOptionsMenu = (index, event) => {
        event.stopPropagation();
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        setOpenMenuIndex(null);
    };

    const handleDateChange = (date, taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, date } : task
            )
        );
    };

    const handleAddTask = () => {
        if (newTaskTitle.trim() && newTaskDescription.trim()) {
            setTasks(prevTasks => [
                ...prevTasks,
                {
                    id: tasks.length + 1,
                    title: newTaskTitle,
                    date: newTaskDate,
                    description: newTaskDescription,
                    completed: false,
                    expand: false
                }
            ].sort((a, b) => b.date - a.date)); // Sort tasks by date (newest first)
            setNewTaskTitle("");
            setNewTaskDate(new Date());
            setNewTaskDescription("");
            setShowInput(false);
        }
    };

    const cancelAddTask = () => {
        setNewTaskTitle("");
        setNewTaskDate(new Date());
        setNewTaskDescription("");
        setShowInput(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openMenuIndex !== null && optionsMenuRefs.current[openMenuIndex] && !optionsMenuRefs.current[openMenuIndex].contains(event.target)) {
                setOpenMenuIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenuIndex]);

    return (
        <div className="px-8 py-6 font-lato max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <div className="relative text-primary-gray-dark">
                    <div
                        className="flex gap-2 items-center border-2 border-primary-gray-normal rounded-md text-sm py-2 px-4 hover:cursor-pointer"
                        onClick={toggleSelect}
                    >
                        <span className="font-semibold">
                            {selectedCategory}
                        </span>
                        <Image
                            className={`${open ? 'rotate-180' : 'rotate-0'} transition-all ease-in-out`}
                            src={'/icon/expand.svg'}
                            width={15}
                            height={15}
                            alt="expand"
                            priority={true}
                        />
                    </div>
                    {
                        open &&
                        <div className="absolute bg-white border-2 border-primary-gray-normal w-52 rounded-md mt-3 text-sm z-50">
                            {categories
                                .filter(category => category !== selectedCategory)
                                .map((category) => (
                                    <div
                                        key={category}
                                        className="font-semibold px-4 py-2 hover:cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        {category}
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
                <Button
                    className="bg-primary-blue text-white rounded-md font-semibold"
                    onClick={() => setShowInput(true)}
                >
                    New Task
                </Button>
            </div>

            {/* New Task Input Section */}
            {showInput && (
                <div className="mb-4">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Type Task Title"
                        className="border border-primary-gray-normal px-3 py-2 rounded-md text-sm w-full"
                    />
                    <div className="mt-2 relative">
                        <div className="relative w-fit">
                            <DatePicker
                                selected={newTaskDate}
                                onChange={date => setNewTaskDate(date)}
                                dateFormat="MM/dd/yyyy"
                                className="text-gray-500 border px-3 py-2 rounded-md border-primary-gray-normal w-full"
                            />
                            <Image
                                src={'/icon/calendar.svg'}
                                width={15}
                                height={15}
                                alt="calender"
                                priority={true}
                                className="absolute right-0 top-0 mt-3 mr-3"
                            />
                        </div>
                    </div>
                    <textarea
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        placeholder="Type Task Description"
                        className="border border-primary-gray-normal px-3 py-2 rounded-md text-sm w-full mt-2"
                    />
                    <div className="flex gap-3">
                        <Button
                            className="bg-primary-blue text-white rounded-md font-semibold mt-2"
                            onClick={handleAddTask}
                        >
                            Add Task
                        </Button>
                        <Button
                            className="bg-white text-primary-gray-dark border-2 border-primary-gray-dark rounded-md font-semibold mt-2"
                            onClick={cancelAddTask}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* Task List Section */}
            <div className="text-sm overflow-y-auto max-h-[520px]">
                {tasks.map((task, index) => {
                    return (
                        <div key={task.id} className={`cursor-pointer py-5 ${index < tasks.length - 1 ? 'border-b border-[#828282]' : ''}`} >
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="mr-2 custom-checkbox"
                                        checked={task.completed}
                                        onChange={() =>
                                            setTasks(prevTasks =>
                                                prevTasks.map(t =>
                                                    t.id === task.id
                                                        ? { ...t, completed: !t.completed }
                                                        : t
                                                )
                                            )
                                        }
                                    />
                                    <span
                                        className={`font-semibold ${task.completed ? 'line-through text-primary-gray-normal' : 'text-primary-gray-dark'}`} onClick={() => toggleTaskExpand(task.id)}
                                    >
                                        {task.title}
                                    </span>
                                </div>
                                <div className="flex gap-3 items-center">
                                    {!task.isNew && <div className="text-xs">
                                        {task.date.toLocaleDateString()}
                                    </div>}
                                    <div>
                                        <Image
                                            className={`${task.expand ? 'rotate-180' : 'rotate-0'} transition-all ease-in-out`}
                                            src={'/icon/expand.svg'}
                                            width={11}
                                            height={11}
                                            alt="expand"
                                            priority={true}
                                        />
                                    </div>
                                    <div className="flex gap-3 items-center relative" ref={el => optionsMenuRefs.current[index] = el}>
                                        <div
                                            className="hover:cursor-pointer"
                                            onClick={(event) => toggleOptionsMenu(index, event)}
                                        >
                                            <Image
                                                src={'/icon/more.svg'}
                                                width={11}
                                                height={11}
                                                alt="more"
                                                priority={true}
                                            />
                                        </div>

                                        {openMenuIndex === index && (
                                            <div
                                                className="absolute right-0 mt-16 bg-white border border-[#BDBDBD] rounded-md z-50 w-[120px]"
                                            >
                                                <button
                                                    className="block px-4 py-2 text-indicator-red rounded-md w-full text-left"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Task Details (Expandable) */}
                            {task.expand && (
                                <div className="ml-8 mt-3">
                                    <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={'/icon/Group 1323.svg'}
                                                width={20}
                                                height={20}
                                                alt="time"
                                                priority={true}
                                            />
                                            <div className="relative">
                                                <DatePicker
                                                    selected={task.date}
                                                    onChange={(date) => handleDateChange(date, task.id)}
                                                    dateFormat="MM/dd/yyyy"
                                                    className="text-gray-500 border px-3 py-1 rounded-md border-primary-gray-normal"
                                                />
                                                <Image
                                                    src={'/icon/calendar.svg'}
                                                    width={15}
                                                    height={15}
                                                    alt="calender"
                                                    priority={true}
                                                    className="absolute right-0 top-0 mt-2 mr-3"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500 mt-2 text-sm">
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={'/icon/Group 1714.svg'}
                                                width={15}
                                                height={15}
                                                alt="pen"
                                                priority={true}
                                            />
                                            <span className="font-medium max-w-[480px]">
                                                {task.description}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
