import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { Box, Typography, Grid, Button } from "@material-ui/core";

import { Section } from "./components/Sections";
import { Title } from "./components/Titles";
import AdaptiveLink from "./components/AdaptiveLink";
import { LiftedPaper } from "./components/LiftedOnHover";
import { capitalizeFirstLetter, Strong } from "./components/Utilies";
import { domains } from "./Data";
import { HashLink } from "react-router-hash-link";

const useStyles = makeStyles((theme) => ({
  taskName: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },

  // taskCard: {
  //   '&:hover': {
  //     background: 'green',
  //     md: "8"
  //   }
  // },

}));

// function Task(props) {
//   return (

//   )
// }

function Tasks(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  return (
    <React.Fragment>
      <Section margin={theme.spacing(8, "auto", 1)}>
        <Title
          title="Tasks"
          description={<span>This list provides an overview of the tasks currently included in the benchmark,
          but we are actively seeking contributions from the community to expand the range of tasks and
          make the benchmark more diverse and comprehensive. You can view the performance of each model
          on the <HashLink to="/leaderboard">leaderboard</HashLink></span>}
        />
        <Grid container direction="row" spacing={2} justify="center">
          {domains.map(({ name }) => (
            <Grid item>
              <AdaptiveLink link={`/tasks#${name}`}>
                <Button variant="outlined">
                  {capitalizeFirstLetter(name.toLowerCase())}
                </Button>
              </AdaptiveLink>
            </Grid>
          ))}
        </Grid>
      </Section>
      {domains.map(({ name, description, tasks }) => {
        return (
          <Section anchorKey={name} margin={theme.spacing(8, "auto", 1)}>
            <Title
              title={name}
              //description={description}
            />
            <Grid container spacing={5} justify="center">
              {tasks.map(({ name, description }) => {
                return (
                  <Grid item xs={12} sm={6} md={4} className={classes.taskCard} >
                    <LiftedPaper elevation={3}>
                      <Box padding={theme.spacing(3, 2, 0)}>
                        <Typography
                          color="textPrimary"
                          variant="h6"
                          className={classes.taskName}
                        >
                          {`${name}`}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {description}
                        </Typography>
                        <Box padding={theme.spacing(2, 0)}>
                        <Typography color="textSecondary" variant="body1" align="right">
                          <HashLink to={`/task/${name.replaceAll(" ","")}`}>details</HashLink>
                        </Typography>
                        </Box>
                      </Box>
                    </LiftedPaper>
                  </Grid>
                );
              })}
            </Grid>
          </Section>
        );
      })}
    </React.Fragment>
  );
}

export default Tasks;
