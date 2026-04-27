
import { useState } from "react";
import { addWeek, duplicateWeek, deleteWeek } from "../logic/weekLogic";

function WeekForm({ weeks, setWeeks, setActiveWeekForm, setActivities }) {
    const [name,setName]=useState("");
    const [rename,setRename]=useState("");

    const submitWeek=async(e)=>{
      e.preventDefault();
      await addWeek(name, setWeeks);
      console.log(weeks);
    };

    return (
      <form
        onSubmit={submitWeek}
        className="p-4 text-center bg-yellow-200 border"
      >
        {weeks.map(week => (
          <div key={week.key} className="m-2">
            {rename !== week.key ? (
              <>
                <div className="border bg-red-500 p-2">
                  {week.name}
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-blue-600 px-2 py-1 text-white"
                    onClick={() => setRename(week.key)}
                  >
                    Rename
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 px-2 py-1 text-white"
                    onClick={async() => await duplicateWeek(week, setWeeks, setActivities)}
                  >
                    Duplicate
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 px-2 py-1 text-white"
                    onClick={async() => await deleteWeek(week.key, setWeeks)}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={week.name}
                  onChange={(e) => {
                    setWeeks(prev =>
                      prev.map(w =>
                        w.key === week.key
                          ? { ...w, name: e.target.value }
                          : w
                      )
                    );
                  }}
                />
                <button
                  type="button"
                  onClick={async() =>{
                    await fetch(`https://daily-timetable-planner-fullstack.onrender.com/weeks/name?key=${week.key}&name=${week.name}`,{
                      method:"PUT",
                      credentials:"include"
                    });
                    setRename("");
                  }}
                >
                  OK
                </button>
              </>
            )}
          </div>
        ))}
        <label>Add Week</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
        <br />
        <button
          type="button"
          onClick={() => setActiveWeekForm(false)}
        >
          Close Form
        </button>
      </form>
    );
}

export default WeekForm;