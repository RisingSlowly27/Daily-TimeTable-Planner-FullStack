import React,{useState,useEffect} from "react";
import ActivityList from "./ActivityList.jsx";
import ActivityForm from "./ActivityForm.jsx";
import WeekForm from "./WeekForm.jsx";

function Dashboard({user}){
    useEffect(()=>console.log(user),[]);
    //States
    const [activities,setActivities]=useState([]);
    const [weeks,setWeeks]=useState([]);
    const [activeWeek,setActiveWeek]=useState("sample");
    const [activeForm,setActiveForm]=useState(false);
    const [editingActivity,setEditingActivity]=useState(null);
    const [activeWeekForm,setActiveWeekForm]=useState(false);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    
    //Effects
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const res1=await fetch("https://daily-timetable-planner-fullstack.onrender.com/activities",{credentials:"include"});
                if(res1.status==200){
                    const data1=await res1.json();
                    setActivities(data1);
                }
                else console.log("fetch Error Activities");
                const res2=await fetch("https://daily-timetable-planner-fullstack.onrender.com/weeks",{credentials:"include"});
                if(res2.status==200){
                    const data2=await res2.json();
                    setWeeks(data2);
                }
                else console.log("fetch Error : ",res2);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        };
        fetchData();
    },[])

    useEffect(()=>{
        if(!weeks.find(week=>week.key==activeWeek)) setActiveWeek("sample");
    },[weeks]);
    
    return (
        <>
            <h1 className="p-8 text-6xl font-bold text-center text-blue-600 [text-shadow:2px_2px_0_#000,-2px_2px_0_#000,2px_-2px_0_#000,-2px_-2px_0_#000]">Daily Timetable</h1>
            <div className='min-w-90 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 justify-items-center'>
                <div className='hidden lg:block col-span-1'></div>
                <div className='h-fit w-full col-span-1 md:col-span-2 lg:col-span-7 m-3 p-3 bg-yellow-200 justify-items-center border'>
                <div className='text-center'>{weeks.map(w => (
                    <button key={w.key} className={`m-2 p-3 bg-${w.key===activeWeek?'red-500':'blue-600'} border`} onClick={()=>setActiveWeek(w.key)}>{w.name}</button>
                ))}</div>
                {loading ? (
                    <div className="p-6 text-center font-semibold">
                    Loading activities...
                    </div>
                ) : error ? (
                    <div className="p-6 text-center text-red-500">
                    {error}
                    </div>
                ) : (
                    <ActivityList
                    activities={activities}
                    activeWeek={activeWeek} 
                    setEditingActivity={setEditingActivity}
                    setActivities={setActivities}
                    />
                )}
                <div><textarea placeholder="Start typing your thoughts..." className="w-full max-w-4xl min-h-[250px] p-5 text-lg bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                value={weeks.find(w => w.key === activeWeek)?.content||""} onChange={(e)=>{
                    setWeeks(prev =>prev.map(w =>w.key === activeWeek?{...w,content: e.target.value}:w));
                }}
                ></textarea></div>
                <div><button
                  type="button"
                  onClick={async() =>{
                    await fetch(`https://daily-timetable-planner-fullstack.onrender.com/weeks/content`,{
                        method:"PUT",
                        credentials:"include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({key: activeWeek,content:weeks.find(w => w.key === activeWeek)?.content||""})
                    });
                  }}
                >Save Note</button></div>
                </div>
                <div className='w-90 col-span-1 lg:col-span-2 text-center'>
                <button className='w-1/2 m-2 p-2 bg-red-500 border col-span-1' onClick={()=>{setActiveForm(true);setEditingActivity(null)}}>Add Activity</button>
                {(activeForm || editingActivity)?<ActivityForm activeWeek={activeWeek} editingActivity={editingActivity} setActiveForm={setActiveForm} setEditingActivity={setEditingActivity} setActivities={setActivities}/>:<div className="m-1">Use this to Add Activity<br/> after Selecting a Week</div>}
                </div>
                <div className='w-90 col-span-1 lg:col-span-2 text-center'>
                <button onClick={()=>setActiveWeekForm(true)} className='max-h-10 w-1/2 m-2 p-2 bg-red-500 border col-span-2'>Add/Delete Week</button>
                {activeWeekForm?<WeekForm weeks={weeks} setActiveWeekForm={setActiveWeekForm} setWeeks={setWeeks} setActivities={setActivities}/>:<div className="m-1">Use this to Create/Rename <br/>or Delete a Week</div>}
                </div>
            </div>
        </>
    );
}

export default Dashboard;