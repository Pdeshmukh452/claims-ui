import React from 'react';
import { Box, Button, Stack, Typography, styled } from '@mui/material';

const CustomToggleButton = styled(Button)(({ theme, selected }) => ({
    backgroundColor: selected ? '#4caf50' : '#e0e0e0',
    color: selected ? 'white' : 'black',
    '&:hover': {
        backgroundColor: selected ? '#388e3c' : '#d5d5d5',
    },
    textTransform: 'none',
    flexGrow: 1,
}));

function FamilyDefinitionSelector({ selectedValue, onChange }) {
    const definitions = {
        'EMP': 'EMP - Employee Only',
        'ESC': 'EMP + Spouse + Child',
        'ESCP/I': 'EMP + Spouse + Child + Parents/In-laws',
        'Specify': 'Specify Details'
    };

    return (
        <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                {Object.keys(definitions).map(def => (
                    <CustomToggleButton 
                        key={def}
                        selected={selectedValue === def}
                        onClick={() => onChange(def)}
                    >
                        {def}
                    </CustomToggleButton>
                ))}
            </Stack>
            <Typography variant="body2" color="text.secondary" align="center">
                {definitions[selectedValue]}
            </Typography>
        </Box>
    );
}

export default FamilyDefinitionSelector;
