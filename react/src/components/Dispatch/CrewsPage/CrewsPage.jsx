import * as React from 'react';
import Card from '@mui/material/Card';
import { Stack,  Box, FormControl, InputLabel, OutlinedInput, TextField, Alert, Button, Snackbar, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


import CrewCard from './CrewCard';
import { getDayInfo } from '../../../helpers/AppHelpers'

import './CrewsPageResources/crewsPage.scss'


const CrewPage = (props) => {

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center'
    }));

    const { jobs, crews, contracts, packages, clients } = props.state;

    if (jobs[1]) {
        let count = 0;
        const cardsOfDaysForCrews = crews.map(crew => {

            const days = getDayInfo(jobs, crews, contracts, packages, clients, crew.id);
            count++
            const key = count;
            return (<Card className="-crew" key={key} sx={{display: 'flex', ml: 11, height: 350, backgroundImage: 'url(https://acegif.com/wp-content/gif/outerspace-58.gif)'}}>
                <Avatar alt={crew.foreman_name} src={crew.avatar} sx={{ width: 150, height: 150, mb: 4, ml: 5, mt: '80px' }} />
                <CrewCard days={days} />
            </Card>)
        })


        return(
        <Stack>
            <Item className="page-header" sx={{maxHeight: 800, maxWidth: 900, alignItems: 'center',  margin: 'auto'}}>
                <Typography variant="h3" color="#DBEAF3" >
                    🚀  Crews to Launch: {crews.length} 🚀 
                </Typography>
            </Item>

            <Grid className="crewsPage" container rowSpacing={4} columnSpacing={{ xs: 10, sm: 10, md: 10 }} >
                {cardsOfDaysForCrews}
            </Grid>
        </Stack>)
    }

    return (

        <>
            {/* <Card sx={{mb: 10}}>
                <Typography variant="h3" sx={{mb: 5}}>
                🚀  Crews to Launch: 🚀 
                </Typography>
            </Card> */}
            
            <Grid container rowSpacing={4} columnSpacing={{ xs: 10, sm: 10, md: 10 }}>
                <Grid item container>
                    <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
                    <CrewCard sx={{ top: 100, position: 'absolute', maxWidth: 200, mb: 5 }}></CrewCard>
                 </Grid>
                <Grid item container>
                    <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
                    <CrewCard sx={{ top: 100, position: 'absolute', maxWidth: 200, mb: 5 }}></CrewCard>
                </Grid>
                <Grid item container>
                    <Avatar alt={props.foreman_name} src={props.avatar} sx={{ width: 100, height: 100, mb: 4, ml: 20, mr: 5, mt: 5 }} />
                    <CrewCard sx={{ top: 100, position: 'absolute', maxWidth: 500 }}></CrewCard>
                </Grid> 
            </Grid>
        </>
);
};

export default CrewPage;