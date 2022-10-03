import React from 'react'

export default function List({data,task,del,submit,progress}) {
 
    
  return (
    <div >
        <h1 className='list-h1'>LIST</h1>

        <form action="" onSubmit={(e)=>{submit(e)}}>
          
            <input required type="text" placeholder='ENTER YOUR TASK'  onChange={(e)=>{task(e.target.value)}}/>
            <button>ADD</button>
        </form>

        <div className='list-div'>
          {data.sort((a,b)=>{return new Date(a.timeinms)- new Date(b.timeinms)}).map((e)=>{
         
            if(!e.inprogress && !e.isdone) 
            return(
            
            <div className='task'>
            <h2>TASK </h2>
            <hr />
            <div className='task-div'>
                <p>{e.task}</p>
                
                <div>
                  <button onClick={()=>{del(e.id,e.task)}} className='btn-task btn-del'>DELETE</button>
                  <button onClick={()=>{progress(e.id)}} className='btn-task btn-progress' >IN-PROGRESS</button>
                </div>
            </div>
            <hr />
                <p className='task-time'>
                  ADDED AT: {e.date} {e.time} </p>

          </div>)
          else{
            return ""
          }
        
          
          
          })}
          
           
        </div>
     </div>
  )
}
