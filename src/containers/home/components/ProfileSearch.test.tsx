/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { Overview } from '../../../types/overview';
import ProfileSearch from './ProfileSearch';

const mockAxios = new MockAdapter(axios);

const testVersion = 'TEST_VERSION';

const testOverview1: Overview = {
  image_url: 'TEST_IMAGE_URL',
  release: 'TEST_RELEASE',
  profiles: [
    {
      id: 'TEST_PROFILE_ID',
      target: 'TEST_TARGET',
      titles: [
        {
          title: 'TEST_TITLE1',
        },
        {
          title: 'TEST_TITLE2',
        },
        {
          vendor: 'TEST_VENDOR',

          model: 'TEST_MODEL',
        },
      ],
    },
  ],
};

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
  const mockOnProfileChange = jest.fn();
  const props = {
    selectedVersion: testVersion,
    onProfileChange: mockOnProfileChange,
  };

  afterEach(() => {
    mockAxios.reset();
  });

  it('renders the component and sends a get request', async () => {
    render(<ProfileSearch {...props} />);

    mockAxios.onGet().replyOnce(200, testOverview1);

    await waitFor(() => {
      expect(mockAxios.history.get).toHaveLength(1);
    });
  });

  it('renders autocomplete and selects right option', async () => {
    const { getByTestId } = render(<ProfileSearch {...props} />);
    mockAxios.onGet().replyOnce(200, testOverview1);

    let autocomplete: HTMLElement | null;
    await waitFor(() => {
      autocomplete = getByTestId('search-autocomplete');
    });
    const input = autocomplete!.querySelector('input');
    expect(input).toBeInTheDocument();

    autocomplete!.focus();
    fireEvent.change(input!, { target: { value: 'TESTVENMODE' } });
    fireEvent.keyDown(autocomplete!, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete!, { key: 'Enter' });

    await waitFor(() => {
      expect(input!.value).toEqual('TEST_VENDOR TEST_MODEL');
    });
  });

  it('clearing the autocomplete should not hide the last selected profile', async () => {
    const { getByTestId } = render(<ProfileSearch {...props} />);
    mockAxios.onGet().replyOnce(200, testOverview1);

    let autocomplete: HTMLElement | null;
    await waitFor(() => {
      autocomplete = getByTestId('search-autocomplete');
    });
    const input = autocomplete!.querySelector('input');
    expect(input).toBeInTheDocument();

    autocomplete!.focus();
    fireEvent.change(input!, { target: { value: 'TESTVENMODE' } });
    fireEvent.keyPress(input!, { key: 'Enter' });

    expect(mockOnProfileChange).toBeCalled();
    mockOnProfileChange.mockReset();

    const clearButton = autocomplete!.querySelector('.MuiAutocomplete-clearIndicator');
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton!);

    await waitFor(() => expect(mockOnProfileChange).not.toBeCalled());
  });
});
