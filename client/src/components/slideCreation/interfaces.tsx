export interface SlideInterface {
  order?: number;
  content: string;
  isActive: Boolean;
}

export type Presentation = {
  title : string,
  slides : any[]
}