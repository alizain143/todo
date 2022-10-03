import React,{useState,useEffect} from 'react'
import { db } from "../firebase";
import { collection, deleteDoc,addDoc, doc, onSnapshot} from "firebase/firestore";

export default function Done() {
  const [data, setdata] = useState();

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

     const handledel = (id,task)=>{
      if(!window.confirm("Do you want to delete this task")) return
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      addDoc(delCollection,{delData:['Done',date,time,task,'Completed']})
      deleteDoc(doc(db,"tasks",id))
     }
  return (
    <>
    <div>
    <h1 className='list-h1'>Done</h1>
    <div className='list-div'>
          {data && data.sort((a,b)=>{return new Date(a.timeinms)- new Date(b.timeinms)}).map((e)=>{
           let secondsleft= (e.doneTime[0]-e.timeinms)/1000
           const hours = Math.floor(secondsleft/3600)
           secondsleft=secondsleft%3600
           const mins=Math.floor(secondsleft/60)
           secondsleft= Math.floor(secondsleft%60)
             if(e.isdone && (!e.inprogress)) 
            return(
                
            <div className='task'>
            <h2>TASK </h2>
            <hr />
            <div className='task-div'>
                <p>{e.task}</p>
                
                <div>
                  <button onClick={()=>{handledel(e.id,e.task)}} className='btn-task btn-done-del'>DELETE</button>
                 
                </div>
            </div>
            <hr />
                <p className='task-time'>
                  Completion-Time: {`${hours}h : ${mins}m ${secondsleft}s `} </p>

          </div>)
          else{
            return ""
          }
         
           
          }
          )}
          
           
        </div>
    </div>
    </>
  )
}
