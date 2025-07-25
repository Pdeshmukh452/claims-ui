import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Grid,
    Button,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Stack,
    styled
} from '@mui/material';
import FamilyDefinitionSelector from './FamilyDefinitionSelector';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';


const CustomToggleButton = styled(Button)(({ theme, selected }) => ({
    backgroundColor: selected ? '#4caf50' : '#e0e0e0',
    color: selected ? 'white' : 'black',
    '&:hover': {
        backgroundColor: selected ? '#388e3c' : '#d5d5d5',
    },
    textTransform: 'none',
    flexGrow: 1,
}));

function ClaimsOptionCard({ cardData, onUpdate, onClone, onDelete, isCloneable, isDeletable }) {
    const {
        id,
        title,
        familyDefinition,
        employees,
        dependents,
        sumInsuredType,
        sumInsuredOption,
        sumInsuredValues,
        customSumInsured,
        comments
    } = cardData;

    const handleFieldChange = (field, value) => {
        onUpdate(id, { ...cardData, [field]: value });
    };

    const handleSumInsuredValueChange = (valueKey) => {
        const newValues = { ...sumInsuredValues, [valueKey]: !sumInsuredValues[valueKey] };
        onUpdate(id, { ...cardData, sumInsuredValues: newValues, sumInsuredOption: 'uniform' });
    };
    
    const handleSumInsuredOptionChange = (event) => {
        const newOption = event.target.value;
        const updatedData = { ...cardData, sumInsuredOption: newOption };
        if (newOption !== 'specify') {
            updatedData.customSumInsured = '';
        }
        onUpdate(id, updatedData);
    };

    const totalLives = Number(employees) + Number(dependents);
    const isCustomSumInsuredDisabled = sumInsuredOption !== 'specify';

    return (
        <Card sx={{ minWidth: 275, height: '100%', boxShadow: 3, borderRadius: 2, backgroundColor: '#fafafa' }}>
            <CardHeader
                title={<Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{title}</Typography>}
                action={
                    <Stack direction="row">
                        {isCloneable && <IconButton aria-label="clone" onClick={() => onClone(id)}><ContentCopyIcon /></IconButton>}
                        {isDeletable && <IconButton aria-label="delete" onClick={() => onDelete(id)}><CloseIcon /></IconButton>}
                    </Stack>
                }
                sx={{ backgroundColor: '#e3f2fd', borderBottom: '1px solid #ccc', height: '120px', boxSizing: 'border-box' }}
            />
            <CardContent>
                <Stack spacing={3}>
                    <Box sx={{ height: 120 }}>
                        <FamilyDefinitionSelector selectedValue={familyDefinition} onChange={(value) => handleFieldChange('familyDefinition', value)} />
                    </Box>

                    {}
                    <Stack spacing={2} sx={{ height: 280 }}>
                        <TextField 
                            fullWidth 
                            value="Lives" 
                            disabled 
                        />
                        <TextField 
                            fullWidth 
                            placeholder="Enter No. of Employees" 
                            type="number" 
                            value={employees} 
                            onChange={(e) => handleFieldChange('employees', e.target.value)} 
                        />
                        <TextField 
                            fullWidth 
                            placeholder="Enter No. of Dependents" 
                            type="number" 
                            value={dependents}
                            onChange={(e) => handleFieldChange('dependents', e.target.value)}
                        />
                        <TextField 
                            fullWidth 
                            placeholder="Total Lives" 
                            value={totalLives} 
                            disabled 
                        />
                    </Stack>

                    <Box sx={{ height: 380 }}>
                         <RadioGroup row value={sumInsuredOption} onChange={handleSumInsuredOptionChange}>
                            <FormControlLabel value="uniform" control={<Radio />} label="Uniform" />
                            <FormControlLabel value="various" control={<Radio />} label="Various SI" />
                            <FormControlLabel value="specify" control={<Radio />} label="Specify" />
                        </RadioGroup>
                        <Grid container spacing={1}>
                            {Object.entries(sumInsuredValues).map(([key, checked]) => (
                                <Grid item xs={6} key={key}>
                                    <FormControlLabel control={<Radio checked={checked} onChange={() => handleSumInsuredValueChange(key)} />} label={Number(key).toLocaleString('en-IN')} disabled={sumInsuredOption !== 'uniform'} />
                                </Grid>
                            ))}
                        </Grid>
                        <TextField fullWidth label="Enter Sum Insured" value={customSumInsured} onChange={(e) => handleFieldChange('customSumInsured', e.target.value)} disabled={isCustomSumInsuredDisabled} sx={{ my: 1 }} />
                        <TextField fullWidth label="Add Comment" value={comments} onChange={(e) => handleFieldChange('comments', e.target.value)} sx={{ mb: 1 }}/>
                        <TextField fullWidth label="Total Premium" value={`Rs. ${Number(200000).toLocaleString('en-IN')}`} disabled />
                    </Box>

                    <Box sx={{ height: 120 }}>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            {['Family Floater', 'Individual', 'Specify'].map(type => (
                                <CustomToggleButton key={type} selected={sumInsuredType === type} onClick={() => handleFieldChange('sumInsuredType', type)}>
                                    {type}
                                </CustomToggleButton>
                            ))}
                        </Stack>
                        <Typography variant="body2" color="text.secondary" align="center">{sumInsuredType}</Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default ClaimsOptionCard;
