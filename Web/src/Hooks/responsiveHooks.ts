import { Theme, useMediaQuery } from "@mui/material";

/** `sm` and lower */
export const useMobile = (theme: Theme): boolean => useMediaQuery(theme.breakpoints.down("sm"));

/** between `sm` and `md` */
export const useTablet = (theme: Theme): boolean => useMediaQuery(theme.breakpoints.between("sm", "md"));

/** between `md` and larger */
export const useDesktop = (theme: Theme): boolean => useMediaQuery(theme.breakpoints.up("md"));
