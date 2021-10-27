import { Column, Workbook } from 'exceljs';
import { Response } from 'express';

interface IReportColumn<Data extends Record<string, any>>
  extends Omit<Column, 'key'> {
  key: keyof Data;
}

class Report {
  constructor(private readonly book: Workbook) {}

  public async send(res: Response) {
    await this.book.xlsx.write(res);
    res.end();
  }
}

export class ReportBuilder<Data extends Record<string, any>> {
  private name = 'Отчет';
  private columns?: Partial<IReportColumn<Data>>[];

  constructor(private readonly data: Data[]) {}

  public setReportName(name: string) {
    this.name = name;
    return this;
  }

  public defineColumns(columns: Partial<IReportColumn<Data>>[]) {
    this.columns = columns;
    return this;
  }

  public generate() {
    const book = new Workbook();
    const sheet = book.addWorksheet(this.name);
    sheet.columns = this.columns as Partial<Column>[];

    this.data.forEach((item) => {
      sheet.addRow(item);
    });

    return new Report(book);
  }
}
