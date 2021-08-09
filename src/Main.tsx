import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CalcField from './CalcField';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import useLocalStorage from './useLocalStorage';

type TabPanelProps = {
    children?: React.ReactNode,
    index: any,
    value: any,
    className?: string
};

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} height="100%" boxSizing="border-box">
                    <Typography component={'span'} style={{ height: '100%' }}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: theme.palette.background.default
    },
    tabPanel: {
        flex: '1 1 auto'
    }
}));

export default function Main() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [tabs, setTabs] = useLocalStorage<string[]>('tabs', []);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
        setValue(newValue);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTabs([...tabs, '']);
    };

    const tabEls = tabs.map((tab, index) => {
        return <Tab key={index} label={`Calc ${index}`} {...a11yProps(index)} />
    });

    const tabPanels = tabs.map((tab, index) => {
        const handleChange = (value: string) => {
            let items = [...tabs];
            items[index] = value;
            setTabs(items);
        };

        return <TabPanel key={index} className={classes.tabPanel} value={value} index={index}>
            <CalcField value={tab} onChange={handleChange} />
        </TabPanel>
    });

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    value={value}
                    onChange={handleChange} aria-label="simple tabs example">
                    {tabEls}
                    <IconButton onClick={handleClick}>
                        <AddIcon style={{ color: 'white' }} />
                    </IconButton>
                </Tabs>
            </AppBar>
            {tabPanels}
        </div>
    );
}
