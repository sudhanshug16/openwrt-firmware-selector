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
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import '../App.scss';

export default function Header() {
  const { t, i18n } = useTranslation();

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
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography edge="start" variant="h6" className="title-desktop">
          {t('OpenWrt Firmware Selector')}
        </Typography>
        <span className="title-mobile">{t('OpenWrt Firmware Selector')}</span>
        <div style={{ flexGrow: 1 }} />
        <Button
          aria-describedby={id}
          color="secondary"
          variant="contained"
          onClick={openChangeLanguagePopper}
          href="#"
        >
          <span className="language-toggle-text">
            {t('Change Language')} &nbsp;
          </span>
          <LanguageIcon />
        </Button>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition
          disablePortal={true}
          className="language-selector-popper-container"
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="language-selector-popper">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Change Language</FormLabel>
                  <br />
                  <RadioGroup
                    aria-label="Language"
                    name="language"
                    value={value}
                    onChange={changeLanguage}
                  >
                    <FormControlLabel
                      value="en"
                      control={<Radio />}
                      label={t('English')}
                    />
                    <FormControlLabel
                      value="de"
                      control={<Radio />}
                      label={t('German')}
                    />
                    <FormControlLabel
                      value="ru"
                      control={<Radio />}
                      label={t('Russian')}
                    />
                    <FormControlLabel
                      value="pt_br"
                      control={<Radio />}
                      label={t('Brazilian Portuguese')}
                    />
                    <FormControlLabel
                      value="tr"
                      control={<Radio />}
                      label={t('Turkish')}
                    />
                    <FormControlLabel
                      value="es"
                      control={<Radio />}
                      label={t('Spanish')}
                    />
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
