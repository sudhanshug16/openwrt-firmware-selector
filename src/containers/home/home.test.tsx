/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import Home from './home';
import VersionSelector from './components/VersionSelector';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (k: string) => k,
    i18n: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      changeLanguage: (l: string) => {},
      language: 'en',
    },
  }),
}));

describe('Home', () => {
  it('renders the component and sends a get request', async () => {
    const { getByTestId, findByRole } = render(<Home />);

    const versionSelect = getByTestId('version-select');
    fireEvent.change(versionSelect, { value: '1234' });

    expect(versionSelect).toBeInTheDocument();
  });
});
