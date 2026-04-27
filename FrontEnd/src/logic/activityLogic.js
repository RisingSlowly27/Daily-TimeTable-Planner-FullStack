export const addActivity = async (activity,setActivities) => {
    try {
      const response = await fetch(
          "https://daily-timetable-planner-fullstack.onrender.com/activities",
          {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(activity),
          credentials:"include"
          }
      );
      const newActivity=await response.json();
      setActivities(prev => [...prev, newActivity]);
    } catch (error) {
      console.log("Add activity error:", error);
    }
};

export const updateActivity = async (id, updatedData, setActivities) => {
    try {
      await fetch(
          `https://daily-timetable-planner-fullstack.onrender.com/activities/${id}`,
          {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedData),
          credentials:"include"
          }
      );
      setActivities(prev =>
        prev.map(act => act._id === id ? {_id:id,...updatedData} : act)
      );
    } catch (error) {
    console.log("Update error:", error);
    }
};

export const deleteActivity = async (id, setActivities) => {
  try {
    await fetch(
      `https://daily-timetable-planner-fullstack.onrender.com/activities?id=${id}`,
      {
        method: "DELETE",
        credentials: "include"
      }
    );
    // Update UI after backend success
    setActivities(prev =>
      prev.filter(act => act._id !== id)
    );
  } catch (error) {
    console.log("Delete error:", error);
  }
};