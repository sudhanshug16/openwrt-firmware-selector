import { TitlesEntity } from '../../../types/overview';

export const getTitle = (title: TitlesEntity): string =>
  title.title || `${title.vendor} ${title.model}`;

export default { getTitle };
