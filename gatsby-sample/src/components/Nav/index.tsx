import React from "react";
import {
  Avatar,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import MuiListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { useRecoilState } from "recoil";
import atom from "../../utils/atom";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  margin: 10,
  borderRadius: 10,
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const ListItemButton = styled(MuiListItemButton)<ListItemButtonProps>(
  ({ theme }) => ({
    borderRadius: 10,
  })
);

export default function Nav() {
  const [isOpen, setIsOpen] = useRecoilState(atom("isNavOpen", true));

  return (
    <Drawer variant="permanent" open={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerHeader>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{ bgcolor: "#fff", color: "#000" }}
            alt="Mohammad"
            src="test.jpg"
          />
          <Typography variant="p">محمد صادقیان</Typography>
        </Stack>
      </DrawerHeader>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon
              sx={{
                minWidth: 35,
              }}
            >
              <DashboardRoundedIcon />
            </ListItemIcon>
            <ListItemText>داشبورد</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
