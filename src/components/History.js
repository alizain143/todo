import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export default function History() {
  const [data, setdata] = useState();
  const [datadel, setdatadel] = useState();

  const Collection = collection(db, "tasks");
  const delCollection = collection(db, "del");
  useEffect(() => {
    const get = () => {
      onSnapshot(Collection, (datadone) => {
        setdata(
          datadone.docs.map((e) => {
            return { ...e.data(), id: e.id };
          })
        );
      });
    };
    return () => {
      get();
    };
  }, []);
  useEffect(() => {
    const get = () => {
      onSnapshot(delCollection, (datadone) => {
        setdatadel(
          datadone.docs.map((e) => {
            return { ...e.data(), id: e.id };
          })
        );
      });
    };
    return () => {
      get();
    };
  }, []);
  const handleClearHis=()=>{
          datadel.forEach(e => {
              deleteDoc(doc(db,"del",e.id))
          });
  }

 
  return (
    <>
      <div className="his-div">
        <h1 className="list-h1">History
        </h1>
  
        <div className="div-table">
          <table className="hisTable">
            <thead className="thead">
              <td>TASK</td>
              <td>DATE</td>
              <td>TIME</td>
              <td>ACTION</td>
            </thead>
            <tbody className="tbody">
              {data &&
                data
                  .sort((a, b) => {
                    if (a.time > b.time) return -1;
                    else return 1
                  })
                  .map((e) => {
                    if (e.inprogress) {
                      return (
                        <>
                          <tr >
                            <td className="task-td">{e.task}</td>
                            <td>{e.date}</td>
                            <td>{e.time}</td>
                            <td>Added</td>
                          </tr>

                          <tr>
                            <td className="task-td">{e.task}</td>
                            <td>{e.progressTime[1]}</td>
                            <td>{e.progressTime[2]}</td>
                            <td>IN-PROGRESS</td>
                          </tr>
                        </>
                      );
                    }
                    if (!e.inprogress && e.isdone) {
                      return (
                        <>
                          <tr>
                            <td className="task-td">{e.task}</td>
                            <td>{e.date}</td>
                            <td>{e.time}</td>
                            <td>Added</td>
                          </tr>

                          <tr>
                            <td className="task-td">{e.task}</td>
                            <td>{e.progressTime[1]}</td>
                            <td>{e.progressTime[2]}</td>
                            <td>IN-PROGRESS</td>
                          </tr>
                          <tr>
                            <td className="task-td">{e.task}</td>
                            <td>{e.doneTime[1]}</td>
                            <td>{e.doneTime[2]}</td>
                            <td>Done</td>
                          </tr>
                        </>
                      );
                    } else {
                      return (
                        <tr>
                          <td className="task-td">{e.task}</td>
                          <td>{e.date}</td>
                          <td>{e.time}</td>
                          <td>Added</td>
                        </tr>
                      );
                    }
                  })}
            </tbody>
          </table>
          <h2 className="list-h2">DEL-History</h2>
          <button onClick={()=>{handleClearHis()}} >Clear Del-History</button>
          <table className="hisTable">
            <thead className="thead">
              <td>TASK</td>
              <td>DATE</td>
              <td>TIME</td>
              <td>FROM</td>
              <td>REASON</td>
            </thead>
            <tbody className="tbody">
              {datadel &&
                datadel
                  .sort((a, b) => {
                    if (a.delData[2] > b.delData[2]) return -1;
                    else return 1
                  })
                  .map((e) => {
                    if (e.delData) {
                      return (
                        <tr>
                          <td className="task-td">{e.delData[3]}</td>
                          <td>{e.delData[1]}</td>
                          <td>{e.delData[2]}</td>
                          <td>{e.delData[0]}</td>
                          <td>{e.delData[4]}</td>
                        </tr>
                      );
                    }
                    else return ""
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
