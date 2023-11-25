import { Grid } from "@mui/material";
import DataGridDemo from "../components/DataGridDemo";

export default function Home() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '98vh' }}
        >
            <DataGridDemo />
            <Grid item xs={3}>
            </Grid>
        </Grid>);
}