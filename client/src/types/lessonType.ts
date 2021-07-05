 type LessonType = {
    _id?: string;
    start: string;
    end: string;
    subject: { name: string, _id: string };
    promo: string;
  }

  export default LessonType;