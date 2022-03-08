import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  ListItemText,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { SearchOutlined } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import { DepartmentModel } from "../../Api/Models/departmentModel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface DepartmentsSelectProps {
  departments: DepartmentModel[] | null;
  selectedDepartments: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

const DepartmentsSelect: FunctionComponent<DepartmentsSelectProps> = ({
  departments,
  selectedDepartments,
  onChange,
}) => {
  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="department-select-label">Отдел</InputLabel>
      <Select
        labelId="department-select-label"
        id="department-select"
        multiple
        value={selectedDepartments}
        onChange={onChange}
        input={<OutlinedInput label="Отдел" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {departments ? (
          departments.map((department) => (
            <MenuItem key={department.name} value={department.name}>
              <Checkbox checked={selectedDepartments.findIndex((d) => d === department.name) > -1} />
              <ListItemText primary={department.name} />
            </MenuItem>
          ))
        ) : (
          <div>Загрузка данных</div>
        )}
        {/*todo loading indicator*/}
      </Select>
    </FormControl>
  );
};

interface SearchContactsToolbarProps {
  resultCount?: number;
  searchText: string;
  departments: DepartmentModel[] | null;
  selectedDepartments: string[];
  onSelectedDepartmentsChange: (event: SelectChangeEvent<string[]>) => void;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTextKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchContactsToolbar: FunctionComponent<SearchContactsToolbarProps> = ({
  resultCount,
  searchText,
  departments,
  selectedDepartments,
  onSelectedDepartmentsChange,
  onTextChange,
  onTextKeyDown,
}) => {
  return (
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
          Поиск сотрудников
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <FormControl sx={{ width: "100%" }}>
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
                    placeholder="ФИО сотрудника"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <DepartmentsSelect
                  departments={departments}
                  selectedDepartments={selectedDepartments}
                  onChange={onSelectedDepartmentsChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
