import { Outlet } from 'react-router-dom';
import HomeNav from "./HomeNav";
import {Grid} from "@mui/material";

const PageLayout = () => (
    <Grid container style={{height:"100vh"}}>
        <Grid  item md={4}>
            <HomeNav/>
        </Grid>
        <Grid  item md={8}>
            <Outlet />
        </Grid>
    </Grid>
);

export default PageLayout;