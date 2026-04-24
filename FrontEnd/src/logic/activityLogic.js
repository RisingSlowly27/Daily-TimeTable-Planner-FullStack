export const addActivity = async (activity) => {
    try {
    const response = await fetch(
        "http://localhost:8000/activities",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(activity),
        credentials:"include"
        }
    );
    } catch (error) {
    console.log("Add activity error:", error);
    }
};

export const updateActivity = async (id, updatedData, setActivities) => {
    try {
      await fetch(
          `http://localhost:8000/activities/${id}`,
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
      `http://localhost:8000/activities?id=${id}`,
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