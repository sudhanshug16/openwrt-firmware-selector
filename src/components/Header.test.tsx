/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';

import Header from './Header';

const mockChangeLanguage = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (k: string) => k,
    i18n: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      changeLanguage: mockChangeLanguage,
      language: undefined,
    },
  }),
}));

describe('Header', () => {
  it('opens the language menu list when the button is clicked', async () => {
    const { getByTestId } = render(<Header />);

    const languageMenuToggle = getByTestId('language-menu-toggle');
    expect(languageMenuToggle).toBeInTheDocument();

    fireEvent.click(languageMenuToggle);

    expect(getByTestId('locale-en')).toBeInTheDocument();
  });

  describe('with open language menu', () => {
    let component: RenderResult | null;

    beforeEach(() => {
      component = render(<Header />);
      const languageMenuToggle = component.getByTestId('language-menu-toggle');
      fireEvent.click(languageMenuToggle);
    });

    it('changes the language when an item is clicked', () => {
      fireEvent.click(component!.getByTestId('locale-en'));

      expect(mockChangeLanguage).toBeCalledWith('en');
    });

    it('closes the menu with escape', async () => {
      fireEvent.keyDown(component!.getByTestId('language-menu'), { key: 'Escape' });

      await waitFor(() =>
        expect(
          component!.container.querySelector('[data-testid="locale-en"]')
        ).not.toBeInTheDocument()
      );
    });
  });
});
