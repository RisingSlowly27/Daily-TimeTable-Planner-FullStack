import React,{useState} from "react";
import { deleteActivity  } from "../logic/activityLogic";

function ActivityList({ activities, activeWeek, setEditingActivity, setActivities}){
    const [showEnd,setShowEnd]=useState(true);
    console.log(activities);
    const sortedActivities=activities.filter(act=>(act.week==activeWeek))
    .sort((a,b)=>a.startTime.localeCompare(b.startTime));
    console.log(sortedActivities);
    if(sortedActivities.length===0) return <div className="text-xl font-bold">No Activities Added. Add by using the "Add Activity" Button</div>;
    if(showEnd) return (
        <div className="text-center w-full">
        <table border="1" className="w-full">
            <thead>
            <tr>
            <th>Start Time</th>
            <th>End Time <button className="p-1 text-sm font-normal bg-blue-600 text-white" onClick={()=>setShowEnd(false)}>Hide</button></th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete BTn</th>
            </tr>
            </thead>
            <tbody>
        {sortedActivities.map((act) => (
            <tr key={act._id}>
            <td>{act.startTime}</td> 
            <td>{act.endTime}</td>  
            <td>{act.name}</td>
            <td>
                <button className="p-1 bg-blue-600 text-white" onClick={() => setEditingActivity(act)}>
                Edit
                </button>
            </td>
            <td>
                <button className="p-1 bg-blue-600 text-white" onClick={async () =>await deleteActivity(act._id, setActivities)}>
                Delete
                </button>
            </td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    );
    return (
        <div className="text-center w-full">
        <table border="1" className="w-full">
            <thead>
            <tr>
            <th>Start Time <button className="text-sm font-normal bg-blue-600 text-white" onClick={()=>setShowEnd(true)}>Show End Time</button></th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete BTn</th>
            </tr>
            </thead>
        <tbody>
        {sortedActivities.map((act) => (
            <tr key={act._id}>
            <td>{act.startTime}</td>   
            <td>{act.name}</td>
            <td>
                <button className="p-1 font-normal bg-blue-600 text-white" onClick={() => setEditingActivity(act)}>
                Edit
                </button>
            </td>
            <td><button className="p-1 bg-blue-600 text-white" onClick={async () =>await deleteActivity(act._id,setActivities)}>
                Delete
            </button></td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    );
}

export default ActivityList;