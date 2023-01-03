const expenseReports = [
  {
    id: '1',
    amount: 10025,
    author: 'adam',
    client: 'Massive Company',
    date: '2019-06-01T00:00:00.000Z',
    notes: 'Lunch with client',
    vendor: 'Tasty Restaurant',
  },
  {
    id: '2',
    amount: 223,
    author: 'adam',
    client: 'Mum & Pup Shop',
    date: '2020-03-23T18:00:00.000Z',
    notes: 'Lunch with client',
    vendor: 'Tasty Restaurant',
  },
  {
    id: '3',
    amount: 699,
    author: 'becky',
    client: 'Massive Company',
    date: '2021-11-15T00:00:00.000Z',
    notes: 'Vending Machine Snacks',
    vendor: 'Massive Cafe',
  },
];

export const getExpenseReports = async () => {
  return expenseReports;
};

export const getExpenseReportById = async (id: string) => {
  return expenseReports.find((exp) => exp.id === id);
};

export const getExpenseReportAttributes = async () => {
  return expenseReports.map((exp) => ({ id: exp.id, author: exp.author }));
};

export const getExpenseReportAttributesById = async (id: string) => {
  return (await getExpenseReportAttributes()).find((exp) => exp.id === id);
};
