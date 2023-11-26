import { Grid } from "@mui/material";
import DataGridDemo from "../components/DataGridDemo";
import { DatabaseProvider, useFirebaseApp } from "reactfire";
import { getDatabase } from "firebase/database";

export default function Home() {
    const fireDatabase = getDatabase(useFirebaseApp());

    return (
        <DatabaseProvider sdk={fireDatabase}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '98vh' }}
            >
                <Grid item >
                    <DataGridDemo />
                </Grid>
            </Grid>
        </DatabaseProvider>
    );
}