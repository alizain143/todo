import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  addDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export default function Inprogress() {
  const [data, setdata] = useState();
  const [delid, setdelid] = useState();
  const [task, settask] = useState();

  const progresCollection = collection(db, "tasks");
  const delCollection = collection(db, "del");
  useEffect(() => {
    const get = () => {
      onSnapshot(progresCollection, (datapg) => {
        setdata(
          datapg.docs.map((e) => {
            return { ...e.data(), id: e.id };
          })
        );
      });
    };
    return () => {
      get();
    };
  }, []);
  const delinput=document.querySelector('.del-reason')
  const delmodal=document.querySelector('.form-del')
  const handleDelPg = (a, id, task) => {
     
      delmodal.style.display='flex'
     
    setdelid(id)
    settask(task)
 
   
 
  
  };
  const handleDone = (id) => {
    if(!window.confirm( "ARE YOU DONE WITH THIS TASK?")) return
    const timeinms = Date.now();
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    updateDoc(doc(db, "tasks", id), {
      doneTime: [timeinms, date, time],
      isdone: true,
      inprogress: false,
    });
  };
  
  const handleyes = ()=>{
   
    const val = delinput.value
    if(val==="")return
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    addDoc(delCollection, { delData: ["IN-PROGRESS", date, time, task,val] });
    deleteDoc(doc(db, "tasks", delid));
    delmodal.style.display="none"
  
   }
   const handleno = ()=>{
       delmodal.style.display="none"
   }
 
  return (
    <>
      <div>
        <h1 className="list-h1">In-Progress</h1>
        <div className="form-del">
          <form className="delPgform" onSubmit={(e)=>{e.preventDefault()}} action="">
            <h2>Do you want to delete this task?</h2>
            <div>
              <input className="del-reason"
                placeholder="Reason?"
                required
              ></input>
              <div>
                <button className="btndel btndel-yes" onClick={handleyes}>YES</button>
                <button className="btndel btndel-no" onClick={handleno} >No</button>
              </div>
            </div>
          </form>
        </div>
        <div className="list-div">
          {data &&
            data
              .sort((a, b) => {
                return new Date(a.timeinms) - new Date(b.timeinms);
              })
              .map((e) => {
                if (e.inprogress && !e.isdone)
                  return (
                    <div className="task">
                      <h2>TASK </h2>
                      <hr />
                      <div className="task-div">
                        <p>{e.task}</p>

                        <div>
                          <button
                            onClick={(a) => {
                              handleDelPg(a, e.id, e.task);
                            }}
                            className="btn-task btn-del"
                          >
                            DELETE
                          </button>
                          <button
                            onClick={() => {
                              handleDone(e.id);
                            }}
                            className="btn-task btn-progress"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                      <hr />
                      <p className="task-time">
                        ADDED AT: {e.progressTime[1]} {e.progressTime[2]}
                      </p>
                    </div>
                  );
                  else{
                    return ""
                  }
              })}
        </div>
      </div>
    </>
  );
}
