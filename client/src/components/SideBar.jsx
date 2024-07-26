import ReorderIcon from "@mui/icons-material/Reorder";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => setOpenDrawer((prev) => !prev);

  return (
    <div>
      <div
        className="absolute z-10 text-white top-4 left-4 cursor-pointer hover:text-green-500"
        onClick={toggleDrawer}
      >
        <ReorderIcon />
      </div>
      <Drawer open={openDrawer} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250, height: "100%", backgroundColor: "#111111" }}
          role="presentation"
          onClick={toggleDrawer}
        >
          <List>
            <NavLink className="navbar-item" to="/">
              <ListItem
                key={"Home"}
                disablePadding
                className="text-white hover:text-green-500 group"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon className="text-white group-hover:text-green-500" />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink className="navbar-item" to="/saved-anime">
              <ListItem
                key={"Saved"}
                disablePadding
                className="text-white hover:text-green-500 group"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <BookmarksIcon className="text-white group-hover:text-green-500" />
                  </ListItemIcon>
                  <ListItemText primary={"Saved anime"} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default SideBar;
