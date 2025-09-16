import { setTheme, ThemeModeEnum } from "@core/store/actions/theme.actions";
import { ToggleButton, ToggleButtonGroup, Tooltip, useColorScheme } from "@mui/material";
import { getSystemTheme } from "@shared/utils/get-system-theme";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";

interface Props {
  isMobile?: boolean;
}

const ToggleTheme: React.FC<Props> = ({ isMobile }) => {
  const { mode, setMode } = useColorScheme();

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: ThemeModeEnum | null
  ) => {
    event.preventDefault();
    if (newValue) {
      setMode(newValue);
      if (newValue === "system") {
        const newSystemTheme = getSystemTheme();
        setTheme(newSystemTheme);
      } else {
        setTheme(newValue);
      }
    }
  };

  return (
    <ToggleButtonGroup
      value={mode}
      onChange={handleChange}
      sx={{
        display: isMobile
          ? { xs: "flex", md: "none" }
          : { xs: "none", md: "flex" },
      }}
      size="small"
      exclusive
    >
      <Tooltip title="Modo claro">
        <ToggleButton value={ThemeModeEnum.LIGHT}>
          <LightModeIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Modo oscuro">
        <ToggleButton value={ThemeModeEnum.DARK}>
          <DarkModeIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Modo sistema">
        <ToggleButton value={ThemeModeEnum.SYSTEM}>
          <DesktopWindowsIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
};

export default ToggleTheme;
