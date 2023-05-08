import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Button from "../Button";

const ModalComponent = (props) => {
  const [startDate, setStartDate] = useState("");
  const [dutyDate, setDutyDate] = useState("");
  const formatDate = (data) => {
    return data.toISOString().slice(0, 10);
  };
  useEffect(() => {
    if (props.modalFlag === "update") {
      const fromDate = new Date(props.data.create_at);
      const toDate = new Date(props.data.duty_at);
      setStartDate(formatDate(fromDate));
      setDutyDate(formatDate(toDate));
    }
  }, [props, props.data, props.modalFlag]);

  const statusOption = [
    { value: "DEFAUT", text: "Select an option" },
    { value: "done", text: "Done" },
    { value: "progress", text: "Progress" },
    { value: "pending", text: "Pending" },
  ];

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-10/12 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {props.modalFlag === "update" ? "Update Task" : "Add Task"}
              </h3>
              <button
                className="p-1 bg-gray-200 overflow-hidden ml-auto border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={props.closeModal}
              >
                <span className="bg-transparent text-white leading-4 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="grid grid-cols-1 m-5 gap-6 md:grid-cols-2 col-span-6">
              <div className="grid col-span-3">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Title
                  </span>
                  <input
                    type="text"
                    name="title"
                    value={props.data.title}
                    onChange={props.handleChange}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Title"
                  />
                </label>
              </div>

              <div className="grid col-span-3">
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700">
                    Description
                  </span>
                  <textarea
                    name="description"
                    rows={5}
                    value={props.data.description}
                    onChange={props.handleChange}
                    className="mt-1 textarea-secondary px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Description"
                  />
                </label>
              </div>
              <div className="grid">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Create Date
                  </span>
                  <DatePicker
                    selected={props.selectedStart}
                    onChange={props.handleToDateChange}
                    value={
                      props.modalFlag === "update"
                        ? startDate
                        : props.data.create_at
                    }
                    dateFormat="yyyy-MM-dd"
                    className="w-full mt-1 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border shadow-sm border-slate-300 "
                  />
                </label>
              </div>
              <div className="grid">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Duty Date
                  </span>
                  <DatePicker
                    selected={props.selectedDuty}
                    value={
                      props.modalFlag === "update"
                        ? dutyDate
                        : props.data.duty_at
                    }
                    onChange={props.handleFromDateChange}
                    className="w-full mt-1 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border shadow-sm border-slate-300 "
                  />
                </label>
              </div>
              <div className="grid">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Status
                  </span>
                  <select
                    className="w-full mt-1 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border shadow-sm border-slate-300"
                    onChange={props.handleChange}
                    name="status"
                    defaultValue={props.data.status}
                  >
                    {statusOption.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <Button
                content="Cancel"
                rounded="rounded-md"
                width="w-1/3"
                bgColor="bg-gray-400"
                handleClick={props.closeModal}
              />
              <Button
                content={props.modalFlag === "update" ? "Update" : "Save"}
                rounded="rounded-md"
                width="w-1/3"
                bgColor="bg-indigo-600"
                handleClick={
                  props.modalFlag === "update"
                    ? props.handleEdit
                    : props.handleSave
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalComponent;
