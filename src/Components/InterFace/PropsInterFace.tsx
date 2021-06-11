export interface ChilrenProps {
  children: React.ReactNode;
}

export interface MessageProps {
  message?: string;
}

export interface ImageProps {
  url: string | undefined;
}

export interface bgProps {
  bg?: string;
}

export interface TitleProps {
  title: string;
}

export interface ProfilePhoto {
  children: React.ReactNode;
  bg?: string;
}
