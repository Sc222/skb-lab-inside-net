import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
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
import { Link as RouterLink } from "react-router-dom";
import { SiteRoute } from "../../Typings/Enums/siteRoute";

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

//FIXME DRY
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

interface MyContactsToolbarProps {
  resultCount?: number;
  searchText: string;
  departments: DepartmentModel[] | null;
  selectedDepartments: string[];
  onSelectedDepartmentsChange: (event: SelectChangeEvent<string[]>) => void;
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTextKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const MyContactsToolbar: FunctionComponent<MyContactsToolbarProps> = ({
  resultCount,
  searchText,
  departments,
  selectedDepartments,
  onSelectedDepartmentsChange,
  onTextChange,
  onTextKeyDown,
}) => {
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
        <Box sx={{ m: 0, display: "flex", justifyContent: "start", alignItems: "center" }}>
          <Typography sx={{ m: 1 }} variant="h4">
            Мои контакты
          </Typography>
          <Typography sx={{ mx: 1, mt: 2, mb: 1 }} variant="h6">
            {resultCount ? resultCount : ""}
          </Typography>
        </Box>
        <Box sx={{ m: 1 }}>
          <Link component={RouterLink} to={`${SiteRoute.persons}/${SiteRoute.search}`}>
            <Button color="primary" variant="contained" size="medium">
              Глобальный поиск
            </Button>
          </Link>
        </Box>
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
    </>
  );
};
