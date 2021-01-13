/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import VersionSelector from './VersionSelector';

jest.mock('../../../config', () => ({
  versions: { TEST_1: 'data/TEST_1', TEST_2: 'data/TEST_2' },
}));

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

describe('Search Field', () => {
  const mockOnVersionChange = jest.fn();
  const props = {
    selectedVersion: 'TEST_1',
    onVersionChange: mockOnVersionChange,
  };

  it('renders the component and sends a get request', async () => {
    const { getByText, getByRole } = render(<VersionSelector {...props} />);

    const select = await waitFor(() => getByRole('button'));
    expect(select).toBeInTheDocument();
    fireEvent.mouseDown(select);

    const optionTest2 = await waitFor(() => getByText('TEST_2'));
    expect(optionTest2).toBeInTheDocument();

    fireEvent.click(optionTest2);

    expect(mockOnVersionChange.mock.calls).toHaveLength(1);
  });
});
