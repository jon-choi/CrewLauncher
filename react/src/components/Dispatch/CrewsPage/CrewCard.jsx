import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { getJobsByCrew } from '../../Crews/crewsDataHelper';
import { useParams } from 'react-router-dom';

const CrewCard = (props) => {
  // const params = useParams(props);
  // const { jobs, crews } = props;
  // const info = getJobsByCrew(jobs, crews);

  
  return (
    <Card sx="display: flex; justify-content: center; align-items: flex-start;">
    <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
    {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100, mb: 4, ml: 20, mt: 10 }} />
    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" sx={{ width: 100, height: 100, mb: 4, ml: 20, mt: 10 }} /> */}

      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Yesterday
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>

      <Card sx="display: flex; justify-content: center;">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Today
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
    </Card>

    <Card sx="display: flex; justify-content: center;">
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Tomorrow
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
    </Card>

    <Card sx="display: flex; justify-content: center;">
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          The day after tomorrow
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
    </Card>
    
    <Card sx="display: flex; justify-content: center;">
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Two days after tomorrow
        </Typography>
        <Typography variant="h5" component="div">
          Job Info: 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          client name, address
        </Typography>
      </CardContent>
    </Card>
    </Card>

    

    // <h1>/dispatch/crews
    //   Card
    // </h1>
  );
};

export default CrewCard;