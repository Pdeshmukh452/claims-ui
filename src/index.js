import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import './index.css';

// Create a custom theme for Material-UI
const theme = createTheme({
    typography: { 
        fontFamily: 'Inter, sans-serif' 
    },
    palette: {
        primary: { 
            main: '#1976d2' 
        },
        secondary: { 
            main: '#4caf50' 
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
