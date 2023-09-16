import { Box, Button, CssBaseline, Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import { amber, deepPurple, grey, red } from "@mui/material/colors";
import { Link } from "react-router-dom";

const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

const Home = () =>{

    return(
        
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "95vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://static.vecteezy.com/system/resources/previews/003/419/273/non_2x/online-library-digital-education-with-distance-learning-illustration-vector.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5}  elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography component="h1" variant="poster" display="block" fontSize={90} style={{color: red[800], margin: 0, padding:0, textAlign: 'end'}}>
              SCHOOL
              MANAGER
            </Typography>
            <Box
              sx={{ mt: 3 }}>
              <Grid container spacing={2}>
              <Typography component="h1" variant="h6" display="block" fontSize={15} style={{ margin: 0, padding:0, textAlign:'end'}}>
              Sed in ipsum id lacus facilisis ultricies. Etiam ac arcu consequat quam ultrices rhoncus a vel quam. Donec egestas sapien ac neque volutpat, eu venenatis risus tempor. Morbi condimentum ultricies bibendum. Donec scelerisque massa nec consectetur commodo. Maecenas suscipit convallis eleifend. Donec venenatis lobortis tellus in congue. Aenean euismod pharetra neque. Duis eget cursus nibh. Sed sagittis dolor nec libero varius, in egestas libero gravida. Duis nec vestibulum dui.
            </Typography>
               
              </Grid>
              <Link to='/signup'>
              <Button
                type="submit"
                
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 5,
                  bgcolor: deepPurple[500],
                  ":hover": { bgcolor: amber[200], color: grey[900] },
                  color: 'white', width: 200, height: 80, fontSize: 20
                }}>
                Start now!
              </Button>
              </Link>

              

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      </ThemeProvider>
        
        
    )
}

export default Home;