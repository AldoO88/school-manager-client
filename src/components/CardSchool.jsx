import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Paper } from '@mui/material';

const CardSchool = () =>{
    return(
        <div>
            <Card sx={{ maxWidth: 645, margin:5}} component={Paper} elevation={24}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://lh3.googleusercontent.com/proxy/La-ZxpBUxOVK5fTEt9MJBG-9kYUnvYhrpc5CRUJUPv5J9DJEjQakVYpjWhX9Hh3bnRitdVgDBDLHK9hG814XjYv0qR901OKjEt2Pm_QacdNcyYc4mhqqz4ArA6K1XshU2-ZQ8Rk3L42VU1vnhmKdodj-qud3gIbUgET4OQ=s680-w680-h510"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Escuela Secundaria Técnica 1
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dirección: Blvd. Felipe Ángeles S/N, Issste, 42083 Pachuca de Soto, Hgo.
            Teléfono: 771 711 3310
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
        </div>
    )
}

export default CardSchool;