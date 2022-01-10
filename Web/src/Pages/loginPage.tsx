import { useFormik } from "formik";
import { Alert, Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { SiteRoute } from "../Typings/Enums/siteRoute";
import * as yup from "yup";
import { useAuthContext } from "../Contexts/authContext";

interface LoginPageProps {}

export const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthContext();

  const from = (location.state as any)?.from?.pathname || "/";

  // IMPORTANT: !!! this must match formik validationSchema
  const requiredFields = new Set<string>(["email", "password"]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Введите валидную почту").max(255).required("Введите почту"),
      password: yup.string().max(255).required("Введите пароль"),
    }),
    onSubmit: async (values) => {
      setLoginError(null);
      await auth.signIn({ Email: values.email, Password: values.password }, (result) => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        if (result.success) {
          navigate(from, { replace: true });
        } else {
          setLoginError(result.error);
        }
      });
    },
  });

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="sm">
        <RouterLink to={SiteRoute.home}>
          <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
            На главную
          </Button>
        </RouterLink>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mt: 3, mb: 1 }}>
            <Typography color="textPrimary" variant="h4">
              Войти
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Вход в сервис Inside Net
            </Typography>
          </Box>
          <TextField
            name="email"
            required={requiredFields.has("email")}
            value={formik.values.email}
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Почта"
            margin="normal"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            variant="outlined"
          />
          <TextField
            name="password"
            required={requiredFields.has("password")}
            value={formik.values.password}
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Пароль"
            margin="normal"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Войти
            </Button>
          </Box>

          <Typography color="textSecondary" variant="body2">
            <RouterLink to={SiteRoute.register}>
              <Link
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Зарегистрироваться
              </Link>
            </RouterLink>{" "}
            или{" "}
            <RouterLink to={SiteRoute.register}>
              {/*TODO CREATE SPECIAL LDAP-REGISTER PAGE !!!*/}
              <Link
                color="secondary"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Войти через AD
              </Link>
            </RouterLink>
          </Typography>
          {loginError && (
            <Box sx={{ my: 2 }}>
              <Alert severity="error"> {loginError}</Alert>
            </Box>
          )}
        </form>
      </Container>
    </Box>
  );
};
