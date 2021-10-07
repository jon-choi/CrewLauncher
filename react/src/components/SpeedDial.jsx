import * as React from 'react';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon, Avatar } from '@mui/material'

export default function BasicSpeedDial(props) {
  const { onChange, crews, selectedCrew } = props;

  return (
    <Box sx={{  transform: 'translateZ(0px)', flexGrow: 1 }}>
      {crews && <SpeedDial
        ariaLabel="SpeedDial basic example"
        direction="left"
        sx={{ position: 'absolute', bottom: 1, right: 1 }}
        icon={selectedCrew ? <Avatar alt={selectedCrew.foreman_name} src={selectedCrew.avatar} /> : <SpeedDialIcon />}
      >
        {crews.map((crew) => (
          <SpeedDialAction
            key={crew.foreman_name}
            icon={<Avatar alt={crew.foreman_name} src={crew.avatar}/>}
            tooltipTitle={crew.foreman_name}
            onClick={() => onChange(crew.id)}
          />
        ))}
      </SpeedDial>}
    </Box>
  );
}