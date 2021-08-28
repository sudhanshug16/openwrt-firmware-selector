import { FC } from 'react';
import { SearchData } from './ProfileSearch';

type BuildDetailsProps = {
  selectedModel: SearchData;
  selectedVersion: string;
};
export const BuildDetails: FC<BuildDetailsProps> = ({ selectedModel, selectedVersion }) => {
  console.log(selectedModel, selectedVersion);

  console.log(selectedModel);
  console.log(selectedVersion);
  if (!selectedModel) return <p>loading build</p>;
  return <p>wait for image</p>;
};

export default BuildDetails;
