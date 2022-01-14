import React, { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface CalendarPageToolbarProps {}

export const CalendarPageToolbar: FunctionComponent<CalendarPageToolbarProps> = () => {
  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Календарь
        </Typography>
        {/* <Box sx={{ m: 1 }}>
          <Link component={RouterLink} to={`${SiteRoute.persons}/${SiteRoute.search}`}>
            <Button color="primary" variant="contained" size="medium">
              Глобальный поиск
            </Button>
          </Link>
        </Box>*/}
      </Box>
    </>
  );
};
