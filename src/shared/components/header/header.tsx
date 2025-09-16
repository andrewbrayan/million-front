import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import ToggleTheme from "./components/toggle-theme";

import styles from "./header.module.css";

const pages = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Arrienda tu casa",
    href: "/rent",
  },
  {
    name: "Vende tu casa",
    href: "/sell",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AppBar position="static" className={styles.nav}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box className={styles.nav__logo}>
            <img
              src="/images/logo.svg"
              alt="Logo de Habitta"
              width={32}
              height={32}
            />
            <Typography variant="h6">Habitta</Typography>
          </Box>

          <Box ref={anchorRef} className={styles.nav__menu}>
            <IconButton size="large" onClick={handleOpen}>
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorRef.current}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={open}
              onClose={handleClose}
              keepMounted
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleClose}>
                  <Link component={NavLink} to={page.href}>
                    {page.name}
                  </Link>
                </MenuItem>
              ))}
              <MenuItem>
                <ToggleTheme isMobile />
              </MenuItem>
            </Menu>
          </Box>

          <Box className={styles.nav__links}>
            {pages.map((page) => (
              <Link component={NavLink} to={page.href} key={page.name} color="inherit">
                {page.name}
              </Link>
            ))}
          </Box>

          <ToggleTheme />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
