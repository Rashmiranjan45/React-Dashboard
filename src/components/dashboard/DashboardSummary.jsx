import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function DashboardSummary({ employees }) {
  const active = employees.filter(e => e.active).length;

  return (
    <Grid container spacing={2}>
      <Grid >
        <Card>
          <CardContent>
            <Typography>Total Employees</Typography>
            <Typography variant="h5">{employees.length}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid>
        <Card>
          <CardContent>
            <Typography>Active</Typography>
            <Typography variant="h5">{active}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
