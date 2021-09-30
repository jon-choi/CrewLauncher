import * as React from 'react';
import Card from '@mui/material/Card';
import CrewCard from './CrewCard';
import { Stack, Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


const CrewPage = (props) => {

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center'
      }));

    const { days } = props;
    const [yesterday, today, tomorrow, fourthDay, lastDay] = days;
    const [selectedDay, setSelectedDay] = React.useState(null)



    

    if (days) {



        return(
        <Grid>
            <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
    
        </Grid>)

    }


    return (

    <Card >
    
{/* CARD ONE */}

    <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
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