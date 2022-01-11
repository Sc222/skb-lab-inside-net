import React, { FunctionComponent } from "react";
import { Avatar, Box, Card, CardContent } from "@mui/material";
import { SearchContact } from "../../Typings/Types/searchContact";

interface SearchContactCardProps {
  contact: SearchContact; // todo api request should return partial PersonModel for PERFORMANCE
}

export const SearchContactCard: FunctionComponent<SearchContactCardProps> = ({ contact }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 3,
        }}
      >
        <Avatar alt="Product" src={contact.AvatarUrl} variant="square" />
      </Box>
      {/*      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {product.title}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        {product.description}
      </Typography>*/}
    </CardContent>
    {/* <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <ClockIcon color="action" />
          <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
            Updated 2hr ago
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <DownloadIcon color="action" />
          <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
            {product.totalDownloads} Downloads
          </Typography>
        </Grid>
      </Grid>
    </Box>*/}
  </Card>
);
