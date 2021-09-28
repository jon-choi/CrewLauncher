import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import CrewCard from './CrewCard';



const CrewPage = (props) => {
  
  return (

    <Card >
      
{/* CARD ONE */}
    <CrewCard sx={{ top: 100, position: 'absolute', maxWidth: 200, mb: 5 }}>
    </CrewCard>

    <CrewCard sx={{ top: 100, position: 'absolute', maxWidth: 200, mb: 5 }}>
    </CrewCard>

    <CrewCard sx={{ top: 100, position: 'absolute', maxWidth: 200 }}>
    </CrewCard>
</Card>

    // <h1>/dispatch/crews
    //   Page Hello
    // </h1>
);
};

export default CrewPage;