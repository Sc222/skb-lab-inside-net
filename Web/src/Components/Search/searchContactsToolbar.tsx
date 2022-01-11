import { Box, Card, CardContent, InputAdornment, TextField, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import { SearchOutlined } from "@mui/icons-material";

interface SearchContactsToolbarProps {
  resultCount?: number;
  searchText: string;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTextKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

//todo make this toolbar functional
export const SearchContactsToolbar: FunctionComponent<SearchContactsToolbarProps> = ({
  resultCount,
  searchText,
  onTextChange,
  onTextKeyDown,
}) => (
  <Box>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Поиск контактов
      </Typography>
      <Typography sx={{ mx: 1, mt: 2, mb: 1 }} variant="h6">
        {resultCount ? resultCount : ""}
      </Typography>
      {/*<Box sx={{ m: 1 }}>
        <Button startIcon={<UploadOutlined fontSize="small" />} sx={{ mr: 1 }}>
          Import
        </Button>
        <Button startIcon={<DownloadOutlined fontSize="small" />} sx={{ mr: 1 }}>
          Export
        </Button>
        <Button color="primary" variant="contained">
          Add products
        </Button>
      </Box>*/}
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              onChange={onTextChange}
              onKeyDown={onTextKeyDown}
              value={searchText}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
              placeholder="Search product"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
