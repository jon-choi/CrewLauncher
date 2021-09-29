import { useEffect, useState } from "react";


const Dashboard = function(props) {
  const { days } = props;
  const [selectedDay, setSelectedDay] = useState(null);
  if (days) {
    const [yesterday, today, tomorrow, fourthDay, last] = days;

    console.log(selectedDay)
    if (selectedDay) {
      const dayCard = selectedDay.map(day => {
      
      })
    }

    return ( 
    <>
    <h1>Dashboard</h1>
    <div >
      <div>Yesterday</div>
      <div>Today</div>
      <div>Tomorrow</div>
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