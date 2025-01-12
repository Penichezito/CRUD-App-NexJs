import { Box } from "@mui/material";
import Header  from "./Header";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
return (
        <Box>
            <Header />
            <Box sx={ {padding: 2 }}>{children}</Box>
        </Box>
    );
}

export default Dashboard;