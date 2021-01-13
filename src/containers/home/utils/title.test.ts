import { TitlesEntity } from '../../../types/overview';
import { getTitle } from './title';

describe('getTitle', () => {
  it('returns the correct title', () => {
    const data: {
      title: TitlesEntity;
      expected: string;
    }[] = [
      {
        title: {
          title: 'TEST',
        },
        expected: 'TEST',
      },
      {
        title: {
          vendor: 'TEST',
          model: 'MODEL',
        },
        expected: 'TEST MODEL',
      },
    ];

    data.forEach((element) => {
      expect(getTitle(element.title)).toStrictEqual(element.expected);
    });
  });
});
