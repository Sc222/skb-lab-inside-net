import React, { FunctionComponent } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIconOutlined from "@mui/icons-material/SearchOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { ChevronRightOutlined } from "@mui/icons-material";
import { SiteRoute } from "../../Typings/Enums/siteRoute";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ContactsSearchParam } from "src/Typings/Enums/contactsSearchParam";

// FIXME: refactor searchInput using textField (see searchContactsToolbar)

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  borderStyle: "solid",
  borderColor: alpha(theme.palette.action.active, 0.5),
  borderWidth: 1,
  //backgroundColor: alpha(theme.palette.primary.main, 0.2),
  "&:hover": {
    borderColor: theme.palette.action.active,
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      width: "30ch",
    },
  },
}));

interface SearchInputProps {}

// TODO autocomplete searched contacts + better modal show\hide management !!!
export const SearchInput: FunctionComponent<SearchInputProps> = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
    setSearchText(event.target.value);
  };

  const navigateToSearchPage = () => {
    setSearchText("");
    navigate({
      pathname: `${SiteRoute.persons}/${SiteRoute.search}`,
      search: `?${createSearchParams({
        [ContactsSearchParam.name]: searchText,
      })}`,
    });
  };

  const setModalAnchor = (event: React.MouseEvent<HTMLInputElement>) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
  };

  const resetModalAnchor = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Search onClick={setModalAnchor} onChange={onSearch}>
        <SearchIconWrapper>
          <SearchIconOutlined color="primary" />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Поиск"
          inputProps={{ "aria-label": "search" }}
          onBlur={resetModalAnchor}
          value={searchText}
        />
      </Search>
      <Menu
        onClick={navigateToSearchPage}
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && searchText.length > 0}
        autoFocus={false}
        disableAutoFocus
      >
        <MenuItem sx={{ width: `${anchorEl?.clientWidth}px`, display: "flex" }}>
          <Typography variant="body1" sx={{ flexGrow: 1, mr: 1, maxWidth: "calc(100% - 40px)" }}>
            Показать результаты поиска
          </Typography>
          <ChevronRightOutlined fontSize="medium" color="primary" />
        </MenuItem>
      </Menu>
    </>
  );
};
