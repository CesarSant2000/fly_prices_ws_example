import React, {ReactNode} from 'react'
import Head from 'next/head'
import {Avatar, createTheme, CssBaseline, Grid, IconButton, ThemeProvider, Tooltip} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

const pages = [''];

type Props = {
    children?: ReactNode
    title?: string
}
const theme = createTheme();
const Layout = ({children, title = 'This is the default title'}: Props) => (
    <>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{
                height: '100%',
                minHeight: '100vh',
                maxHeight: '?',
                backgroundImage: 'url(/images/common_background.png)',
                backgroundRepeat: 'repeat-y',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={1}
                    md={3}
                    sx={{
                        backgroundColor: 'transparent',
                    }}
                >
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={10}
                    md={6}
                    sx={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        borderRadius: '1rem',
                    }}
                >
                    <AppBar position="static" sx={{
                        borderTopLeftRadius: '1rem',
                        borderTopRightRadius: '1rem',
                    }}>
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                <AirplaneTicketIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        display: {xs: 'none', md: 'flex'},
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    FLY CHECK
                                </Typography>
                                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                    {pages.map((page) => (
                                        <Button
                                            key={page}
                                            sx={{my: 2, color: 'white', display: 'block'}}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </Box>
                                <Box sx={{flexGrow: 0}}>
                                    <Tooltip title="Open settings">
                                        <IconButton sx={{p: 0}}>
                                            <Avatar alt="Remy Sharp" src="/images/avatar_pic.jpg"/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    {children}
                    <Grid item
                          padding={'1rem'}
                    >
                    </Grid>
                        <Typography variant="body2" color="text.secondary" align="center">
                            {'© '}
                            {new Date().getFullYear()}
                            {'. Cesar J. Santacruz'}
                        </Typography>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={1}
                    md={3}
                    sx={{
                        backgroundColor: 'transparent',
                    }}
                >
                </Grid>
            </Grid>

        </ThemeProvider>
    </>
)

export default Layout
