/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
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
  target: 'TEST_TARGET_2',
  version_code: 'TEST_VERSION_CODE_2',
  version_number: 'TEST_VERSION_NUMBER_2',
  id: 'TEST_ID_2',
  titles: [
    {
      title: 'TEST_TITLE2',
    },
  ],
  images: [
    {
      name: 'factorytestimage',
      type: 'factory',
      sha256: 'sha256',
    },
    {
      name: 'kerneltestimage',
      type: 'kernel',
      sha256: 'sha256',
    },
    {
      name: 'roottestimage',
      type: 'root',
      sha256: 'sha256',
    },
    {
      name: 'tftptestimage',
      type: 'tftp',
      sha256: 'sha256',
    },
    {
      name: 'sdcardtestimage',
      type: 'sdcard',
      sha256: 'sha256',
    },
    {
      name: 'randomtestimage',
      type: 'random',
      sha256: 'sha256',
    },
  ],
};

const testProfile3: Profile = {
  build_at: '2020-12-08 13:51:01',
  target: 'TEST_TARGET_3',
  version_code: 'TEST_VERSION_CODE_3',
  version_number: 'TEST_VERSION_NUMBER_3',
  id: 'TEST_ID_3',
  images: [],
  titles: [],
};

const testProfiles = [testProfile1, testProfile2, testProfile3];

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

  it('renders the component and sends a get request', async () => {
    render(<ProfileDetails selectedProfile={testProfile1} selectedVersion={testVersion} />);

    mockAxios.onGet().replyOnce(200);

    await waitFor(() => {
      expect(mockAxios.history.get).toHaveLength(1);
    });
  });

  it('renders titles correctly', async () => {
    let { container } = render(
      <ProfileDetails selectedProfile={testProfile1} selectedVersion={testVersion} />
    );

    mockAxios.onGet().replyOnce(200, testProfile1);

    await waitFor(() => {
      expect(container.querySelector('#title')).toHaveTextContent(
        /^TEST_TITLE1, TEST_VENDOR TEST_MODEL$/
      );
    });

    ({ container } = render(
      <ProfileDetails selectedProfile={testProfile2} selectedVersion={testVersion} />
    ));

    mockAxios.onGet().replyOnce(200, testProfile2);

    await waitFor(() => {
      expect(container.querySelector('#title')).toHaveTextContent(/^TEST_TITLE2$/);
    });
  });

  it('renders download links correctly', async () => {
    for (const p of testProfiles) {
      const { getAllByTestId } = render(
        <ProfileDetails selectedProfile={p} selectedVersion={testVersion} />
      );

      mockAxios.onGet().replyOnce(200, p);

      await waitFor(() => {
        const downloadLinks = getAllByTestId('download_link');
        let expectedItems = p.images?.map((i) => i.type) || [];
        downloadLinks.forEach((downloadLink) => {
          expectedItems = expectedItems.filter((i) => i !== downloadLink.textContent);
        });

        expect(expectedItems).toHaveLength(0);
      });
    }
  });
});
