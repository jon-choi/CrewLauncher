import * as React from 'react';
import Card from '@mui/material/Card';
import { Stack, Grid, Paper, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';


import CrewCard from './CrewCard';
import { getDayInfo } from '../../../helpers/AppHelpers'
import useCrewsPageDayState from './CrewsPageResources/CrewsPageHook'

import './CrewsPageResources/crewsPage.scss'


const CrewPage = (props) => {

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center'
    }));

    const { jobs, crews, contracts, packages, clients } = props.state;
    const { setSelectedDay } = useCrewsPageDayState();

    if (jobs[1]) {
        let count = 0;
        const onClose = function() {
            setSelectedDay(null)
        }

        const cardsOfDaysForCrews = crews.map(crew => {

            const days = getDayInfo(jobs, crews, contracts, packages, clients, crew.id);
            count++
            const key = count;
            return (<Card className="-crew" key={key} >
                <Avatar className="__avatar" alt={crew.foreman_name} src={crew.avatar} />
                <CrewCard days={days} onClose={onClose} />
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