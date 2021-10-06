import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Backdrop from '@mui/material/Backdrop';
import Avatar from '@mui/material/Avatar';
import StarRateIcon from '@mui/icons-material/StarRate';
import classNames from 'classnames'

export default function BasicSpeedDial(props) {
  const { open, zChange, onChange, handleClose, handleOpen, packages, selectedPackage } = props;

  const boxChange = classNames("box", {
    change: !open
  })

  return (
    <Box className={boxChange} sx={{ top: 0, right:0, position: "absolute", height: 736, transform: 'translateZ(0px)', flexGrow: 1 }}>
     
      {packages && <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', right: 10, top: 0}}
        icon={selectedPackage ? <Avatar alt={selectedPackage.title} src={selectedPackage.image} /> : <SpeedDialIcon />}
        direction='down'
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}

      >
        
        
        {packages.map((packageItem) => (
          <SpeedDialAction
            key={packageItem.id}
            icon={<StarRateIcon />}
            tooltipTitle={`${packageItem.title}\nSize Range ${packageItem.size_range_string}`}
            onClick={() => {
              onChange(packageItem);
              handleClose()
            }}
            sx={{mb:5, justifyContent: "right", color: "whitesmoke"}}
            tooltipOpen
          />
        ))}
      
      </SpeedDial>}
    </Box>
  );
}

