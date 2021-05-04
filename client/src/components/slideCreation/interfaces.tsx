export interface SlideInterface {
  content: string;
  isActive: Boolean;
}

export type Presentation = {
  title : string,
  slides : any[]
}