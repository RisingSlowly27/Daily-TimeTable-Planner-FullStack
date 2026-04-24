export const addWeek = async (name,setWeeks) =>{
  const week={
    key: name+Date.now(),
    name: name
  };
  setWeeks(prev=>[...prev,week]);
  try{
    await fetch("https://daily-timetable-planner-fullstack.onrender.com/weeks",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(week),
      credentials: "include"
    });
  }
  catch(err){
    console.log(`Error : ${err}`);
  }
  console.log("CHECK");
  return week.key;
};

export const duplicateWeek=async(week, setWeeks, setActivities)=>{
  try{
    const newWeek=await addWeek(week.name,setWeeks);
    const params=new URLSearchParams({
      old: week.key,
      new: newWeek
    });
    const res=await fetch(`https://daily-timetable-planner-fullstack.onrender.com/activities/duplicateWeek?${params.toString()}`,{credentials:"include"});
    const newActs=await res.json();
    //gets all activities with week old and creates their copy with week: newWeek and adds to db.Activity as well as returns array of these copies with new week
    if(newActs.length!=0) setActivities(prev=>[...prev,...newActs]);
  }
  catch(err){
    console.log(err);
  }
}

export const deleteWeek = async (week, setWeeks) => {
  if (week === "daily") {
    alert("'Daily' cannot be deleted");
    return;
  }
  setWeeks(prev => prev.filter(w => w.key !== week));
  try {
    await fetch(`https://daily-timetable-planner-fullstack.onrender.com/weeks/${week}`,
      {
        method: "DELETE",
        credentials: "include"
      });
    await fetch(`https://daily-timetable-planner-fullstack.onrender.com/activities?week=${week}`,
      {
        method: "DELETE",
        credentials: "include"
      });
    // Update UI after backend success
  } catch (error) {
    console.log("Delete error:", error);
  }
};