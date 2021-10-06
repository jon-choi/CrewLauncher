import * as React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'

export default function MediaCard(props) {
  const { link, compClass, image, header, body } = props;

  return (
    <Card className={compClass} sx={{ width: 345 }}>
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
      {link &&
        <CardActions>
          <Button href={link} size="small">Edit</Button>
        </CardActions>
      }
    </Card>
  );
}