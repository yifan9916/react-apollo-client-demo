export const mockIssues = [
  {
    node: {
      id: '123',
      number: 1,
      title: 'abc',
      url: '',
      bodyText: '',
      __typename: 'Issue',
    },
  },
  {
    node: {
      id: '456',
      number: 2,
      title: 'def',
      url: '',
      bodyText: '',
      __typename: 'Issue',
    },
  },
  {
    node: {
      id: '789',
      number: 3,
      title: 'ghi',
      url: '',
      bodyText: '',
      __typename: 'Issue',
    },
  },
];

export const mockedRepo = {
  repository: {
    id: '',
    issues: {
      edges: mockIssues,
    },
  },
};
