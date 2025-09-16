// MUI Components
import { Typography } from "@mui/material";

import styles from "./footer.module.css";

const Footer: React.FC = () => {
  return (
    <Typography variant="body1" component="footer" className={styles.footer}>
      All Rights Reserved © Habitta
    </Typography>
  );
};

export default Footer;
