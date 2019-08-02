import Avatar from './Avatar';

export const simple = () => (
  <Avatar size="small" imageUrl="https://picsum.photos/100/100?image=1027" />
);

export const withFunctionAsProperty = () => (
  <Avatar size={() => 'small'} imageUrl="https://picsum.photos/100/100?image=1027" />
);
