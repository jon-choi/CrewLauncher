import { useEffect, useState } from "react";


const Dashboard = function(props) {
  const { days } = props;
  const [selectedDay, setSelectedDay] = useState(null);
  if (days) {
    const [yesterday, today, tomorrow, fourthDay, lastDay] = days;

    console.log(yesterday)
    if (selectedDay) {
      const dayCard = selectedDay.map(day => {
      
      })
    }

    return ( 
    <>
    <h1>Dashboard</h1>
    <div >
      <div>{yesterday[0]}</div>
      <div>{today[0]}</div>
      <div>{tomorrow[0]}</div>
      <div>{fourthDay[0]}</div>
      <div>{lastDay[0]}</div>
    </div>
    </>
    )
  }
  return (
    <>
      {`${days}`}
    </>
  );
}

export default Dashboard;