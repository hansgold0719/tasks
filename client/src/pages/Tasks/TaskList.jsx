import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Container from "../../components/tasks/Container";
import TitleComponent from "../../components/tasks/Title";
import NavBar from "../../components/tasks/Navbar";
import ButtonGroup from "../../components/tasks/ButtonGroup";
import Button from "../../components/Button";
import ModalComponent from "../../components/tasks/modal";
import {
  FaCalendarAlt,
  FaTrash,
  FaUserAlt,
  FaRegEdit,
  FaSortAmountUp,
  FaSortAmountDown,
} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { createTask, removeTask, getTask, updateTask } from "../../api/task";

const initialData = {
  title: "",
  description: "",
  create_at: "",
  duty_at: "",
  status: "",
};

const options = [
  { value: "title", label: "Title" },
  { value: "create_at", label: "Created_At" },
];

const TaskList = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalFlag, setModalFlag] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [dutyDate, setDutyDate] = useState(null);
  const [taskLists, setTaskLists] = useState([]);
  const [taskFlag, setTaskFlag] = useState("");
  const [taskData, setTaskData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortField, setSortField] = useState("title");

  const navigate = useNavigate();
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };
  const formatDate = (data) => {
    return data.toISOString().slice(0, 10);
  };
  const handleToDateChange = (date) => {
    const data = new Date(date);
    setStartDate(date);
    setTaskData({ ...taskData, create_at: formatDate(data) });
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleFromDateChange = (date) => {
    const data = new Date(date);
    setDutyDate(date);
    setTaskData({ ...taskData, duty_at: formatDate(data) });
  };
  const handleRemove = async (id) => {
    const data = await removeTask(id, currentPage, itemsPerPage);
    if (data) {
      const _totalPage = Math.ceil(data.totalItems / itemsPerPage);
      setTaskLists(data.items);
      setTotalPage(_totalPage);
      if (_totalPage < currentPage) {
        setCurrentPage(_totalPage);
      }
      setTaskFlag("success");
      setShowModal(false);
    }
  };
  const handleCreate = () => {
    setModalFlag("create");
    setTaskData(initialData);
    setShowModal(true);
  };
  const handleUpdate = (data) => {
    setTaskData(data);
    setModalFlag("update");
    setShowModal(true);
  };
  const handleEdit = async () => {
    const data = await updateTask(taskData);
    if (data) {
      setTaskLists(data);
      setTaskFlag("success");
      setShowModal(false);
    }
  };
  const handleSave = async () => {
    const data = await createTask(taskData, currentPage, itemsPerPage);
    if (data) {
      setTaskLists(data.items);
      setTotalPage(Math.ceil(data.totalItems / itemsPerPage));
      setTaskFlag("success");
      setShowModal(false);
    }
  };
  const handleSort = (field) => {
    setSortField(field);
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };
  const nextPage = () => {
    setCurrentPage((nextPage) =>
      nextPage < totalPage ? nextPage + 1 : nextPage
    );
  };
  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "cyan-500";
      case "progress":
        return "pink-500";
      default:
        return "gray-400";
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getTask(
        currentPage,
        itemsPerPage,
        sortField,
        sortOrder
      );
      setTaskLists(response.items);
      setTotalPage(Math.ceil(response.totalItems / itemsPerPage));
    }
    fetchData();
  }, [currentPage, itemsPerPage, sortField, sortOrder, taskFlag]);

  return (
    <Container>
      <NavBar handleLogOut={handleLogOut} />
      <TitleComponent />
      <ButtonGroup>
        <Button
          rounded="rounded-full"
          content="+Add"
          width="w-1/3"
          bgColor="bg-pink-400"
          handleClick={handleCreate}
        />

        <div className="relative flex">
          {options.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSort(item.value)}
              className="px-4 py-2 mx-2 text-gray-800 rounded-md border border-gray-400 focus:outline-none focus:border-gray-600 flex justify-center align-middle items-center"
            >
              {item.label}
              {item.value === sortField ? (
                sortOrder === "asc" ? (
                  <FaSortAmountUp className=" ml-4" />
                ) : (
                  <FaSortAmountDown className=" ml-4" />
                )
              ) : (
                ""
              )}
            </button>
          ))}
        </div>
      </ButtonGroup>
      {taskLists.map((val, index) => (
        <div
          key={index}
          className={`w-8/12 bg-gray-100 p-3 m-1 rounded-md grid grid-cols-6 border-s-8 border-s-${getStatusColor(
            val.status
          )} shadow-md shadow-indigo-500/50`}
        >
          <div className="col-span-6 flex justify-between">
            <span className=" text-3xl">{val.title}</span>
            <div className="flex">
              <FaRegEdit
                color="blue"
                size={20}
                className=" mr-2 cursor-pointer"
                onClick={() =>
                  handleUpdate(taskLists.find((item) => item._id === val._id))
                }
              />
              <FaTrash
                color="red"
                size={18}
                className=" mr-2 cursor-pointer"
                onClick={() => handleRemove(val._id)}
              />
            </div>
          </div>
          <div className="col-span-6 flex border-b-2 my-3 text-gray-800">
            <span>{val.description}</span>
          </div>
          <div className="col-span-6 grid-cols-3 flex items-center">
            <div className="w-1/3">
              <span
                className={`bg-${getStatusColor(
                  val.status
                )} rounded-md p-1 text-white uppercase`}
              >
                {val.status}
              </span>
            </div>
            <span className="flex w-1/3 text-center justify-center items-center tracking-wider">
              <FaCalendarAlt className="mr-1" />
              {new Date(val.create_at).toISOString().slice(0, 10)}
            </span>
            <span className="flex w-1/3 text-right justify-end items-center tracking-wide">
              <FaUserAlt className="mr-1" />
              {val._id}
            </span>
          </div>
        </div>
      ))}
      <div className="flex mt-5">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            <li>
              <Link
                onClick={prevPage}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </Link>
            </li>
            {pages.map((pageNumber, index) => (
              <li key={index}>
                <Link
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-2 leading-tight ${
                    pageNumber === currentPage
                      ? "text-blue-600 bg-indigo-800"
                      : "text-gray-500 bg-white"
                  } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {pageNumber}
                </Link>
              </li>
            ))}

            <li>
              <Link
                onClick={nextPage}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {showModal ? (
        <ModalComponent
          closeModal={() => setShowModal(false)}
          handleChange={handleChange}
          handleSave={handleSave}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
          handleToDateChange={handleToDateChange}
          handleFromDateChange={handleFromDateChange}
          selectedStart={startDate}
          selectedDuty={dutyDate}
          data={taskData}
          modalFlag={modalFlag}
        />
      ) : null}
    </Container>
  );
};

export default TaskList;
