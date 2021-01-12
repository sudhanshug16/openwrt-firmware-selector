/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ProfileDetails from './ProfileDetails';

import { Profile } from '../../../types/profile';

const mockAxios = new MockAdapter(axios);

const testVersion = 'TEST_VERSION';

const testProfile1: Profile = {
  build_at: '2020-12-08 13:51:01',
  target: 'TEST_TARGET',
  version_code: 'TEST_VERSION_CODE',
  version_number: 'TEST_VERSION_NUMBER',
  id: 'TEST_ID',
  titles: [
    {
      title: 'TEST_TITLE1',
    },
    {
      model: 'TEST_MODEL',
      vendor: 'TEST_VENDOR',
    },
  ],
  images: [
    {
      name: 'testimage',
      type: 'sysupgrade',
      sha256: 'sha256',
    },
  ],
};

const testProfile2: Profile = {
  build_at: '2020-12-08 13:51:01',
  target: 'TEST_TARGET',
  version_code: 'TEST_VERSION_CODE',
  version_number: 'TEST_VERSION_NUMBER',
  id: 'TEST_ID',
  titles: [
    {
      title: 'TEST_TITLE2',
    },
  ],
};

const testProfiles = [testProfile1, testProfile2];

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

describe('Profile Details', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('renders the component, sends a get request and displays and shows the profile target', async () => {
    render(
      <ProfileDetails
        selectedProfile={{
          id: 'TEST_ID1',
          target: 'TEST_TARGET',
        }}
        selectedVersion={testVersion}
      />
    );

    mockAxios.onGet().replyOnce(200);

    await waitFor(() => {
      expect(mockAxios.history.get).toHaveLength(1);
    });
  });

  it('renders titles correctly', async () => {
    let { container } = render(
      <ProfileDetails
        selectedProfile={{
          id: 'TEST_ID1',
          target: 'TEST_TARGET',
        }}
        selectedVersion={testVersion}
      />
    );

    mockAxios.onGet().replyOnce(200, testProfile1);

    await waitFor(() => {
      expect(container.querySelector('#title')).toHaveTextContent(
        /^TEST_TITLE1, TEST_VENDOR TEST_MODEL$/
      );
    });

    ({ container } = render(
      <ProfileDetails
        selectedProfile={{
          id: 'TEST_ID2',
          target: 'TEST_TARGET',
        }}
        selectedVersion={testVersion}
      />
    ));

    mockAxios.onGet().replyOnce(200, testProfile2);

    await waitFor(() => {
      expect(container.querySelector('#title')).toHaveTextContent(/^TEST_TITLE2$/);
    });
  });

  it('renders download links correctly', async () => {
    for (const p of testProfiles) {
      render(
        <ProfileDetails
          selectedProfile={{
            id: 'TEST_ID1',
            target: 'TEST_TARGET',
          }}
          selectedVersion={testVersion}
        />
      );

      mockAxios.onGet().replyOnce(200, p);

      await waitFor(() => {
        const downloadLinks = screen.getAllByTestId('download_link');
        let expectedItems = p.images?.map((i) => i.type) || [];
        downloadLinks.forEach((downloadLink) => {
          expectedItems = expectedItems.filter((i) => i !== downloadLink.textContent);
        });

        expect(expectedItems).toHaveLength(0);
      });
    }
  });
});
