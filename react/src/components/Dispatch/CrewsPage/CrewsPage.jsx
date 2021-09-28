import * as React from 'react';
import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import CrewCard from './CrewCard';



const CrewPage = (props) => {
  
  return (

    <Card direction="column" spacing={10} position="center" top="0" >
      
    <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20 }} />
    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100, mb: 4, ml: 20 }} />
    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" sx={{ width: 100, height: 100, mb: 4, ml: 20 }} />


 {/* CARD ONE */}
    <CrewCard sx={{ top: 0, position: 'relative', maxWidth: 200 }}>
    </CrewCard>
</Card>

    // <h1>/dispatch/crews
    //   Page Hello
    // </h1>
);
};

export default CrewPage;