import React from 'react';
import { Box, Typography, Grid, Stack, styled } from '@mui/material';
import ClaimsOptionCard from './components/ClaimsOptionCard';
import defaultOptionsData from './data/defaultOptions.json';

const SectionLabel = styled(Box)(({ theme }) => ({
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: theme.spacing(1, 2),
    borderRadius: '4px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 500,
}));


const CoverageLabel = styled(Box)(({ theme }) => ({
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
    borderRadius: '4px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    fontWeight: 500,
    width: '100%',
    boxSizing: 'border-box'
}));

const LabelWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
});


function App() {
    const [expiringTermsData, setExpiringTermsData] = React.useState(defaultOptionsData.expiringTerms);
    const [optionCards, setOptionCards] = React.useState([{ ...defaultOptionsData.initialOption, id: crypto.randomUUID() }]);

    const handleUpdateCard = (id, updatedData) => {
        if (id === 'expiring-terms') {
            setExpiringTermsData(updatedData);
        } else {
            setOptionCards(prevCards =>
                prevCards.map(card => (card.id === id ? updatedData : card))
            );
        }
    };
    
    const handleCloneCard = (id) => {
        const cardToClone = optionCards.find(card => card.id === id);
        if (cardToClone) {
            const newCard = {
                ...cardToClone,
                id: crypto.randomUUID(),
                title: `Option ${optionCards.length + 1}`,
            };
            setOptionCards(prevCards => [...prevCards, newCard]);
        }
    };

    const handleDeleteCard = (id) => {
        if (optionCards.length > 1) {
            setOptionCards(prevCards => prevCards.filter(card => card.id !== id));
        } else {
            alert("Cannot delete the last option card.");
        }
    };

    return (
        <Box sx={{ width: '100%', p: 2, overflowX: 'auto' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 3 }}>
                Claims Information
            </Typography>
            {}
            <Grid container spacing={2.5} wrap="nowrap">
                <Grid item sx={{ minWidth: '180px' }}>
                    <Stack spacing={2}>
                        <LabelWrapper sx={{ height: 66 }}>
                           <CoverageLabel>Coverage</CoverageLabel>
                        </LabelWrapper>

                        <LabelWrapper sx={{ height: 120 }}>
                            <SectionLabel>Family Definition</SectionLabel>
                        </LabelWrapper>
                        
                        <LabelWrapper sx={{ height: 260 }}>
                            <SectionLabel>Breakup of Lives</SectionLabel>
                        </LabelWrapper>

                        <LabelWrapper sx={{ height: 390 }}>
                            <SectionLabel>Sum Insured</SectionLabel>
                        </LabelWrapper>

                        <LabelWrapper sx={{ height: 120 }}>
                            <SectionLabel>Sum Insured Type</SectionLabel>
                        </LabelWrapper>
                    </Stack>
                </Grid>

                <Grid item sx={{ minWidth: '340px' }}>
                    <ClaimsOptionCard cardData={expiringTermsData} onUpdate={handleUpdateCard} isCloneable={false} isDeletable={false} />
                </Grid>

                {optionCards.map((card) => (
                    <Grid item sx={{ minWidth: '340px' }} key={card.id}>
                        <ClaimsOptionCard
                            cardData={card}
                            onUpdate={handleUpdateCard}
                            onClone={handleCloneCard}
                            onDelete={handleDeleteCard}
                            isCloneable={true}
                            isDeletable={optionCards.length > 1}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default App;
