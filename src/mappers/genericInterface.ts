export interface IModel {
  name: string;
  images?: string[];
  uri?: string;
  artistId: string;
}
export interface IImage {
  height: number;
  url: string;
  width: number;
}
