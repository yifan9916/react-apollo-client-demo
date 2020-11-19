import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { mount, ReactWrapper } from 'enzyme';

import {
  IssuesList,
  GET_ISSUES,
} from '../src/components/IssuesList/IssuesList';
import { IssueState } from '../src/generated/github';
import { mockIssues, mockedRepo } from './mock-data';

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const mockWithoutData: MockedResponse[] = [
  {
    request: {
      query: GET_ISSUES(IssueState.Open),
      variables: {
        owner: 'facebook',
        name: 'react',
        query: '',
      },
    },
    result: {
      data: null,
    },
  },
];

const mockWithData: MockedResponse[] = [
  {
    request: {
      query: GET_ISSUES(IssueState.Open),
      variables: {
        owner: 'facebook',
        name: 'react',
        query: '',
      },
    },
    result: {
      data: mockedRepo,
    },
  },
  {
    request: {
      query: GET_ISSUES(IssueState.Open),
      variables: {
        owner: 'facebook',
        name: 'react',
        query: 'abc',
      },
    },
    result: {
      data: mockedRepo,
    },
  },
];

const mockWithError: MockedResponse[] = [
  {
    request: {
      query: GET_ISSUES(IssueState.Open),
      variables: {
        owner: 'facebook',
        name: 'react',
        query: '',
      },
    },
    error: new Error('Mock Error'),
  },
];

describe('<IssuesList />', () => {
  it('renders a loading screen', () => {
    const component = mount(
      <BrowserRouter>
        <MockedProvider mocks={mockWithoutData} addTypename={false}>
          <IssuesList searchText={''} />
        </MockedProvider>
      </BrowserRouter>,
    );

    expect(component.find('p').text()).toBe('Loading...');
  });

  it('renders the issues successfully', async () => {
    let component: ReactWrapper;

    await act(async () => {
      component = mount(
        <BrowserRouter>
          <MockedProvider mocks={mockWithData} addTypename={false}>
            <IssuesList searchText={''} />
          </MockedProvider>
        </BrowserRouter>,
      );

      await wait(0);
      component.update();
    });

    expect(component!.find('Link.issueLink').length).toBe(mockIssues.length);
    expect(component!).toMatchSnapshot();
  });

  it.skip('renders the searched issues correctly', async () => {
    let component: ReactWrapper;

    await act(async () => {
      component = mount(
        <BrowserRouter>
          <MockedProvider
            mocks={mockWithData}
            addTypename={false}
            // cache={cache}
          >
            <IssuesList searchText={''} />
          </MockedProvider>
        </BrowserRouter>,
      );
      // TODO: how to test response from custom field policies
    });
  });

  it('renders an error screen', async () => {
    let component: ReactWrapper;

    await act(async () => {
      component = mount(
        <BrowserRouter>
          <MockedProvider mocks={mockWithError} addTypename={false}>
            <IssuesList searchText={''} />
          </MockedProvider>
        </BrowserRouter>,
      );

      await wait(0);
      component.update();
    });

    expect(component!.find('p').text()).toBe('Error!');
  });
});
