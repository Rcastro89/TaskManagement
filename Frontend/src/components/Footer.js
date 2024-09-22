import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
    return (
        <Box mt={5} bgcolor="#f5f5f5" py={3}>
            <Typography variant="body1" align="center">
                © {new Date().getFullYear()} Task Management App. Todos los derechos reservados.
            </Typography>
        </Box>
    );
};

export default Footer;
