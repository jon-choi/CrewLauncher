import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {
  return (
    <Card className={props.compClass} sx={{ maxWidth: 345 }}>
      {props.image && 
        <CardMedia
          component="img"
          height="140"
          image={props.image}
          alt="package image"
        />
      }
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.header}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.body}  
        </Typography>
      </CardContent>
      {props.onClick &&
        <CardActions>
          <Button onClick={props.onClick} size="small">Edit</Button>
        </CardActions>
      }
    </Card>
  );
}