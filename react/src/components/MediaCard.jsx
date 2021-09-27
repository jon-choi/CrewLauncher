import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {
  const { onClick, compClass, image, header, body } = props;

  return (
    <Card className={compClass} sx={{ maxWidth: 345 }}>
      {image && 
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="package image"
        />
      }
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {header}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}  
        </Typography>
      </CardContent>
      {onClick &&
        <CardActions>
          <Button onClick={onClick} size="small">Edit</Button>
        </CardActions>
      }
    </Card>
  );
}