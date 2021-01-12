import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (k: string) => k,
    i18n: {
      changeLanguage: (l: string) => {},
      language: 'en',
    },
  }),
}));

test('renders the app container', () => {
  const { container } = render(<App />);
  expect(container.querySelector('div.App')).toBeTruthy();
});
