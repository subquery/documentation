declare interface Window {
  config: {
    apiUrl: string;
  };
  gtag: (event: string, type: string, options?: object) => void;
}
