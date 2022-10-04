import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import Inprogress from "./Inprogress";
import Done from "./Done";
import History from "./History";
import List from "./List";

export default function Main() {
  const [task, settask] = useState("");
  const [data, setdata] = useState([]);

  const taskCollection = collection(db, "tasks");
  const delCollection = collection(db, "del");

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeinms = Date.now();
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const progressTime = [];
    const doneTime = [];

    const isdone = false;
    const inprogress = false;
    e.target[0].value = "";

    addDoc(taskCollection, {
      task,
      date,
      time,
      timeinms,
      progressTime,
      doneTime,
      isdone,
      inprogress,
    });
  };

  useEffect(() => {
    const get = () => {
      onSnapshot(taskCollection, (data) => {
        setdata(
          data.docs.map((d) => {
            return { ...d.data(), id: d.id };
          })
        );
      });
    };

    return () => {
      get();
    };
  }, []);

  const handleDelete = (id, task) => {
    if (!window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS TASK")) return;

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    addDoc(delCollection, { delData: ["List", date, time, task, "Unlist"] });
    deleteDoc(doc(db, "tasks", id));
  };

  const handleProgress = (id) => {
    if (!window.confirm('Do you want to send this task to "InProgress"'))
      return;

    const timeinms = Date.now();
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    updateDoc(doc(db, "tasks", id), {
      progressTime: [timeinms, date, time],
      inprogress: true,
    });
  };

  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <List
              data={data}
              del={handleDelete}
              submit={handleSubmit}
              task={settask}
              progress={handleProgress}
            ></List>
          }
        ></Route>
        <Route path="/inprogress" element={<Inprogress></Inprogress>}></Route>
        <Route path="/done" element={<Done></Done>}></Route>
        <Route path="/history" element={<History></History>}></Route>
      </Routes>
    </>
  );
}
