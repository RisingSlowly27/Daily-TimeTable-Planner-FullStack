import React, { useState, useEffect } from "react";
import { updateActivity, addActivity } from "../logic/activityLogic";

function ActivityForm({ activeWeek, editingActivity, setEditingActivity, setActiveForm, setActivities }) {
  //State
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("23:59");

  //Effects
  useEffect(() => {
    if (editingActivity) {
      setName(editingActivity.name);
      setStartTime(editingActivity.startTime);
      setEndTime(editingActivity.endTime);
    }
    else{
      setName("");
      setStartTime("");
      setEndTime("23:59");
    }
  }, [editingActivity]);

  //Fns
  const submitActivity = async(e) => {
    e.preventDefault();

    if (endTime <= startTime) {
      alert("End time must be greater than start time");
      return;
    }
    console.log(activeWeek);
    const activity = {name, startTime, endTime, week:activeWeek};

    if (editingActivity) {
      await updateActivity(editingActivity._id, activity, setActivities);
      setEditingActivity(null);
    } else {
      await addActivity(activity,setActivities);
    }
    // Reset form
    setName("");
  };

  return (
    <div className='col-span-2'>
    <form onSubmit={submitActivity} className="p-4 m text-center bg-yellow-200 border">
      <h3 className='font-bold'>{editingActivity?`Editing ${editingActivity.name}`:"Add Activity"}</h3>

      <label htmlFor="activityName">Activity Name</label>
      <br />
      <input
        id="activityName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />
      <label htmlFor="startTime">Start Time  </label>
      <input
        id="startTime"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <br /><br />

      <label htmlFor="endTime">End Time  </label>
      <input
        id="endTime"
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <br /><br />

      <button type="submit" className="m-3 p-1">
        {editingActivity?"Edit":"Add Activity"}
      </button>
      <button type="button" className="m-3 p-1" onClick={()=>{setActiveForm(false);setEditingActivity(null)}}>
        Close Form
      </button>
    </form>
    </div>
  );
}

export default ActivityForm;

