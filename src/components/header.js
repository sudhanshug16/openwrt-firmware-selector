import React from 'react';
import LanguageIcon from '@material-ui/icons/Language';
import {
  AppBar,
  Button,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';

export default function Header() {

  const {t, i18n} = useTranslation();

  const [value, setValue] = React.useState('en');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const changeLanguage = event => {
    var val = event.target.value;
    i18n.changeLanguage(val);
    setAnchorEl(null);
  };

  const openChangeLanguagePopper = event => {
    setValue(i18next.language.substring(0, 2));
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography edge="start" variant="h6">{t(
          'OpenWrt Firmware Selector Wizard')}</Typography>
        <div style={{flexGrow: 1}} />
        <Button aria-describedby={id} color="secondary" variant="contained"
          onClick={openChangeLanguagePopper} href="#">
          {t('Change Language')} &nbsp;
          <LanguageIcon/>
        </Button>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition
          disablePortal={true}
        >
          {({TransitionProps}) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="language-selector-popper">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Change Language</FormLabel>
                  <br/>
                  <RadioGroup
                    aria-label="Language"
                    name="language"
                    value={value}
                    onChange={changeLanguage}
                  >
                    <FormControlLabel value="en" control={<Radio/>}
                      label={t('English')}/>
                    <FormControlLabel value="de" control={<Radio/>}
                      label={t('German')}/>
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Toolbar>
    </AppBar>
  );
}
