 type LessonType = {
    _id?: string;
    start: string;
    end: string;
    subject: { name: string, _id: string };
    promo: { name: string, _id: string };
    presentation?: string;
    // presentation?: {
    //   _id: string,
    //   title: string,
    //   htmlContent: string
    // }
  }

  export default LessonType;