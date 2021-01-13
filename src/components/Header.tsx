import React, { FunctionComponent, useRef } from 'react';
import TranslateIcon from '@material-ui/icons/Translate';
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import locales from '../locales';
import '../App.scss';

const Header: FunctionComponent = () => {
  const { t, i18n } = useTranslation();

  const languageSwitchAnchorEl = useRef<null | HTMLButtonElement>(null);
  const [showLanguageSwitch, toggleLanguageSwitch] = React.useState(false);

  const handleLanguageChange = (l: string) => {
    i18n.changeLanguage(l);
  };

  const openChangeLanguagePopper = () => {
    toggleLanguageSwitch(!showLanguageSwitch);
  };

  return (
    <AppBar position="sticky" className="header">
      <Toolbar>
        <Typography variant="h6">{t('tr-title')}</Typography>
        <span className="title-mobile">{t('tr-title')}</span>
        <div style={{ flexGrow: 1 }} />
        <Box position="relative">
          <Button
            data-testid="language-menu-toggle"
            aria-controls="language-menu"
            aria-haspopup="true"
            color="secondary"
            variant="contained"
            onClick={openChangeLanguagePopper}
            ref={languageSwitchAnchorEl}
          >
            <span className="language-toggle-text">
              {i18n.language ? locales[i18n.language] : 'change language'} &nbsp;
            </span>
            <TranslateIcon />
          </Button>
          <Menu
            id="language-menu"
            data-testid="language-menu"
            open={showLanguageSwitch}
            anchorEl={languageSwitchAnchorEl.current}
            onClose={() => toggleLanguageSwitch(false)}
          >
            {Object.keys(locales).map((l) => (
              <MenuItem
                key={l}
                value={l}
                onClick={() => handleLanguageChange(l)}
                data-testid={`locale-${l}`}
              >
                <Checkbox size="small" checked={i18n.language === l} /> {t(locales[l])}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
