import { createTheme } from "@mui/material";

const theme = createTheme({
    direction: "rtl",
    palette: {
        primary: {
            main: "#7c4dff",
            dark: "#5f34ff",
            light: "#d8caff",
            contrastText: "#FAFAFA"
        }
    }
});

export default theme;
