export const mocki18n = (): void => {
  jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
      return {
        t: (str: string) => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
          language: 'en',
        },
      };
    },
  }));
};

export default { mocki18n };
