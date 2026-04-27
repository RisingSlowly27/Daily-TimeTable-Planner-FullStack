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
                <div className='h-fit w-full md:max-h-[736px] overflow-auto col-span-1 md:col-span-2 lg:col-span-7 m-3 p-3 bg-yellow-200 justify-items-center border'>
                <div className='text-center'>{weeks.map(w =>{
                    if(w.key!==activeWeek) return <button key={w.key} className="m-2 p-3 bg-blue-600 border" onClick={()=>setActiveWeek(w.key)}>{w.name}</button>;
                    return <span key={w.key}>
                    <button className="m-2 p-3 bg-red-500 border" onClick={()=>setActiveWeek(w.key)}>{w.name}</button>
                    <div className="fixed lg:right-6 lg:top-62 bottom-4 right-2 w-[575px] max-w-[90vw] h-[350px] max-h-[80vh] z-10">
                        Notes for <span className="text-blue-600 font-bold">{w.name}</span>
                        <textarea placeholder="Start typing your thoughts..." className="w-full min-h-[530px] p-5 text-md bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        value={w.content||""} onChange={(e)=>{
                            setWeeks(prev =>prev.map(w2 =>w2.key === activeWeek?{...w2,content: e.target.value}:w2));
                        }}
                        ></textarea>
                        <div><button
                        className="bg-blue-600"
                        type="button"
                        onClick={async() =>{
                            await fetch(`https://daily-timetable-planner-fullstack.onrender.com/weeks/content`,{
                                method:"PUT",
                                credentials:"include",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({key: activeWeek,content:w.content||""})
                            });
                        }}
                        >Save Note</button></div>
                    </div>
                    </span>
                })}</div>
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
                </div>
                <div className='h-fit w-70 col-span-1 lg:col-span-2 text-center z-20'>
                <button className='w-1/2 m-2 p-2 bg-red-500 border col-span-1' onClick={()=>{setActiveForm(true);setEditingActivity(null)}}>Add Activity</button>
                {(activeForm || editingActivity)?<ActivityForm activeWeek={activeWeek} editingActivity={editingActivity} setActiveForm={setActiveForm} setEditingActivity={setEditingActivity} setActivities={setActivities}/>:<div className="m-1">Use this to Add Activity<br/> after Selecting a Day</div>}
                </div>
                <div className='h-fit w-70 col-span-1 lg:col-span-2 text-center z-20'>
                <button onClick={()=>setActiveWeekForm(true)} className='max-h-10 w-1/2 m-2 p-2 bg-red-500 border col-span-2'>Add/Delete Day</button>
                {activeWeekForm?<WeekForm weeks={weeks} setActiveWeekForm={setActiveWeekForm} setWeeks={setWeeks} setActivities={setActivities}/>:<div className="m-1">Use this to Create/Rename <br/>or Delete a Day</div>}
                </div>
            </div>
        </>
    );
}

export default Dashboard;