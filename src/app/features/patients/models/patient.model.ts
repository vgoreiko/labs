import {BirthDate} from "./birth-date.model";
import * as moment from 'moment';

export class Patient {
  age: string;
  code: number;
  fullName: string;
  birthDate: BirthDate;
  computedAge: number;

  static fromJS(data: Patient) {
    // data.birthDate.formattedDate is an empty string for code === 26199
    // this produce NaN. Did not handled this
    return {
      ...data,
      computedAge: moment().diff(moment(data.birthDate.formattedDate), 'years'),
    }
  }
}
